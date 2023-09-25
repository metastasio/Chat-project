// import { useFormik } from 'formik';
import {
  Button, Form, FloatingLabel, Card, Container,
} from 'react-bootstrap';
import * as formik from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { logIn } from '../store/access.slice.js';
import { newInstance } from './services/locales/index.js';
import { logInSchema } from '../services/yupSchemas.js';

const LoginPage = () => {
  const { feedback } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Formik } = formik;
  const focus = useRef();

  const schema = logInSchema;

  useEffect(() => focus.current && focus.current.focus());

  return (
    <Container className="row mx-auto my-auto col-3">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center mb-3">{newInstance.t('enter')}</h1>
          </Card.Title>
          <Card.Text as="div">
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                dispatch(logIn(values)).then((result) => {
                  if (!result.error) {
                    navigate('/', { replace: false });
                  }
                });
              }}
              initialValues={{
                username: '',
                password: '',
              }}
            >
              {({
                handleSubmit, handleChange, values, errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <FloatingLabel
                      label="Имя"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder={newInstance.t('userName')}
                        required
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                        ref={focus}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group controlId="validationFormik04">
                    <FloatingLabel
                      label="Пароль"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder={newInstance.t('password')}
                        required
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password | !!feedback} // eslint-disable-line no-bitwise
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
                  >
                    {newInstance.t('enter')}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          <Link to="/signup">{newInstance.t('register')}</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;
