import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { socket } from '../socket';
import * as yup from 'yup';
import * as formik from 'formik';

import { closeModal } from '../store/modalSlice';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.modal);
  const { names } = useSelector((state) => state.channels);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    socket.emit(
      'newChannel',
      {
        name: data.get('name'),
      },
      (payload) => {
        console.log(payload.status);
      },
    );
    dispatch(closeModal());
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Введите название канала')
      .notOneOf(names, 'Канал с таким названием уже создан'),
  });

  return (
    <Modal show={open} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление канала</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Назвать канал:</Form.Label>
            <Form.Control type='text' autoFocus name='name' />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-primary'
            onClick={() => dispatch(closeModal())}
          >
            Отменить
          </Button>
          <Button variant='primary' type='submit'>
            Добавить
          </Button>
        </Modal.Footer>{' '}
      </Form>
    </Modal>
  );
};
export default ModalWindow;
