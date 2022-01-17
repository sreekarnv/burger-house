import { createSlice } from '@reduxjs/toolkit';

interface GeoLocationState {
	location: { coordinates: [number, number] | [] };
	browserAllowLocation: boolean;
	allowLocation: boolean;
	isError: boolean;
}

const initialState: GeoLocationState = {
	location: { coordinates: [] },
	browserAllowLocation: true,
	allowLocation: false,
	isError: false,
};

export const geoLocationSlice = createSlice({
	name: 'geolocation',
	initialState,
	reducers: {
		updateLocationCoordinates: (state, { payload }) => {
			state.location.coordinates = payload.coordinates;
		},
		updateError: (state, { payload }) => {
			state.isError = payload.error;
		},
		updateBrowserAllowLocation: (state, { payload }) => {
			state.browserAllowLocation = payload.status;
		},
		updateAllowLocation: (state, { payload }) => {
			state.allowLocation = payload.status;
		},
	},
});

export const {
	updateLocationCoordinates,
	updateError,
	updateBrowserAllowLocation,
	updateAllowLocation,
} = geoLocationSlice.actions;

export default geoLocationSlice.reducer;
