// import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, FloatingLabel, Card, Container } from 'react-bootstrap';
import * as formik from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, register } from '../store/accessSlice.js';
import { newInstance } from '../services/locales/index.js';

const SignUp = () => {
  const { feedback } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Formik } = formik;

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Заполните имя')
      .min(3, 'Не должно быть меньше 3 символов')
      .max(20, 'Не должно быть больше 20 символов '),
    password: yup
      .string()
      .required('Введите пароль')
      .min(6, 'Должно быть не меньше 6 символов'),
    passwordConfirmation: yup
      .string()
      .required('Подтвердите пароль')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });

  return (
    <Container className='row mx-auto my-auto col-3'>
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className='text-center mb-3'>{newInstance.t('signUp')}</h1>
          </Card.Title>
          <Card.Text as='div'>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                dispatch(register(values)).then((result) => {
                  if (!result.error) {
                    navigate('/', { replace: false });
                  }
                });
              }}
              initialValues={{
                username: '',
                password: '',
                passwordConfirmation: '',
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <FloatingLabel label='Имя' className='mb-3'>
                      <Form.Control
                        type='text'
                        placeholder={newInstance.t('userName')}
                        required
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username | !!feedback}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.username}
                        {feedback}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <FloatingLabel label='Пароль' className='mb-3'>
                      <Form.Control
                        type='password'
                        placeholder={newInstance.t('password')}
                        required
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <FloatingLabel
                      label={newInstance.t('passwordConfirmation')}
                      className='mb-3'
                    >
                      <Form.Control
                        type='password'
                        placeholder={newInstance.t('passwordConfirmation')}
                        required
                        name='passwordConfirmation'
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        isInvalid={!!errors.passwordConfirmation}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.passwordConfirmation}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Button
                    type='submit'
                    variant='outline-primary'
                    className='w-100'
                  >
                    {newInstance.t('register')}
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
