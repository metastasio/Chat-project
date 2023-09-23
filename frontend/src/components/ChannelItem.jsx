import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';

import { changeActiveChannel } from '../store/channelsSlice';

const ChannelItem = ({ name, removable, id }) => {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.channels);

  return (
    <Nav.Item className='w-100'>
      <Button
        variant={currentChannel === id ? 'secondary' : 'light'}
        className='w-100 rounded-0 text-start'
        onClick={() => dispatch(changeActiveChannel(id))}
      >
        # {name}
      </Button>
    </Nav.Item>
  );
};
export default ChannelItem;

