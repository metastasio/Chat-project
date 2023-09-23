import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    type: '',
    toast: {
      open: false,
      message: '',
    }
  },
  reducers: {
    createNewChannel(state, action) {
      state.type = 'newChannel';
      state.open = true;
    },
    closeModal(state) {
      state.type = '';
      state.open = false;
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

export const { createNewChannel, closeModal, showToast, closeToast } =
  modalSlice.actions;

export default modalSlice.reducer;
