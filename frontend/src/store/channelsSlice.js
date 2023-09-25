import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { findIndex, set } from 'lodash-es';

import { getChatContent } from '../services/requestsToServer.js';

export const addChannels = createAsyncThunk(
  'channels/getChannelContent',
  async function (chatData, { getState }) {
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
    changeActiveChannel(state, { payload }) {
      state.currentChannel = payload;
    },
    getNewChannel(state, { payload }) {
      state.entities.push(payload);
      state.ids.push(payload.id);
      state.names.push(payload.name);
    },
    removeChannel(state, { payload }) {
      state.entities = state.entities.filter(
        (entity) => entity.id !== payload.id,
      );
    },
    renameChannel(state, { payload }) {
      const path = findIndex(
        state.entities,
        (entity) => entity.id === payload.id,
      );
      state.entities = set(state.entities, path, payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addChannels.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
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
