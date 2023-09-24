import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav, Dropdown, ButtonGroup } from 'react-bootstrap';

import { changeActiveChannel } from '../store/channelsSlice';
import { openModal } from '../store/modalSlice';
import { newInstance } from '../services/locales';

const ChannelItem = ({ name, removable, id }) => {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.channels);

  return (
    <Nav.Item className='w-100'>
      <Dropdown as={ButtonGroup}>
        <Button
          variant={currentChannel === id ? 'secondary' : 'light'}
          className='w-100 rounded-0 text-start text-truncate'
          onClick={() => dispatch(changeActiveChannel(id))}
        >
          # {name}
        </Button>

        {removable ? (
          <>
            <Dropdown.Toggle
              split
              className='rounded-0'
              variant={currentChannel === id ? 'secondary' : 'light'}
            />
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  dispatch(openModal({ type: 'renameChannel', meta: id }))
                }
              >
                {newInstance.t('rename')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  dispatch(openModal({ type: 'removeChannel', meta: id }))
                }
              >
                {newInstance.t('delete')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        ) : null}
      </Dropdown>
    </Nav.Item>
  );
};
export default ChannelItem;
