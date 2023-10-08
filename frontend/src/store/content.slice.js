/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { findIndex, set } from 'lodash-es';

import { getChatContent } from '../services/requestsToServer.js';

export const getContent = createAsyncThunk(
  'content/getChannelContent',
  async (chatData) => {
    const { data } = await getChatContent(chatData);
    return data;
  },
);

const contentSlice = createSlice({
  name: 'content',
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
      const { id } = payload;
      state.entities = state.entities.filter(
        (entity) => entity.id !== id,
      );
      state.messages = state.messages.filter(
        (message) => message.channelId !== id,
      );
      if (id === state.currentChannel) {
        state.currentChannel = 1;
      }
    },
    renameChannel(state, { payload }) {
      const path = findIndex(
        state.entities,
        (entity) => entity.id === payload.id,
      );
      state.entities = set(state.entities, path, payload);
    },
    resetContentData(state) {
      state.ids = [];
      state.entities = [];
      state.messages = [];
      state.currentChannel = '';
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContent.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        if (channels.length) {
          state.ids = channels.map((channel) => channel.id);
        }
        state.currentChannel = currentChannelId;
        state.messages = payload.messages;
        state.entities = channels;
        state.status = 'idle';
      })
      .addCase(getContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getContent.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const {
  getNewChannel,
  removeChannel,
  changeActiveChannel,
  renameChannel,
  getNewMessages,
  resetContentData,
} = contentSlice.actions;

export default contentSlice.reducer;
