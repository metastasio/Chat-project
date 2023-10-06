import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import { SocketContext } from '../../context.js';
import { closeModal } from '../../store/modal.slice.js';
import { changeActiveChannel } from '../../store/content.slice.js';
import { selectModal } from '../../services/stateSelectors.js';

const ModalRemoveChannel = () => {
  const { t } = useTranslation();
  const { handleEmit } = useContext(SocketContext);
  const { open, meta } = useSelector(selectModal);
  const dispatch = useDispatch();

  const onClick = async () => {
    handleEmit('removeChannel', { id: meta }, () => toast.error(t('toast.networkError')), () => {
      toast.success(t('toast.removed')); dispatch(changeActiveChannel(1));
    });
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
