// import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import * as formik from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../store/authSlice.js';

const LoginPage = () => {
  const { feedback } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Formik } = formik;

  const schema = yup.object().shape({
    username: yup.string().required('Заполните имя'),
    password: yup.string().required('Введите пароль'),
  });

  return (
    <Card style={{ width: '32rem' }}>
      <Card.Body>
        <Card.Title>
          <h1 className='text-center mb-3'>Войти</h1>
        </Card.Title>
        <Card.Text as='div'>
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
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group md='6' controlId='validationFormik03'>
                  <FloatingLabel
                    controlId='floatingInput'
                    label='Имя'
                    className='mb-3'
                  >
                    <Form.Control
                      type='text'
                      placeholder='Имя'
                      required
                      name='username'
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group md='6' controlId='validationFormik04'>
                  <FloatingLabel controlId='floatingPassword' label='Пароль'>
                    <Form.Control
                      type='password'
                      placeholder='Пароль'
                      required
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password | !!feedback}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.password}
                      {feedback}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  type='submit'
                  variant='outline-primary'
                  className='w-100'
                >
                  Войти
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted text-center'>
        <Link to='/registration'>Зарегистрироваться</Link>
      </Card.Footer>
    </Card>
  );
};

export default LoginPage;
