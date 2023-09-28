import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { findIndex, set } from 'lodash-es';

import { getChatContent } from '../services/requestsToServer.js';
import { logOut } from './access.slice.js';

export const addChannels = createAsyncThunk(
  'channels/getChannelContent',
  async (chatData) => {
    const { data } = await getChatContent(chatData);
    return data;
  },
);

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    ids: [],
    entities: [],
    messages: [],
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
    },
    getNewMessages(state, { payload }) {
      state.messages.push(payload);
    },
    removeChannel(state, { payload }) {
      const channelId = payload.id;
      state.entities = state.entities.filter(
        (entity) => entity.id !== channelId,
      );
      state.messages = state.messages.filter(
        (message) => message.channelId !== channelId,
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
        }
        state.currentChannel = currentChannelId;
        state.messages = payload.messages;
        state.entities = channels;
        state.status = 'idle';
      })
      .addCase(addChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addChannels.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(logOut, (state) => {
        state.ids = [];
        state.entities = [];
        state.messages = [];
        state.currentChannel = '';
        state.status = '';
      });
  },
});

export const {
  getNewChannel,
  removeChannel,
  changeActiveChannel,
  renameChannel,
  getNewMessages,
} = channelSlice.actions;

export default channelSlice.reducer;
