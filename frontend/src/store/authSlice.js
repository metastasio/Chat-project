import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';

import recieveToken from '../services/tokenReciever';

export const logIn = createAsyncThunk(
  'authorization/logIn',
  function (userData, { dispatch }) {
    dispatch(setError(''));
    const token = recieveToken(userData);
    return token;
  },
);

const authSlice = createSlice({
  name: 'authorization',
  initialState: {
    token: '',
    feedback: '',
    status: 'idle',
  },
  reducers: {
    setError(state, action) {
      state.feedback = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        const { token } = action.payload.data;
        state.token = token;
        state.status = 'authorized';
        redirect("/");
      })
      .addCase(logIn.pending, (state) => {
        state.feedback = 'Loading';
        state.status = 'loading';
      })
      .addCase(logIn.rejected, (state, action) => {
        state.feedback = 'Неверноые имя пользователя или пароль';
        state.status = 'unauthorized';
      });
  },
});

export const { setError } = authSlice.actions;

export default authSlice.reducer;
