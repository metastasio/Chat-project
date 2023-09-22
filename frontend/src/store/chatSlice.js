import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getChatContent } from '../services/tokenReceiver';

export const setMessages = createAsyncThunk(
  'chats/getChatContent',
  async function (chatData) {
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
    sendMessage(state, action) {},
    getNewMessages(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.status = 'idle';
      })
      .addCase(setMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setMessages.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { sendMessage, getNewMessages } = chatSlice.actions;

export default chatSlice.reducer;
