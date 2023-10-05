import { useDispatch, useSelector } from 'react-redux';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { logOut } from '../store/access.slice';
import routes from '../services/routes';

const Header = () => {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">{t('header.title')}</Navbar.Brand>
        {token ? (
          <Button
            type="button"
            href={routes.logInPage()}
            variant="primary"
            onClick={() => {
              dispatch(logOut());
              localStorage.removeItem('user');
            }}
          >
            {t('header.logOut')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
