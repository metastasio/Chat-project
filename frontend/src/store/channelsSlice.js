import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: null,
  },
  reducers: {
    addChannel(state, action) {},
  },
  extraReducers: (builder) => {},
});

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
