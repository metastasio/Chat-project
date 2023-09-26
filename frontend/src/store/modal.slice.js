import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    type: '',
    meta: null,
    extra: null,
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
      state.meta = payload?.meta;
      state.extra = payload.extra;
    },

    closeModal(state) {
      state.type = '';
      state.open = false;
      state.meta = null;
      state.extra = null;
    },

    showToast(state, { payload }) {
      console.log(payload);
      state.toast.open = true;
      state.toast.message = payload;
    },
    closeToast(state) {
      state.toast.open = false;
      state.toast.message = '';
      state.toast.level = 'success';
    },
  },
});

export const {
  openModal, closeModal, showToast, closeToast,
} = modalSlice.actions;

export default modalSlice.reducer;
