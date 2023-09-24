import { configureStore } from '@reduxjs/toolkit';
import accessReducer from './accessSlice.js';
import channelReducer from './channelsSlice.js';
import chatReducer from './chatSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    authorization: accessReducer,
    channels: channelReducer,
    chats: chatReducer,
    modal: modalReducer,
  },
});
