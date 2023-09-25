import * as yup from 'yup';

const singUpSchema = yup.object().shape({
  username: yup
    .string()
    .required('enterUserName')
    .min(3, 'min')
    .max(20, 'max')
    .trim(),
  password: yup
    .string()
    .required('enterPassword')
    .min(6, 'min6')
    .trim(),
  passwordConfirmation: yup
    .string()
    .required('passwordConfirmation')
    .oneOf([yup.ref('password')], 'passwordsMatch')
    .trim(),
});

const logInSchema = yup.object().shape({
  username: yup.string().required('Введите имя пользователя').trim(),
  password: yup.string().required('enterPassword').trim(),
});

const addChannelSchema = (names) => yup.object().shape({
  name: yup
    .string()
    .required('enterChannelName')
    .notOneOf(names, 'alreadyCreated')
    .min(2, 'min')
    .max(20, 'max')
    .trim(),
});

const renameChannelSchema = (names) => yup.object().shape({
  name: yup
    .string()
    .required('enterChannelName')
    .notOneOf(names, 'alreadyCreated')
    .min(2, 'min')
    .max(50, 'validation.max')
    .trim(),
});

export {
  singUpSchema, logInSchema, addChannelSchema, renameChannelSchema,
};
