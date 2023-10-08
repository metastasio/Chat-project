import { useContext } from 'react';
import { AuthContext, SocketContext } from '../context';

const useAuthContext = () => useContext(AuthContext);
const useSocketContext = () => useContext(SocketContext);

export { useAuthContext, useSocketContext };
