import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    type: '',
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
  },
});

export const { createNewChannel, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
