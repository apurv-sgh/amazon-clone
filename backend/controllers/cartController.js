import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

// Get or create cart by session ID
export const getOrCreateCart = async (user_id) => {
  const connection = await pool.getConnection();

  try {
    // Check if cart exists
    const [carts] = await connection.query(
      'SELECT id FROM carts WHERE user_id = ?',
      [user_id]
    );

    let cartId;
    if (carts.length > 0) {
      cartId = carts[0].id;
    } else {
      // Create new cart
      const [result] = await connection.query(
        'INSERT INTO carts (user_id) VALUES (?)',
        [user_id]
      );
      cartId = result.insertId;
    }

    return cartId;
  } finally {
    connection.release();
  }
};

// Get cart with items
export const getCart = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required',
      });
    }

    const connection = await pool.getConnection();

    // Get cart ID
    const [carts] = await connection.query(
      'SELECT id FROM carts WHERE user_id = ?',
      [user_id]
    );

    if (carts.length === 0) {
      connection.release();
      return res.status(200).json({
        success: true,
        data: {
          items: [],
          total: 0,
        },
      });
    }

    const cartId = carts[0].id;

    // Get cart items with product details
    const [items] = await connection.query(
      `SELECT 
        ci.id, 
        ci.product_id, 
        ci.quantity, 
        ci.price_at_time,
        p.name, 
        p.image_main,
        p.stock_quantity,
        (ci.quantity * ci.price_at_time) as subtotal
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?`,
      [cartId]
    );

    connection.release();

    const total = items.reduce((sum, item) => sum + parseFloat(item.subtotal || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        cartId,
        items,
        total: parseFloat(total.toFixed(2)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { user_id, productId, quantity = 1 } = req.body;    

    if (!user_id || !productId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID and Product ID are required',
      });
    }

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    const connection = await pool.getConnection();

    try {
      // Get product price
      const [products] = await connection.query(
        'SELECT price, stock_quantity FROM products WHERE id = ?',
        [productId]
      );

      if (products.length === 0) {
        connection.release();
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      const { price, stock_quantity } = products[0];

      if (quantity > stock_quantity) {
        connection.release();
        return res.status(400).json({
          success: false,
          message: `Only ${stock_quantity} items available in stock`,
        });
      }

      // Get or create cart
      const cartId = await getOrCreateCart(user_id);

      // Check if item already in cart
      const [existingItems] = await connection.query(
        'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?',
        [cartId, productId]
      );

      if (existingItems.length > 0) {
        // Update quantity
        const newQuantity = existingItems[0].quantity + quantity;
        await connection.query(
          'UPDATE cart_items SET quantity = ? WHERE id = ?',
          [newQuantity, existingItems[0].id]
        );
      } else {
        // Add new item
        await connection.query(
          'INSERT INTO cart_items (cart_id, product_id, quantity, price_at_time) VALUES (?, ?, ?, ?)',
          [cartId, productId, quantity, price]
        );
      }

      connection.release();

      res.status(201).json({
        success: true,
        message: 'Item added to cart',
        data: { cartId, productId, quantity },
      });
    } catch (error) {
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quantity',
      });
    }

    const connection = await pool.getConnection();

    try {
      // Check if item exists
      const [items] = await connection.query(
        'SELECT product_id FROM cart_items WHERE id = ?',
        [cartItemId]
      );

      if (items.length === 0) {
        connection.release();
        return res.status(404).json({ success: false, message: 'Cart item not found' });
      }

      // Check stock
      const [products] = await connection.query(
        'SELECT stock_quantity FROM products WHERE id = ?',
        [items[0].product_id]
      );

      if (quantity > products[0].stock_quantity) {
        connection.release();
        return res.status(400).json({
          success: false,
          message: `Only ${products[0].stock_quantity} items available`,
        });
      }

      // Update quantity
      await connection.query(
        'UPDATE cart_items SET quantity = ? WHERE id = ?',
        [quantity, cartItemId]
      );

      connection.release();

      res.status(200).json({
        success: true,
        message: 'Cart item updated',
      });
    } catch (error) {
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const connection = await pool.getConnection();

    try {
      await connection.query(
        'DELETE FROM cart_items WHERE id = ?',
        [cartItemId]
      );

      connection.release();

      res.status(200).json({
        success: true,
        message: 'Item removed from cart',
      });
    } catch (error) {
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const { user_id } = req.body;

    const connection = await pool.getConnection();

    try {
      const [carts] = await connection.query(
        'SELECT id FROM carts WHERE user_id = ?',
        [user_id]
      );

      if (carts.length > 0) {
        await connection.query(
          'DELETE FROM cart_items WHERE cart_id = ?',
          [carts[0].id]
        );
      }

      connection.release();

      res.status(200).json({
        success: true,
        message: 'Cart cleared',
      });
    } catch (error) {
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
