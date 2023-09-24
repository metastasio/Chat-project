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
  username: yup.string().required('Введите имя пользователя'),
  password: yup.string().required('Введите пароль'),
});


// const addChannelSchema = yup.object().shape({
//   name: yup
//     .string()
//     .required('Введите название канала')
//     .notOneOf(names, 'Канал с таким названием уже создан')
//     .min(2, 'Минимум 2 символа')
//     .max(50, 'Максимум 50 символов')
//     .trim('The contact name cannot include leading and trailing spaces'),
// });

export { singUpSchema, logInSchema };
