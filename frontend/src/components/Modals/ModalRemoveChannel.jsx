import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { handleEmit } from '../../socket.js';
import { closeModal, showToast } from '../../store/modal.slice.js';
import { changeActiveChannel } from '../../store/content.slice.js';

const ModalRemoveChannel = () => {
  const { t } = useTranslation();
  const { open, meta } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const onClick = async () => {
    handleEmit('removeChannel', { id: meta }, () => dispatch(showToast({ level: 'warning' })), () => { dispatch(showToast({ message: t('toast.removed') })); dispatch(changeActiveChannel(1)); });
    dispatch(closeModal());
  };

  return (
    <Modal show={open} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('form.modal.deleteChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('form.modal.confirmDelete')}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => dispatch(closeModal())}
        >
          {t('form.modal.cancel')}
        </Button>
        <Button variant="danger" onClick={onClick}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalRemoveChannel;
