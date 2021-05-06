import * as actionTypes from '~app/store/actionTypes';

import { AnyAction } from 'redux';

interface State {
	location: { coordinates: [number, number] | [] };
	browserAllowLocation: boolean;
	allowLocation: boolean;
	isError: boolean;
}

const initialState: State = {
	location: { coordinates: [] },
	browserAllowLocation: true,
	allowLocation: false,
	isError: false,
};

const reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case actionTypes.UPDATE_LOCATION_COORDINATES:
			return {
				...state,
				location: {
					...state.location,
					coordinates: action.coordinates,
				},
			};
		case actionTypes.UPDATE_LOCATION_ERROR:
			return {
				...state,
				isError: action.error,
			};
		case actionTypes.UPDATE_BROWSER_ALLOW_LOCATION:
			return {
				...state,
				browserAllowLocation: action.status,
			};
		case actionTypes.UPDATE_ALLOW_LOCATION:
			return {
				...state,
				allowLocation: action.status,
			};
		default:
			return state;
	}
};

export default reducer;
