import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import NotFound from './components/NotFound.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Header from './components/Header.jsx';

const App = () => {
  return (
    <div class='h-100'>
      <div class='h-100' id='chat'>
        <div class='d-flex flex-column h-100'>
          <BrowserRouter>
            <Header />
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
            </Routes>{' '}
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
