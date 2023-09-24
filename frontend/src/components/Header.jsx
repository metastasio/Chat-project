import { useDispatch, useSelector } from 'react-redux';
import { Button, Navbar, Container } from 'react-bootstrap';

import { logOut } from '../store/accessSlice';
import { newInstance } from '../services/locales';

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authorization);

  return (
    <Navbar className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <Container>
        <Navbar.Brand href='/'>{newInstance.t('chat')}</Navbar.Brand>
        {token ? (
          <Button
            type='button'
            variant='primary'
            onClick={() => dispatch(logOut())}
          >
            {newInstance.t('logOut')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
