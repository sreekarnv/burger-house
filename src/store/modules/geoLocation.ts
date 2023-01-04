import { createSlice } from '@reduxjs/toolkit';

interface GeoLocationState {
  location: { coordinates: [number, number] | [] };
  allowLocation: boolean;
  error: {
    code: number;
    message: string;
  } | null;
}

const initialState: GeoLocationState = {
  location: { coordinates: [] },
  allowLocation: false,
  error: null,
};

export const geoLocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    updateLocationCoordinates: (state, { payload }) => {
      state.allowLocation = true;
      state.location.coordinates = payload.coordinates;
    },
    updateError: (state, { payload }) => {
      state.allowLocation = false;
      state.location.coordinates = [];
      state.error = payload.error;
    },
    updateAllowLocation: (state, { payload }) => {
      state.allowLocation = payload.status;
    },
  },
});

export const { updateLocationCoordinates, updateError, updateAllowLocation } =
  geoLocationSlice.actions;

export default geoLocationSlice.reducer;
