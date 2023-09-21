import axios from 'axios';


const getUserToken = (userData) => axios.post('/login', userData);

const getChatContent = (token) =>
  axios.get('/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export { getUserToken, getChatContent };
