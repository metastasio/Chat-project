import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import * as leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import store from './store';
import resources from './services/locales/index.js';
import App from './App.js';

const init = async () => {
  const i18n = i18next.createInstance();
  const russianDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(russianDictionary);

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_RAILWAY_TOKEN,
    environment: 'production',
  };

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </I18nextProvider>
        </Provider>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
