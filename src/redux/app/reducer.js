import { SET_APP_VERSION, SET_NEW_VERSION, SET_PLATFORM } from './action-types';

function setPlatform(state, payload) {
	return { ...state, isWeb: payload.isWeb };
}

function setAppVersion(state, payload) {
	return { ...state, version: payload.version };
}

function setNewVersion(state, payload) {
	return { ...state, newVersion: payload.version };
}

export default function app(state, action) {
	if (action.type === SET_PLATFORM) return setPlatform(state, action.payload);
	if (action.type === SET_APP_VERSION) return setAppVersion(state, action.payload);
	if (action.type === SET_NEW_VERSION) return setNewVersion(state, action.payload);
	return state;
}
