import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    type: '',
    message: '',
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
    showNotificationCreated(state) {
      state.type = 'channelCreated';
      state.open = true;
      state.message = 'Канал добавлен!';
    },
    showWarning(state) {
      state.type = 'networkError';
      state.open = true;
      state.message =
        'Не удается отправить сообщение, проверьте интернет-соединение';
    },
  },
});

export const {
  createNewChannel,
  closeModal,
  showNotificationCreated,
  showWarning,
} = modalSlice.actions;

export default modalSlice.reducer;
