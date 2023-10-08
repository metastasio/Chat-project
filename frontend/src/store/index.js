import { configureStore } from '@reduxjs/toolkit';

import contentReducer from './content.slice.js';
import modalReducer from './modal.slice.js';

export default configureStore({
  reducer: {
    content: contentReducer,
    modal: modalReducer,
  },
});
