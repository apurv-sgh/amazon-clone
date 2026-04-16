import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

// GET cart
router.get('/', getCart);

// POST add to cart
router.post('/', addToCart);

// PUT update cart item quantity
router.put('/:cartItemId', updateCartItem);

// DELETE remove from cart
router.delete('/:cartItemId', removeFromCart);

// DELETE clear entire cart
router.delete('/', clearCart);

export default router;
