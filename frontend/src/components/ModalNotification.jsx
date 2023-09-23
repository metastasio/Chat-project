import { Toast, ToastContainer } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeToast } from '../store/modalSlice';

const ModalNotification = () => {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state) => state.modal.toast);

  return (
    <ToastContainer position='top-center'>
      <Toast
        onClose={() => dispatch(closeToast())}
        show={open}
        delay={2000}
        autohide
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default ModalNotification;
