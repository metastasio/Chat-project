import * as formik from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, FloatingLabel, Card, Container,
} from 'react-bootstrap';

import { logIn } from '../../store/access.slice.js';
import { showToast } from '../../store/modal.slice.js';
import { schemaLogIn } from '../../services/yupSchemas.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const { status } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Formik } = formik;
  // const focus = useRef();
  const schema = schemaLogIn;

  // useEffect(() => focus.current && focus.current.focus());

  const onSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        navigate('/', { replace: false });
      })
      .catch(({ code, response }) => {
        if (code === 'ERR_NETWORK') {
          dispatch(
            showToast({
              message: t('toast.networkError'),
              level: 'warning',
            }),
          );
        }
        if (response?.statusCode === 401) {
          actions.setFieldError('password', t('wrongData'));
        }
      });
  };

  return (
    <Container className="row mx-auto my-auto col-3">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center mb-3">{t('form.signIn.signIn')}</h1>
          </Card.Title>
          <Card.Text as="div">
            <Formik
              validationSchema={schema}
              validateOnBlur
              onSubmit={onSubmit}
              initialValues={{
                username: '',
                password: '',
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <FloatingLabel controlId="logInName" label={t('form.signIn.userName')} className="mb-3">
                      <Form.Control
                        id="logInName"
                        type="text"
                        required
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.username && touched.username}
                        // ref={focus}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(`form.errors.${errors.username}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <FloatingLabel controlId="logInPass" label={t('form.password')} className="mb-3">
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
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                    disabled={status === 'loading'}
                  >
                    {t('form.signIn.signIn')}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          <Link to="/signup">{t('form.signUp.register')}</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;
