import * as yup from 'yup';

import newInstance from '../services/locales'

const singUpSchema = yup.object().shape({
  username: yup
    .string()
    .required(newInstance.t('enterUserName'))
    .min(3, newInstance.t('min'))
    .max(20, newInstance.t('max'))
    .trim(),
  password: yup
    .string()
    .required(newInstance.t('enterPassword'))
    .min(6, newInstance.t('min6'))
    .trim(),
  passwordConfirmation: yup
    .string()
    .required(newInstance.t('passwordConfirmation'))
    .oneOf([yup.ref('password')], newInstance.t('passwordsMatch'))
    .trim(),
});

const logInSchema = yup.object().shape({
  username: yup.string().required('Введите имя пользователя').trim(),
  password: yup.string().required(newInstance.t('enterPassword')).trim(),
});

const addChannelSchema = (names) => yup.object().shape({
  name: yup
    .string()
    .required(newInstance.t('enterChannelName'))
    .notOneOf(names, newInstance.t('alreadyCreated'))
    .min(2, newInstance.t('min'))
    .max(20, newInstance.t('max'))
    .trim(),
});

const renameChannelSchema = (names) => yup.object().shape({
  name: yup
    .string()
    .required(newInstance.t('enterChannelName'))
    .notOneOf(names, newInstance.t('alreadyCreated'))
    .min(2, newInstance.t('min'))
    .max(50, newInstance.t('max'))
    .trim(),
});

export {
  singUpSchema, logInSchema, addChannelSchema, renameChannelSchema,
};
