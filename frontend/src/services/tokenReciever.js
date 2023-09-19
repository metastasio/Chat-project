import axios from 'axios';

const recieveToken = (userData) => axios.post('api/v1/login', userData);
// .catch((e) => console.log(e));

export default recieveToken;
