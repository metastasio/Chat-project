import { useSelector, useDispatch } from 'react-redux';
import { Button, Navbar, Nav } from 'react-bootstrap';

import ChannelItem from './ChannelItem';
import { createNewChannel } from '../store/modalSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.channels);

  return (
    <Navbar className='col-4 bg-light col-md-2 h-100 flex-column px-2'>
      <Nav.Item className='w-100 d-flex justify-content-between mb-1 p-4'>
        <span className='fw-bold'>Каналы</span>
        <Button
          type='button'
          variant='outline-primary'
          size='sm'
          onClick={() => dispatch(createNewChannel())}
        >
          +
        </Button>
      </Nav.Item>
      {entities.map((channel) => (
        <ChannelItem key={channel.id} {...channel} />
      ))}
    </Navbar>
  );
};
export default Channels;
