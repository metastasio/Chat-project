import { createSlice } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { addChannels } from './content.slice';
import { logIn, register } from './access.slice';

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
  extraReducers: (builder) => {
    builder
      .addCase(addChannels.rejected, (state) => {
        state.toast.open = true;
        state.toast.message = t('networkError');
        state.toast.level = 'warning';
      })
      .addCase(logIn.rejected, (state, { error }) => {
        if (error.code === 'ERR_NETWORK') {
          state.toast.open = true;
          state.toast.message = t('networkError');
          state.toast.level = 'warning';
        }
      })
      .addCase(register.rejected, (state) => {
        state.toast.open = true;
        state.toast.message = t('networkError');
        state.toast.level = 'warning';
      });
  },
});

export const {
  openModal, closeModal, showToast, closeToast,
} = modalSlice.actions;

export default modalSlice.reducer;
