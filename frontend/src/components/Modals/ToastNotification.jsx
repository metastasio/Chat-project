import { Toast, ToastContainer } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { closeToast } from '../../store/modal.slice';

const ToastNotification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { open, level, message } = useSelector((state) => state.modal.toast);
  const notification = message || t('toast.networkError');
  const classNames = cn({
    'bg-warning':
      level === 'warning',
  });

  return (
    <ToastContainer position="top-center">
      <Toast
        onClose={() => dispatch(closeToast())}
        show={open}
        delay={3000}
        autohide
        className={classNames}
      >
        <Toast.Body>
          <p className="text-center">{notification}</p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default ToastNotification;
