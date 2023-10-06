import axios from 'axios';

import routes from './routes.js';

const axiosConfig = { timeout: 5000 };
const getUserToken = (userData) => axios.post(routes.loginPath(), userData, axiosConfig);

const getChatContent = (token) => axios.get(routes.contentPath(), {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}, axiosConfig);

const createNewUser = ({ username, password }) => axios
  .post(routes.signupPath(), { username, password }, axiosConfig);

export { getUserToken, getChatContent, createNewUser };
