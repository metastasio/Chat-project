/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

// import { getContent } from './content.slice';
// import { logOut } from './access.slice';

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
    // showToast(state, { payload }) {
    //   state.toast.open = true;
    //   state.toast.message = payload.message;
    //   state.toast.level = payload.level;
    // },
    // closeToast(state) {
    //   state.toast.open = false;
    //   state.toast.level = 'success';
    //   state.toast.message = '';
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getContent.rejected, (state, { error }) => {
  //       if (error.code === 'ERR_NETWORK') {
  //         state.toast.open = true;
  //         state.toast.level = 'warning';
  //       }
  //     })
  //     .addCase(logOut, (state) => {
  //       state.toast.open = false;
  //     });
  // },
});

// export const {
//   openModal, closeModal, showToast, closeToast,
// } = modalSlice.actions;
export const {
  openModal, closeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
