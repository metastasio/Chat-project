import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { socket } from '../socket';

import { closeModal, showToast } from '../store/modalSlice';
import { changeActiveChannel } from '../store/channelsSlice';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  const { open, meta } = useSelector((state) => state.modal);

  const onClick = () => {
    socket.emit('removeChannel', { id: meta });
    dispatch(closeModal());
    dispatch(showToast('Канал удален'));
    dispatch(changeActiveChannel(1));
  };

  return (
    <Modal show={open} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-secondary'
          onClick={() => dispatch(closeModal())}
        >
          Отменить
        </Button>
        <Button variant='danger' onClick={onClick}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalRemoveChannel;
