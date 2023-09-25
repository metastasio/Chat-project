import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Access/LoginPage.jsx';
import MainPage from './components/MainPage.jsx';
import NotFound from './components/NotFound.jsx';
import RequireAuth from './components/Access/RequireAuth.jsx';
import Header from './components/Header.jsx';
import SignUp from './components/Access/SignUp.jsx';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              (
                <RequireAuth>
                  <MainPage />
                </RequireAuth>
                )
              }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
