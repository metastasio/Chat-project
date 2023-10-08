import { useMemo, useState } from 'react';

import { AuthContext } from '../context';

const AuthProvider = ({ children }) => {
  const userDataParsed = JSON.parse(localStorage.getItem('user'));
  const [authData, setAuthData] = useState(userDataParsed || {});

  const logIn = (data) => {
    console.log(data, 'LOGINDATA');
    localStorage.setItem('user', JSON.stringify(data));
    setAuthData(data);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setAuthData(null);
  };

  const authDataMemo = useMemo(() => ({ authData, logIn, logOut }), [authData]);

  return (
    <AuthContext.Provider value={authDataMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
