import i18n from 'i18next';
import ru from './ru.js';

const newInstance = i18n.createInstance(
  {
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  },
  (err) => {
    console.log('something went wrong loading', err);
  },
);

export { newInstance };
