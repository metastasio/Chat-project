import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks';

import routes from '../../services/routes';

const RequireAuth = ({ children }) => {
  const { authData } = useAuthContext();

  if (!authData?.token) {
    return <Navigate to={routes.logInPage()} replace />;
  }
  return children;
};

export default RequireAuth;
