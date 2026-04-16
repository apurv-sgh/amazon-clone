import apiClient from './apiClient.js';

// Create order
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get order by ID
export const fetchOrderById = async (orderId) => {
  try {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get order by order number
export const fetchOrderByNumber = async (orderNumber) => {
  try {
    const response = await apiClient.get(`/orders/number/${orderNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get orders by session
export const fetchOrdersBySession = async (user_id) => {
  try {
    const response = await apiClient.get('/orders', {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
