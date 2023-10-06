import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import * as leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';

import store from './store';
import resources from './services/locales/index.js';
import App from './App.js';
import { AuthContext, SocketContext } from './context.js';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
const socket = io(URL, {
  autoConnect: false,
});

const handleEmit = async (event, payload, onError, onSuccess) => {
  try {
    const response = await socket.emitWithAck(event, payload);
    if (response) {
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data);
      }
    }
  } catch (err) {
    onError();
  }
};

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
        <SocketContext.Provider value={{ socket, handleEmit }}>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </I18nextProvider>
          </Provider>
        </SocketContext.Provider>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
