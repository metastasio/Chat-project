import { useDispatch, useSelector } from 'react-redux';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { logOut } from '../store/access.slice';

const Header = () => {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">{t('chat')}</Navbar.Brand>
        {token ? (
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              dispatch(logOut());
              localStorage.removeItem('user');
            }}
          >
            {t('logOut')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
