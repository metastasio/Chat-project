import axios from 'axios';

import routes from './routes.js';

// const routes = {
//   loginPath: () => '/api/v1/login',
//   signupPath: () => '/api/v1/signup',
//   contentPath: () => '/api/v1/data',
// };

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
