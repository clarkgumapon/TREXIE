import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product APIs
export const getProducts = async () => {
  const response = await api.get('/products/');
  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Cart APIs
export const getUserCart = async (userId: number) => {
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const response = await api.post('/cart/', {
    user_id: userId,
    product_id: productId,
    quantity: quantity
  });
  return response.data;
};

export const removeFromCart = async (cartItemId: number) => {
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data;
};

// Order APIs
export const createOrder = async (userId: number, totalAmount: number) => {
  const response = await api.post('/orders/', {
    user_id: userId,
    total_amount: totalAmount
  });
  return response.data;
};

export const getUserOrders = async (userId: number) => {
  const response = await api.get(`/users/${userId}/orders/`);
  return response.data;
};

// User APIs
export const createUser = async (username: string, email: string, password: string) => {
  const response = await api.post('/users/', {
    username,
    email,
    password
  });
  return response.data;
};

export const getUserById = async (userId: number) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}; 