import { configureStore } from '@reduxjs/toolkit';
import accessReducer from './access.slice.js';
import channelReducer from './channels.slice.js';
import chatReducer from './chat.slice.js';
import modalReducer from './modal.slice.js';

export default configureStore({
  reducer: {
    authorization: accessReducer,
    channels: channelReducer,
    chats: chatReducer,
    modal: modalReducer,
  },
});
