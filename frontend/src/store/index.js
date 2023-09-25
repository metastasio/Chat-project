import { configureStore } from '@reduxjs/toolkit';
import accessReducer from './access.slice.js';
import contentReducer from './content.slice.js';
import modalReducer from './modal.slice.js';

export default configureStore({
  reducer: {
    authorization: accessReducer,
    channels: contentReducer,
    modal: modalReducer,
  },
});
