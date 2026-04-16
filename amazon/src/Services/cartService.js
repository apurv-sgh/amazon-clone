import apiClient from './apiClient.js';

// Get cart
export const fetchCart = async (user_id) => {
  try {
    const response = await apiClient.get('/cart', {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add to cart
export const addToCart = async (user_id, productId, quantity = 1) => {
  try {
    const response = await apiClient.post('/cart', {
      user_id,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update cart item
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await apiClient.put(`/cart/${cartItemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove from cart
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await apiClient.delete(`/cart/${cartItemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Clear cart
export const clearCart = async (user_id) => {
  try {
    const response = await apiClient.delete('/cart', {
      data: { user_id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
