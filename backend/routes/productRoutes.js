import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
} from '../controllers/productController.js';

const router = express.Router();

// GET all products with filters
router.get('/', getAllProducts);

// GET products by category
router.get('/category/:category', getProductsByCategory);

// SEARCH products
router.get('/search', searchProducts);

// GET product by ID
router.get('/:id', getProductById);

export default router;
