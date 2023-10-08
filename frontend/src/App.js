import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './components/Access/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import NotFound from './components/NotFound.jsx';
import RequireAuth from './components/Access/RequireAuth.jsx';
import Header from './components/Header.jsx';
import SignUp from './components/Access/SignUp.jsx';
import routes from './services/routes.js';
import AuthProvider from './components/AuthProvider.jsx';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path={routes.mainPage()}
              element={
              (
                <RequireAuth>
                  <MainPage />
                </RequireAuth>
                )
              }
            />
            <Route path={routes.logInPage()} element={<LoginPage />} />
            <Route path={routes.signUpPage()} element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  </div>
);

export default App;
