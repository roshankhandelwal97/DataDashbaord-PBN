import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Fetch filtered data with dynamic parameters
export const fetchFilteredData = (params) => {
  console.log('Sending API Request with Params:', params);
  return axios.get(`${BASE_URL}/filtered-data/`, { params });
};

export const fetchCategories = () => {
    return axios.get(`${BASE_URL}/filtered-data/`, { params: { type: 'categories' } });
  };

// Fetch paytypes
export const fetchPaytypes = () => {
  return axios.get(`${BASE_URL}/filtered-data/`, { params: { type: 'categories' } });
};

// Fetch employee types
export const fetchEmployeeTypes = () => {
  return axios.get(`${BASE_URL}/filtered-data/`, { params: { type: 'employee_types' } });
};

// Fetch providers
export const fetchProviders = () => {
  return axios.get(`${BASE_URL}/filtered-data/`, { params: { type: 'providers' } });
};

// Fetch raw data
export const fetchRawData = () => {
  return axios.get(`${BASE_URL}/filtered-data/`, { params: { type: 'raw' } });
};

// Fetch aggregates
export const fetchAggregates = (params) => {
  return axios.get(`${BASE_URL}/filtered-data/`, { params: { type: 'aggregates', ...params } });
};


