import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import contentReducer from './contentSlice.js';

export default configureStore({
  reducer: {
    authorization: authReducer,
    content: contentReducer,
  },
});
