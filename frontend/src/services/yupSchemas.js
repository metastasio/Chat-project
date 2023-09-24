import * as yup from 'yup';

const singUpSchema = yup.object().shape({
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

const logInSchema = yup.object().shape({
  username: yup
    .string()
    .required('Заполните имя')
    .min(3, 'Не должно быть меньше 3 символов')
    .max(20, 'Не должно быть больше 20 символов '),
  password: yup.string().required('Введите пароль'),
});

export { singUpSchema, logInSchema };
