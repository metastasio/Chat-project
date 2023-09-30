import * as formik from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, FloatingLabel, Card, Container,
} from 'react-bootstrap';

import { register } from '../../store/access.slice.js';
import { showToast } from '../../store/modal.slice.js';
import { schemaSignUp } from '../../services/yupSchemas.js';

const SignUp = () => {
  const { t } = useTranslation();
  const { status } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const focus = useRef();
  const { Formik } = formik;
  const schema = schemaSignUp;

  useEffect(() => focus.current && focus.current.focus());

  const onSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        navigate('/', { replace: false });
      })
      .catch(({ code, response }) => {
        if (code === 'ERR_NETWORK') {
          dispatch(showToast({ message: t('toast.networkError'), level: 'warning' }));
        } else if (response?.statusCode === 409) {
          actions.setFieldError('username', t('alreadyCreatedUser'));
        }
      });
  };

  return (
    <Container className="row mx-auto my-auto col-3">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center mb-3">{t('form.signUp.register')}</h1>
          </Card.Title>
          <Card.Text as="div">
            <Formik
              validationSchema={schema}
              validateOnBlur
              onSubmit={onSubmit}
              initialValues={{
                username: '',
                password: '',
                passwordConfirmation: '',
              }}
            >
              {({
                handleSubmit, handleChange, handleBlur, values, errors, touched,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <FloatingLabel controlId="logInName" label={t('form.signUp.userName')} className="mb-3">
                      <Form.Control
                        id="logInName"
                        type="text"
                        required
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.username && touched.username}
                        ref={focus}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(`form.errors.${errors.username}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <FloatingLabel controlId="logInPass" label={t('form.signUp.password')} className="mb-3">
                      <Form.Control
                        id="logInPass"
                        type="password"
                        required
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.password && touched.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(`form.errors.${errors.password}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <FloatingLabel
                      controlId="logInPassConfirm"
                      label={t('form.signUp.passwordConfirmation')}
                      className="mb-3"
                    >
                      <Form.Control
                        id="logInPassConfirm"
                        type="password"
                        required
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.passwordConfirmation && touched.passwordConfirmation}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(`form.errors.${errors.passwordConfirmation}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                    disabled={status === 'loading'}
                  >
                    {t('form.signUp.signUp')}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
