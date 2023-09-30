/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createNewUser, getUserToken } from '../services/requestsToServer.js';

export const logIn = createAsyncThunk(
  'access/logIn',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await getUserToken(userData);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue({ code: err.code, response: err?.response?.data });
    }
  },
);

export const register = createAsyncThunk(
  'access/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await createNewUser(userData);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue({ code: err.code, response: err?.response?.data });
    }
  },
);

const userDataParsed = JSON.parse(localStorage.getItem('user'));

const accessSlice = createSlice({
  name: 'access',
  initialState: {
    token: userDataParsed?.token,
    username: userDataParsed?.username,
    feedback: '',
    status: 'idle',
  },
  reducers: {
    logOut(state) {
      state.token = null;
      state.username = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, { payload }) => {
        const { token, username } = payload;
        state.token = token;
        state.username = username;
        state.status = 'idle';
      })
      .addCase(logIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logIn.rejected, (state) => {
        state.status = 'idle';
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const { token, username } = payload;
        state.token = token;
        state.username = username;
        state.status = 'idle';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export const { logOut } = accessSlice.actions;

export default accessSlice.reducer;
