import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';

import { changeActiveChannel } from '../store/channels.slice';
import { openModal } from '../store/modal.slice';
// import { newInstance } from './services/locales';

const ChannelItem = ({ name, removable, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.channels);

  return (
    <Nav.Item className="w-100">
      <Dropdown as={ButtonGroup}>
        <Button
          variant={currentChannel === id ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => dispatch(changeActiveChannel(id))}
        >
          #
          {name}
        </Button>

        {removable ? (
          <>
            <Dropdown.Toggle
              split
              className="rounded-0"
              variant={currentChannel === id ? 'secondary' : 'light'}
            />
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => dispatch(openModal({ type: 'renameChannel', meta: id, extra: name }))}
              >
                {t('rename')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => dispatch(openModal({ type: 'removeChannel', meta: id, extra: name }))}
              >
                {t('delete')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        ) : null}
      </Dropdown>
    </Nav.Item>
  );
};
export default ChannelItem;
