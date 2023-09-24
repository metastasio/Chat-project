import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { socket } from '../socket';
import * as yup from 'yup';
import * as formik from 'formik';

import { closeModal, showToast } from '../store/modalSlice';
import { newInstance } from '../services/locales';

const ModalRenameChannel = () => {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const { open, meta } = useSelector((state) => state.modal);
  const { entities } = useSelector((state) => state.channels);
  const names = entities.map((entity) => entity.name);


  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Введите название канала')
      .notOneOf(names, 'Канал с таким названием уже создан')
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .trim('The contact name cannot include leading and trailing spaces'),
  });

  const onSubmit = (value) => {
    socket.emit('renameChannel', { id: meta, name: value.name });
    dispatch(closeModal());
    dispatch(showToast('Канал переименован!'));
  };

  return (
    <Modal show={open} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>{newInstance.t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          name: '',
        }}
      >
        {({ errors, values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>{newInstance.t('channelName')}</Form.Label>
                <Form.Control
                  type='text'
                  autoFocus
                  required
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='outline-primary'
                onClick={() => dispatch(closeModal())}
              >
                {newInstance.t('cancel')}
              </Button>
              <Button variant='primary' type='submit'>
                {newInstance.t('rename')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default ModalRenameChannel;
