import apiClient from './apiClient.js';

// Get all products
export const fetchProducts = async (params) => {
  try {
    const response = await apiClient.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search products
export const searchProducts = async (query) => {
  try {
    const response = await apiClient.get('/products/search', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
