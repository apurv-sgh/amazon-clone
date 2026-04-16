import pool from '../config/db.js';

// Get all products with optional filters
export const getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products WHERE is_available = TRUE';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const connection = await pool.getConnection();
    const [products] = await connection.query(query, params);
    connection.release();

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM products WHERE is_available = TRUE';
    const countParams = [];

    if (category && category !== 'all') {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }

    if (search) {
      countQuery += ' AND name LIKE ?';
      countParams.push(`%${search}%`);
    }

    const connCount = await pool.getConnection();
    const [countResult] = await connCount.query(countQuery, countParams);
    connCount.release();

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(countResult[0].total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get product by ID with images and specifications
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Get product details
    const [products] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (products.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const product = products[0];

    // Get product images
    const [images] = await connection.query(
      'SELECT image_url, alt_text FROM product_images WHERE product_id = ? ORDER BY display_order',
      [id]
    );

    // Get product specifications
    const [specs] = await connection.query(
      'SELECT spec_key, spec_value FROM product_specifications WHERE product_id = ?',
      [id]
    );

    connection.release();

    res.status(200).json({
      success: true,
      data: {
        ...product,
        images: images.map(img => img.image_url),
        specifications: specs,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE category = ? AND is_available = TRUE',
      [category]
    );
    connection.release();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters',
      });
    }

    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT id, name, price, image_main FROM products WHERE name LIKE ? AND is_available = TRUE LIMIT 10',
      [`%${query}%`]
    );
    connection.release();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
