// import { useSelector } from 'react-redux';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import routes from '../services/routes';
import { AuthContext } from '../context';

const Header = () => {
  const { t } = useTranslation();
  const { authData, logOut } = useContext(AuthContext);

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.mainPage()}>{t('header.title')}</Navbar.Brand>
        {authData?.token ? (
          <Button
            as={Link}
            to={routes.logInPage()}
            type="button"
            variant="primary"
            onClick={() => {
              logOut();
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
