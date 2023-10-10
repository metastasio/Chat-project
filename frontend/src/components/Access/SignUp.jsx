import * as formik from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Button, Form, FloatingLabel, Card, Container,
} from 'react-bootstrap';

import { schemaSignUp } from '../../services/yupSchemas.js';
import routes from '../../services/routes.js';
import { createNewUser } from '../../services/requestsToServer.js';
import { useAuthContext } from '../../hooks/index.js';

const SignUp = () => {
  const { t } = useTranslation();
  const { Formik } = formik;
  const { logIn } = useAuthContext();
  const navigate = useNavigate();
  const focus = useRef();
  const schema = schemaSignUp;

  useEffect(() => focus.current && focus.current.focus(), []);

  const onSubmit = async (values, actions) => {
    try {
      const { data } = await createNewUser(values);
      logIn(data);
      navigate(routes.mainPage(), { replace: false });
    } catch ({ code, response }) {
      if (code === 'ERR_NETWORK') {
        toast.error(t('toast.networkError'));
        actions.setSubmitting(false);
      } else if (response?.status === 409) {
        actions.setFieldError('username', t('alreadyCreatedUser'));
        actions.setSubmitting(false);
      }
    }
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
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                values,
                errors,
                touched,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <FloatingLabel controlId="signUpName" label={t('form.signUp.userName')} className="mb-3">
                      <Form.Control
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
                    <FloatingLabel controlId="signUpPass" label={t('form.password')} className="mb-3">
                      <Form.Control
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
                      controlId="signUpPassConfirm"
                      label={t('form.signUp.passwordConfirmation')}
                      className="mb-3"
                    >
                      <Form.Control
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
                    disabled={isSubmitting}
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
