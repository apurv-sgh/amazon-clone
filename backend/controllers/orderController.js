import pool from '../config/db.js';
import { generateOrderNumber } from '../utils/helpers.js';

// Create order
export const createOrder = async (req, res) => {
  try {
    console.log(' REQ BODY:', req.body);
    
    let {
      user_id,
      cartItems,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
      paymentMethod,
    } = req.body;
    
    // Ensure user_id is integer
    user_id = parseInt(user_id) || 1;
    console.log('Converted user_id to:', user_id, 'Type:', typeof user_id);

    if (
      !user_id ||
      !cartItems ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0 ||
      !shippingAddress ||
      !shippingCity ||
      !shippingState ||
      !shippingZip ||
      !shippingCountry
    ) {
      console.error(' Validation failed. Missing:', {
        user_id: !user_id,
        cartItems: !cartItems || cartItems.length === 0,
        shippingAddress: !shippingAddress,
        shippingCity: !shippingCity,
        shippingState: !shippingState,
        shippingZip: !shippingZip,
        shippingCountry: !shippingCountry,
      });
      return res.status(400).json({
        success: false,
        message: 'All required fields (user_id, cartItems, shipping details) are required',
      });
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Use cartItems from request (frontend local state)
      const processedCartItems = cartItems.map(item => ({
        product_id: parseInt(item.id) || 0,
        name: item.name,
        quantity: 1,
        price_at_time: parseInt(item.price) || 0
      }));
      console.log('Processed cart items:', processedCartItems);

      // Calculate totals
      const subtotal = processedCartItems.reduce(
        (sum, item) => sum + item.quantity * item.price_at_time,
        0
      );
      const shippingFee = 0; // Free shipping
      const totalAmount = subtotal + shippingFee;

      // Create order
      const orderNumber = generateOrderNumber();
      console.log(' Inserting order with user_id:', user_id, 'Type:', typeof user_id);
      
      const [orderResult] = await connection.query(
        `INSERT INTO orders 
        (order_number, user_id, subtotal, shipping_fee, total_amount, payment_method, 
         shipping_address, shipping_city, shipping_state, shipping_zip, shipping_country, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
        [
          orderNumber,
          user_id,  // Now guaranteed to be integer
          subtotal,
          shippingFee,
          totalAmount,
          paymentMethod || 'COD',
          shippingAddress,
          shippingCity,
          shippingState,
          shippingZip,
          shippingCountry,
        ]
      );

      const orderId = orderResult.insertId;
      console.log('Order created with ID:', orderId);

      // Create order items from processedCartItems
      console.log('Creating order items for order ID:', orderId);
      for (const item of processedCartItems) {
        const totalPrice = item.quantity * item.price_at_time;
        await connection.query(
          `INSERT INTO order_items 
          (order_id, product_id, product_name, quantity, price_per_unit, total_price)
          VALUES (?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.product_id,
            item.name,
            item.quantity,
            item.price_at_time,
            totalPrice,
          ]
        );
      }

      // No need to clear cart_items from database since frontend uses local state
      // The frontend cart clearing is handled by calling clearCart() in Checkout component

      await connection.commit();
      connection.release();

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          orderId,
          orderNumber,
          subtotal,
          shippingFee,
          totalAmount,
        },
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const connection = await pool.getConnection();

    // Get order details
    const [orders] = await connection.query(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );

    if (orders.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const order = orders[0];

    // Get order items
    const [items] = await connection.query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [orderId]
    );

    connection.release();

    res.status(200).json({
      success: true,
      data: {
        ...order,
        items,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order by order number
export const getOrderByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const connection = await pool.getConnection();

    // Get order details
    const [orders] = await connection.query(
      'SELECT * FROM orders WHERE order_number = ?',
      [orderNumber]
    );

    if (orders.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const order = orders[0];

    // Get order items
    const [items] = await connection.query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [order.id]
    );

    connection.release();

    res.status(200).json({
      success: true,
      data: {
        ...order,
        items,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get orders by session ID
export const getOrdersBySession = async (req, res) => {
  try {
    const { user_id } = 1;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required',
      });
    }

    const connection = await pool.getConnection();

    const [orders] = await connection.query(
      'SELECT id, order_number, total_amount, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );

    connection.release();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
