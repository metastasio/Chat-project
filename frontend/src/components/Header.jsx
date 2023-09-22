import { useDispatch } from 'react-redux';
import { Button, Navbar, Container } from 'react-bootstrap';

import { logOut } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <Navbar className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
      <Container>
        <Navbar.Brand href='/'>Chat</Navbar.Brand>
        <Button
          type='button'
          variant='primary'
          onClick={() => dispatch(logOut())}
        >
          Выйти
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
