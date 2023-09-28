import { createSlice } from '@reduxjs/toolkit';
import { addChannels } from './content.slice';
import { logIn, logOut, register } from './access.slice';

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
      state.toast.open = true;
      state.toast.message = payload;
    },
    closeToast(state) {
      state.toast.open = false;
      state.toast.level = 'success';
      state.toast.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannels.rejected, (state, { error }) => {
        if (error.code === 'ERR_NETWORK') {
          state.toast.open = true;
          state.toast.level = 'warning';
        }
      })
      .addCase(logIn.rejected, (state, { error }) => {
        if (error.code === 'ERR_NETWORK') {
          state.toast.open = true;
          state.toast.level = 'warning';
        }
      })
      .addCase(register.rejected, (state, { error }) => {
        if (error.code === 'ERR_NETWORK') {
          state.toast.open = true;
          state.toast.level = 'warning';
        }
      })
      .addCase(logOut, (state) => {
        state.toast.open = false;
      });
  },
});

export const {
  openModal, closeModal, showToast, closeToast,
} = modalSlice.actions;

export default modalSlice.reducer;
