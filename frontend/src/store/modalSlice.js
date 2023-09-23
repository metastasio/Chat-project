import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    type: '',
    toast: {
      open: false,
      message: '',
    },
    rename: {
      open: false,
      channelId: null,
    },
  },
  reducers: {
    createNewChannel(state) {
      state.type = 'newChannel';
      state.open = true;
    },
    renameChannel(state, action) {
      state.type = 'renameChannel';
      state.rename.open = true;
      state.rename.channelId = action.payload;
    },
    closeModal(state) {
      state.type = '';
      state.open = false;
      state.channelId = null;
    },
    closeRenameModal(state){
      state.type = '';
      state.rename.open = false;
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

export const {
  createNewChannel,
  renameChannel,
  closeModal,
  showToast,
  closeToast,
  closeRenameModal,
} = modalSlice.actions;

export default modalSlice.reducer;
