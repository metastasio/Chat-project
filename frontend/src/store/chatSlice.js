import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getChatContent } from '../services/tokenReceiver';

export const setChatContent = createAsyncThunk(
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
      .addCase(setChatContent.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(setChatContent.pending, (state) => {
        state.feedback = 'Loading';
        state.status = 'loading';
      })
      .addCase(setChatContent.rejected, (state) => {
        state.feedback = 'Error';
        state.status = 'error';
        state.username = '';
      });
  },
});

export const { sendMessage } = chatSlice.actions;

export default chatSlice.reducer;
