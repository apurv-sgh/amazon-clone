import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrderByNumber,
  getOrdersBySession,
} from '../controllers/orderController.js';

const router = express.Router();

// POST create order
router.post('/', createOrder);

// GET orders by session
router.get('/', getOrdersBySession);

// GET order by number
router.get('/number/:orderNumber', getOrderByNumber);

// GET order by ID
router.get('/:orderId', getOrderById);

export default router;
