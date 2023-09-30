import * as formik from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, FloatingLabel, Card, Container,
} from 'react-bootstrap';
import * as yup from 'yup';

import { logIn, setError } from '../../store/access.slice.js';
import { showToast } from '../../store/modal.slice.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const { feedback, status } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Formik } = formik;
  const focus = useRef();

  const schema = yup.object().shape({
    username: yup.string().required(t('form.errors.enterUserName')).trim(),
    password: yup.string().required(t('form.errors.enterPassword')).trim(),
  });

  useEffect(() => focus.current && focus.current.focus());

  return (
    <Container className="row mx-auto my-auto col-3">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center mb-3">{t('enter')}</h1>
          </Card.Title>
          <Card.Text as="div">
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                dispatch(logIn(values))
                  .unwrap()
                  .then(() => {
                    navigate('/', { replace: false });
                  })
                  .catch(({ code, response }) => {
                    console.log(response, 'RESPONSE');
                    if (code === 'ERR_NETWORK') {
                      dispatch(
                        showToast({
                          message: t('toast.networkError'),
                          level: 'warning',
                        }),
                      );
                      dispatch(setError());
                    }
                    if (response?.statusCode === 401) {
                      dispatch(
                        setError({ feedback: t('form.errors.wrongData') }),
                      );
                    }
                  });
              }}
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
                    <FloatingLabel label="Имя" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder={t('userName')}
                        required
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.username && touched.username}
                        ref={focus}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group controlId="validationFormik04">
                    <FloatingLabel label="Пароль" className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder={t('password')}
                        required
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={(errors.password && touched.password) || feedback}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                        {feedback}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                    disabled={status === 'loading'}
                  >
                    {t('enter')}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          <Link to="/signup">{t('form.register')}</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;
