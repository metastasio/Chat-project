// import { useFormik } from 'formik';
import * as formik from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import * as leoProfanity from 'leo-profanity';
import {
  Button, Form, FloatingLabel, Card, Container,
} from 'react-bootstrap';

import { register, setError } from '../../store/access.slice.js';
import { showToast } from '../../store/modal.slice.js';

const SignUp = () => {
  const { t } = useTranslation();
  const { feedback, status } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Formik } = formik;
  const focus = useRef();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t('form.errors.enterUserName'))
      .min(3, t('form.errors.min'))
      .max(20, t('form.errors.max'))
      .test('profanity', t('form.errors.filter'), (values) => !leoProfanity.check(values))
      .trim(),
    password: yup
      .string()
      .required(t('form.errors.enterPassword'))
      .min(6, t('form.errors.min6'))
      .trim(),
    passwordConfirmation: yup
      .string()
      .required(t('form.errors.passwordConfirmation'))
      .oneOf([yup.ref('password')], t('form.errors.passwordsMatch'))
      .trim(),
  });

  useEffect(() => focus.current && focus.current.focus());

  const onSubmit = (values) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        navigate('/', { replace: false });
      })
      .catch(({ code, response }) => {
        if (code === 'ERR_NETWORK') {
          dispatch(showToast({ message: t('toast.networkError'), level: 'warning' }));
          dispatch(setError());
        } else if (response?.statusCode === 409) {
          dispatch(setError({ feedback: t('form.errors.alreadyCreatedUser') }));
        }
      });
  };

  return (
    <Container className="row mx-auto my-auto col-3">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-center mb-3">{t('form.signUp')}</h1>
          </Card.Title>
          <Card.Text as="div">
            <Formik
              validationSchema={schema}
              onSubmit={onSubmit}
              initialValues={{
                username: '',
                password: '',
                passwordConfirmation: '',
              }}
            >
              {({
                handleSubmit, handleChange, values, errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <FloatingLabel label="Имя" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder={t('.form.userName')}
                        required
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username | !!feedback} // eslint-disable-line no-bitwise
                        ref={focus}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                        {feedback}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <FloatingLabel label="Пароль" className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder={t('form.password')}
                        required
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <FloatingLabel
                      label={t('form.errors.passwordConfirmation')}
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder={t('form.erorrs.passwordConfirmation')}
                        required
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        isInvalid={!!errors.passwordConfirmation}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.passwordConfirmation}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                    disabled={status === 'loading'}
                  >
                    {t('form.register')}
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
