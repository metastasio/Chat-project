// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context';

const RequireAuth = ({ children }) => {
  // const { token } = useSelector((state) => state.authorization);
  const { authData } = useContext(AuthContext);
  console.log(authData, 'AUTHDATA');

  if (!authData.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
