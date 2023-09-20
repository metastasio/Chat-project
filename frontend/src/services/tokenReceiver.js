import axios from 'axios';

const getUserToken = (userData) => axios.post('/login', userData);

export { getUserToken };
