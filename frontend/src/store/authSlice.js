import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserToken } from '../services/tokenReceiver';

export const logIn = createAsyncThunk(
  'authorization/logIn',
  async function (userData, { dispatch }) {
    dispatch(setError(''));
    const { data } = await getUserToken(userData);
    return data;
  },
);

const authSlice = createSlice({
  name: 'authorization',
  initialState: {
    token: null,
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        state.token = token;
        state.username = username;
        state.status = 'authorized';
      })
      .addCase(logIn.pending, (state) => {
        state.feedback = 'Loading';
        state.status = 'loading';
      })
      .addCase(logIn.rejected, (state) => {
        state.feedback = 'Неверное имя пользователя или пароль';
        state.status = 'unauthorized';
        state.username = '';
      });
  },
});

export const { setError, logOut } = authSlice.actions;

export default authSlice.reducer;
