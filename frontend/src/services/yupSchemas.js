import * as yup from 'yup';
import * as leoProfanity from 'leo-profanity';

const schemaChannel = (names) => yup.object().shape({
  name: yup
    .string()
    .required('required')
    .notOneOf(names, 'alreadyCreated')
    .test('profanity', 'profanity', (values) => !leoProfanity.check(values))
    .min(3, 'minmax')
    .max(20, 'minmax')
    .trim(),
});

const schemaLogIn = yup.object().shape({
  username: yup.string().required('required').trim(),
  password: yup.string().required('required').trim(),
});

const schemaSignUp = yup.object().shape({
  username: yup
    .string()
    .required('required')
    .min(3, 'minmax')
    .max(20, 'minmax')
    .test('profanity', 'profanity', (values) => !leoProfanity.check(values))
    .trim(),
  password: yup
    .string()
    .required('required')
    .min(6, 'min')
    .trim(),
  passwordConfirmation: yup
    .string()
    .required('required')
    .oneOf([yup.ref('password')], 'passwordsMatch')
    .trim(),
});

export { schemaChannel, schemaLogIn, schemaSignUp };
