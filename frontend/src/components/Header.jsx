import { useDispatch } from 'react-redux';
import { Button, Navbar, Container } from 'react-bootstrap';

import { logOut } from '../store/authSlice';
import { newInstance } from '../services/locales';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <Navbar className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <Container>
        <Navbar.Brand href='/'>{newInstance.t('chat')}</Navbar.Brand>
        <Button
          type='button'
          variant='primary'
          onClick={() => dispatch(logOut())}
        >
          {newInstance.t('logOut')}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
