import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import channelReducer from './channelsSlice.js';
import chatReducer from './chatSlice.js';

export default configureStore({
  reducer: {
    authorization: authReducer,
    channels: channelReducer,
    chats: chatReducer,
  },
});
