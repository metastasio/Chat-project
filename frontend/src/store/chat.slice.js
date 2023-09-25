import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getChatContent } from '../services/requestsToServer.js';
import { removeChannel } from './channels.slice.js';

export const setMessages = createAsyncThunk(
  'chats/getChatContent',
  async (chatData) => {
    const { data } = await getChatContent(chatData);
    return data;
  },
);

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
      .addCase(setMessages.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
        state.status = 'idle';
      })
      .addCase(setMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setMessages.rejected, (state) => {
        state.status = 'error';
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
