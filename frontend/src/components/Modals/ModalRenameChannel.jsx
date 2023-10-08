import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as formik from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import * as leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';

import { closeModal } from '../../store/modal.slice';
import { selectModal, selectChatContent } from '../../store/stateSelectors';
import { useSocketContext } from '../../hooks';

const ModalRenameChannel = () => {
  const { Formik } = formik;
  const { t } = useTranslation();
  const { handleEmit } = useSocketContext();
  const { open, meta } = useSelector(selectModal);
  const { entities } = useSelector(selectChatContent);
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

  useEffect(() => {
    if (focus.current) {
      focus.current.focus();
    }
  });

  const onSubmit = async (value) => {
    handleEmit('renameChannel', { id: meta, name: value.name }, () => toast.error(t('toast.networkError')), () => {
      toast.success(t('toast.renamed'));
    });
    dispatch(closeModal());
  };

  return (
    <Modal show={open} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('form.modal.renameChannel')}
        </Modal.Title>
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
              <Form.Group className="mb-3" controlId="formControlInputRename">
                <Form.Label visuallyHidden>{t('form.modal.channelName')}</Form.Label>
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
export default ModalRenameChannel;
