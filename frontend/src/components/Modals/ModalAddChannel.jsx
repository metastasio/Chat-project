import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as formik from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import * as leoProfanity from 'leo-profanity';

import { handleEmit } from '../../socket';
import { closeModal, showToast } from '../../store/modal.slice';
import { changeActiveChannel } from '../../store/content.slice';

const ModalAddChannel = () => {
  const { Formik } = formik;
  const { t } = useTranslation();
  const { open } = useSelector((state) => state.modal);
  const { entities } = useSelector((state) => state.content);
  const names = entities.map((entity) => entity.name);
  const dispatch = useDispatch();
  const focus = useRef();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required(t('form.errors.required'))
      .notOneOf(names, t('form.errors.alreadyCreated'))
      .test('profanity', t('form.errors.profanity'), (values) => !leoProfanity.check(values))
      .min(3, t('form.errors.minmax'))
      .max(20, t('form.errors.minmax'))
      .trim(),
  });

  useEffect(() => focus.current && focus.current.focus());

  const onSubmit = async (value) => {
    handleEmit('newChannel', value, () => dispatch(showToast({ level: 'warning' })), (data) => { dispatch(showToast({ message: t('toast.added') })); dispatch(changeActiveChannel(data.id)); });
    dispatch(closeModal());
  };

  return (
    <Modal show={open} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('form.modal.add')}</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          name: '',
        }}
      >
        {({
          errors, values, handleChange, handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formControlInputAdd">
                <Form.Label>{t('form.modal.channelName')}</Form.Label>
                <Form.Control
                  type="text"
                  ref={focus}
                  required
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-primary"
                onClick={() => dispatch(closeModal())}
              >
                {t('form.modal.cancel')}
              </Button>
              <Button variant="primary" type="submit">
                {t('send')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default ModalAddChannel;
