import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks';

const RequireAuth = ({ children }) => {
  const { authData } = useAuthContext();

  if (!authData?.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
