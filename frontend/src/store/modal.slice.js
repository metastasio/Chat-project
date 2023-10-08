/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    type: '',
    meta: null,
    toast: {
      open: false,
      message: '',
      level: 'success',
    },
  },
  reducers: {
    openModal(state, { payload }) {
      state.type = payload.type;
      state.open = true;
      state.meta = payload.meta;
    },
    closeModal(state) {
      state.type = '';
      state.open = false;
      state.meta = null;
    },
  },
});

export const {
  openModal, closeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
