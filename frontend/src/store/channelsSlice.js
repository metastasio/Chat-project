import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { findIndex, set } from 'lodash-es';

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
    names: [],
    currentChannel: '',
    status: '',
  },
  reducers: {
    changeActiveChannel(state, action) {
      state.currentChannel = action.payload;
    },
    getNewChannel(state, action) {
      state.entities.push(action.payload);
      state.ids.push(action.payload.id);
      state.names.push(action.payload.name);
    },
    removeChannel(state, action) {
      state.entities = state.entities.filter(
        (entity) => entity.id !== action.payload.id,
      );
    },
    renameChannel(state, action) {
      const path = findIndex(
        state.entities,
        (entity) => entity.id === action.payload.id,
      );
      state.entities = set(state.entities, path, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addChannels.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        if (channels.length) {
          state.ids = channels.map((channel) => channel.id);
          state.names = channels.map((channel) => channel.name);
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

export const {
  getNewChannel,
  removeChannel,
  changeActiveChannel,
  renameChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
