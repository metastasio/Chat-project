import { useSelector } from 'react-redux';
import UserContext from './UserContext.js';

const UserContextProvider = ({ children }) => {
  const { token } = useSelector((state) => state.authorization);

  return (
    <UserContext.Provider value={{ token }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
