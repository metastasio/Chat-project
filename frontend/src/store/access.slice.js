/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createNewUser, getUserToken } from '../services/requestsToServer.js';

export const logIn = createAsyncThunk(
  'access/logIn',
  async (userData, { dispatch }) => {
    dispatch(setError(''));
    const { data } = await getUserToken(userData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },
);

export const register = createAsyncThunk(
  'access/register',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await createNewUser(userData);
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(setError(''));
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
    setError(state, { payload }) {
      state.feedback = payload?.feedback;
      state.status = 'error';
    },
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
        state.feedback = 'Loading';
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const { token, username } = payload;
        state.token = token;
        state.username = username;
        state.status = 'idle';
      })
      .addCase(register.pending, (state) => {
        state.feedback = 'Loading';
        state.status = 'loading';
      });
  },
});

export const { setError, logOut } = accessSlice.actions;

export default accessSlice.reducer;
