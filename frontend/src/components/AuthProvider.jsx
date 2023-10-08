import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AuthContext } from '../context';
import { resetContentData } from '../store/content.slice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userDataParsed = JSON.parse(localStorage.getItem('user'));
  const [authData, setAuthData] = useState(userDataParsed || {});

  const logIn = useCallback((data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setAuthData(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setAuthData(null);
    dispatch(resetContentData());
  }, [dispatch]);

  const authDataMemo = useMemo(() => ({ authData, logIn, logOut }), [authData, logIn, logOut]);

  return (
    <AuthContext.Provider value={authDataMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
