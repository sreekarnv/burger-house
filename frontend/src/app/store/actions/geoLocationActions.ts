import * as actionTypes from 'src/app/store/actionTypes';

export const updateLocationCoordinates = (
	coordinates: [] | [number, number]
) => {
	return {
		type: actionTypes.UPDATE_LOCATION_COORDINATES,
		coordinates,
	};
};

export const updateError = (error: boolean) => {
	return {
		type: actionTypes.UPDATE_LOCATION_ERROR,
		error,
	};
};

export const updateBrowerAllowLocation = (status: boolean) => {
	return {
		type: actionTypes.UPDATE_BROWSER_ALLOW_LOCATION,
		status,
	};
};

export const updateAllowLocation = (status: boolean) => {
	return {
		type: actionTypes.UPDATE_ALLOW_LOCATION,
		status,
	};
};
