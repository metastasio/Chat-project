import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';

import { changeActiveChannel } from '../../store/content.slice';
import { openModal } from '../../store/modal.slice';

const ChannelItem = ({ name, removable, id }) => {
  const { t } = useTranslation();
  const { currentChannel } = useSelector((state) => state.content);
  const dispatch = useDispatch();

  return (
    <Dropdown as={ButtonGroup} className="w-100 justify-content-between">
      <Button
        variant={currentChannel === id ? 'secondary' : 'light'}
        className="rounded-0 text-start text-truncate w-100"
        onClick={() => dispatch(changeActiveChannel(id))}
      >
        #
        {' '}
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
              onClick={() => dispatch(openModal({ type: 'renameChannel', meta: id }))}
            >
              {t('channels.renameDropdown')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(openModal({ type: 'removeChannel', meta: id }))}
            >
              {t('channels.deleteDropdown')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      ) : null}
    </Dropdown>
  );
};
export default ChannelItem;
