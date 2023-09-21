import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getChatContent } from '../services/tokenReceiver';

export const setChatContent = createAsyncThunk(
  'channels/getChatContent',
  async function (chatData) {
    const { data } = await getChatContent(chatData);
    return data;
  },
);

const contentSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    messages: [],
    currentChannel: '',
    feedback: '',
    status: '',
  },
  reducers: {
    changeChannel(state, action) {
      console.log(action.payload, 'PAYLOAD');
      state.currentChannel = action.payload;
    },
    addChannel(state, action) {},
    removeChannel(state, action) {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(setChatContent.fulfilled, (state, action) => {
        const { channels, messages, currentChannelId } = action.payload;
        state.channels = channels;
        state.messages = messages;
        state.currentChannel = currentChannelId;
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

export const { addChannel, removeChannel, changeChannel } =
  contentSlice.actions;

export default contentSlice.reducer;
