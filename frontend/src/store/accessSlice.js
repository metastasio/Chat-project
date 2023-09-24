import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { createNewUser, getUserToken } from '../services/tokenReceiver';

export const logIn = createAsyncThunk(
  'access/logIn',
  async function (userData, { dispatch }) {
    dispatch(setError(''));
    const { data } = await getUserToken(userData);
    return data;
  },
);

export const register = createAsyncThunk(
  'access/register',
  async function (userData, { dispatch }) {
    dispatch(setError(''));
    const { data } = await createNewUser(userData);
    console.log(data, 'DTA')
    return data;
  },
);

const accessSlice = createSlice({
  name: 'access',
  initialState: {
    token: '',
    username: '',
    feedback: '',
    status: 'idle',
  },
  reducers: {
    setError(state, action) {
      state.feedback = action.payload;
    },
    logOut(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        state.token = token;
        state.username = username;
        state.status = 'idle';
      })
      .addCase(logIn.pending, (state) => {
        state.feedback = 'Loading';
        state.status = 'loading';
      })
      .addCase(logIn.rejected, (state) => {
        state.feedback = 'Неверное имя пользователя или пароль';
        state.status = 'unauthorized';
        state.username = '';
      })
      .addCase(register.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        state.token = token;
        state.username = username;
        state.status = 'idle';
      })
      .addCase(register.pending, (state) => {
        state.feedback = 'Loading';
        state.status = 'loading';
      })
      .addCase(register.rejected, (state) => {
        state.feedback = 'Такой пользователь уже зарегистрирован';
        state.status = 'unauthorized';
        state.username = '';
      });
  },
});

export const { setError, logOut } = accessSlice.actions;

export default accessSlice.reducer;
