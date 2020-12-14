import { SET_SETTINGS } from './action-types';

function setSettings(state, payload) {
	return { ...state, ...payload.settings, selectedPath: undefined };
}

export default function path(state, action) {
	if (action.type === SET_SETTINGS) setSettings(state, action.payload);
	return state;
}
