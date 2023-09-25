import { createSlice } from '@reduxjs/toolkit';

import { addChannels, removeChannel } from './channels.slice.js';

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    messages: [],
    status: '',
  },
  reducers: {
    getNewMessages(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannels.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      })
      .addCase(removeChannel, (state, { payload }) => {
        const channelId = payload.id;
        state.messages = state.messages.filter(
          (message) => message.channelId !== channelId,
        );
      });
  },
});

export const { getNewMessages } = chatSlice.actions;

export default chatSlice.reducer;
