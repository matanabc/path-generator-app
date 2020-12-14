import { SET_SETTINGS } from './action-types';

function setSettings(state, payload) {
	return { ...state, ...payload.settings, selectedPath: undefined };
}

export default function project(state, action) {
	if (action.type === SET_SETTINGS) return setSettings(state, action.payload);
	return state;
}
