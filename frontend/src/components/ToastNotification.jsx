import { Toast, ToastContainer } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { closeToast } from '../store/modal.slice';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state) => state.modal.toast);
  const classNames = cn({
    'bg-danger':
      message === 'Канал удален',
  });

  return (
    <ToastContainer position="middle-start">
      <Toast
        onClose={() => dispatch(closeToast())}
        show={open}
        delay={2000}
        autohide
        className={classNames}
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default ToastNotification;
