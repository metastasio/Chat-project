// import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import * as formik from 'formik';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Должно быть не меньше 3 символов')
      .max(15, 'Имя не должно превышать 15 символов')
      .required('Заполните имя'),
    password: yup
      .string()
      .min(5, 'Должно быть не меньше 5 символов')
      .required('Введите пароль'),
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
              console.log(values);
            }}
            initialValues={{
              name: '',
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
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group md='6' controlId='validationFormik04'>
                  <FloatingLabel controlId='floatingPassword' label='Пароль'>
                    <Form.Control
                      type='password'
                      placeholder='Пароль'
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

// const LoginPage = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//     },
//     validationSchema: yup.object({
//       name: yup
//         .string()
//         .min(3, 'Must be 15 characters or less')
//         .max(15, 'Имя не должно превышать 15 символов')
//         .required('Заполните имя'),
//       password: yup
//         .string()
//         .min(5, 'Must be 20 characters or less')
//         .required('Введите пароль'),
//     }),
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <Card style={{ width: '32rem' }}>
//       <Card.Body>
//         <Card.Title>
//           <h1 className='text-center mb-3'>Войти</h1>
//         </Card.Title>
//         <Card.Text>
//           <Form onSubmit={formik.handleSubmit}>
//             <FloatingLabel
//               controlId='floatingInput'
//               label='Имя'
//               className='mb-3'
//             >
//               <Form.Control
//                 type='text'
//                 placeholder='Имя'
//                 {...formik.getFieldProps('name')}
//               />
//             </FloatingLabel>
//             <FloatingLabel controlId='floatingPassword' label='Пароль'>
//               <Form.Control
//                 type='password'
//                 placeholder='Пароль'
//                 {...formik.getFieldProps('password')}
//               />
//             </FloatingLabel>
//           </Form>
//         </Card.Text>
//         <Button variant='outline-primary' className='w-100'>
//           Войти
//         </Button>
//       </Card.Body>
//       <Card.Footer className='text-muted text-center'>
//         Зарегистрироваться
//       </Card.Footer>
//     </Card>
//   );
// };

export default LoginPage;
