import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  pageIsReady: boolean;
}

const initialState: AppState = {
  pageIsReady: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    togglePageIsReady: (state) => {
      state.pageIsReady = !state.pageIsReady;
    },
  },
});

export const { togglePageIsReady } = appSlice.actions;

export default appSlice.reducer;
