import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getChatContent } from '../services/tokenReceiver';

export const addChannels = createAsyncThunk(
  'channels/getChannelContent',
  async function (chatData) {
    const { data } = await getChatContent(chatData);
    return data;
  },
);

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    ids: [],
    entities: [],
    currentChannel: '',
    status: '',
  },
  reducers: {
    changeChannel(state, action) {
      state.currentChannel = action.payload;
    },
    addChannel(state, action) {},
    removeChannel(state, action) {},
    getNewChannels(state, action) {
      state.entities = [...action.payload, ...state.entities];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addChannels.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        if (channels.length) {
          state.ids = channels.map((channel) => channel.id);
        }
        state.currentChannel = currentChannelId;
        state.entities = channels;
        state.status = 'idle';
      })
      .addCase(addChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addChannels.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { addChannel, removeChannel, changeChannel } =
  channelSlice.actions;

export default channelSlice.reducer;
