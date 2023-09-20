import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import NotFound from './components/NotFound.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
import RequireAuth from './components/RequireAuth.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />
        <Route path='login' element={<LoginPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
