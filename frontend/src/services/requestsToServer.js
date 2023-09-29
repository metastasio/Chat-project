import axios from 'axios';

const axiosConfig = { timeout: 5000 };
const getUserToken = (userData) => axios.post('/api/v1/login', userData, axiosConfig);

const getChatContent = (token) => axios.get('/api/v1/data', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}, axiosConfig);

const createNewUser = ({ username, password }) => axios.post('/api/v1/signup', { username, password }, axiosConfig);

export { getUserToken, getChatContent, createNewUser };
