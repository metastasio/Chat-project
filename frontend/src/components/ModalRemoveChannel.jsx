import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { socket } from './socket';

import { closeModal, showToast } from '../store/modal.slice';
import { changeActiveChannel } from '../store/channels.slice';
import { newInstance } from './services/locales';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  const { open, meta, extra } = useSelector((state) => state.modal);

  const onClick = () => {
    socket.emit('removeChannel', { id: meta });
    dispatch(closeModal());
    dispatch(showToast('Канал удален'));
    dispatch(changeActiveChannel(1));
  };

  return (
    <Modal show={open} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {newInstance.t('deleteChannel')}
          &lsquo;
          {extra}
          &lsquo;
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{newInstance.t('confirmDelete')}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => dispatch(closeModal())}
        >
          {newInstance.t('cancel')}
        </Button>
        <Button variant="danger" onClick={onClick}>
          {newInstance.t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalRemoveChannel;
