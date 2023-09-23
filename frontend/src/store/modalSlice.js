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
    },
  },
  reducers: {
    openModal(state, action) {
      state.type = action.payload.type;
      state.open = true;
      state.meta = action.payload?.meta;
    },

    closeModal(state) {
      state.type = '';
      state.open = false;
      state.meta = null;
    },

    showToast(state, action) {
      state.toast.open = true;
      state.toast.message = action.payload;
    },
    closeToast(state) {
      state.toast.open = false;
      state.toast.message = '';
    },
  },
});

export const { openModal, closeModal, showToast, closeToast } =
  modalSlice.actions;

export default modalSlice.reducer;
