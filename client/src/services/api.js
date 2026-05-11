import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get('/analytics');
  return response.data;
};

export const getSalesTrend = async () => {
  const response = await api.get('/analytics/sales-trend');
  return response.data;
};

export const getProductDistribution = async () => {
  const response = await api.get('/analytics/product-distribution');
  return response.data;
};

export const getForecast = async (product) => {
  const response = await api.get('/forecast', { params: { product } });
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get('/forecast/products');
  return response.data;
};

export const getAlerts = async () => {
  const response = await api.get('/alerts');
  return response.data;
};

export const getInsights = async () => {
  const response = await api.get('/insights');
  return response.data;
};

export default api;