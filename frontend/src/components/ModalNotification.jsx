import { Row, Col, Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../store/modalSlice';

const ModalNotification = () => {
  const dispatch = useDispatch();
  const { open, type, message } = useSelector((state) => state.modal);

  return type === 'channelCreated' || 'networkError' ? (
    <Row>
      <Col xs={6}>
        <Toast
          onClose={() => dispatch(closeModal())}
          show={open}
          delay={2000}
          autohide
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  ) : null;
};
export default ModalNotification;
