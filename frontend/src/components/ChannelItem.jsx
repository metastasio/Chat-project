import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav, Dropdown, ButtonGroup } from 'react-bootstrap';

import { changeActiveChannel } from '../store/channelsSlice';
import { renameChannel } from '../store/modalSlice'; 

const ChannelItem = ({ name, removable, id }) => {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.channels);

  return (
    <Dropdown as={ButtonGroup}>
      <Nav.Item className='w-100'>
        <Button
          variant={currentChannel === id ? 'secondary' : 'light'}
          className='w-100 rounded-0 text-start'
          onClick={() => dispatch(changeActiveChannel(id))}
        >
          # {name}
        </Button>
      </Nav.Item>

      {removable ? (
        <>
          <Dropdown.Toggle
            split
            className='rounded-0'
            variant={currentChannel === id ? 'secondary' : 'light'}
            id='dropdown-split-basic'
          />

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatch(renameChannel(id))}>Переименовать</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </>
      ) : null}
    </Dropdown>
  );
};
export default ChannelItem;
