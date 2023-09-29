import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createNewUser, getUserToken } from '../services/requestsToServer.js';

export const logIn = createAsyncThunk(
  'access/logIn',
  async (userData, { dispatch }) => {
    dispatch(setError('')); // eslint-disable-line no-use-before-define
    const { data } = await getUserToken(userData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },
);

export const register = createAsyncThunk(
  'access/register',
  async (userData, { dispatch }) => {
    dispatch(setError('')); // eslint-disable-line no-use-before-define
    const { data } = await createNewUser(userData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },
);

const userDataParsed = JSON.parse(localStorage.getItem('user'));
const accessSlice = createSlice({
  name: 'access',
  initialState: {
    token: userDataParsed.token || null,
    username: userDataParsed.username || null,
    feedback: '',
    status: 'idle',
  },
  reducers: {
    setError(state, { payload }) {
      state.feedback = payload;
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
      .addCase(logIn.rejected, (state, { error }) => {
        if (error.code === 'ERR_BAD_REQUEST') {
          state.feedback = 'Неверное имя пользователя или пароль';
          state.status = 'idle';
          state.username = '';
        } else if (error.code === 'ERR_NETWORK') {
          state.status = 'idle';
          state.username = '';
        }
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
      })
      .addCase(register.rejected, (state, { error }) => {
        if (error.code === 'ERR_BAD_REQUEST') {
          state.feedback = 'Неверное имя пользователя или пароль';
          state.username = '';
        } else if (error.code === 'ERR_NETWORK') {
          state.status = 'idle';
          state.username = '';
        }
      });
  },
});

export const { setError, logOut } = accessSlice.actions;

export default accessSlice.reducer;
