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
    feedback: '',
    status: '',
  },
  reducers: {
    sendMessage(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(setMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(setMessages.pending, (state) => {
        state.feedback = 'Loading';
        state.status = 'loading';
      })
      .addCase(setMessages.rejected, (state) => {
        state.feedback = 'Error';
        state.status = 'error';
        state.username = '';
      });
  },
});

export const { sendMessage } = chatSlice.actions;

export default chatSlice.reducer;
