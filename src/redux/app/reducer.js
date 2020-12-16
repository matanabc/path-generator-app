import { SET_PLATFORM } from './action-types';

function setPlatform(state, payload) {
	return { ...state, isWeb: payload.isWeb };
}

export default function app(state, action) {
	if (action.type === SET_PLATFORM) return setPlatform(state, action.payload);
	return state;
}
