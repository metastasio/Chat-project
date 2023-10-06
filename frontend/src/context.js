import React from 'react';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';

// const socket = io(URL, {
//   autoConnect: false,
// });

const SocketContext = React.createContext();
const AuthContext = React.createContext();

export { AuthContext, SocketContext };
