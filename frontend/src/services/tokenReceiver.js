import axios from 'axios';

const getUserToken = (userData) =>
  axios.post('/api/v1/login', userData);

const getChatContent = (token) =>
  axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export { getUserToken, getChatContent };
