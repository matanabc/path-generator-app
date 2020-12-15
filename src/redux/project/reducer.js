import { SET_SETTINGS, SET_PROJECT_PATH } from './action-types';

function setSettings(state, payload) {
	return { ...state, ...payload.settings, selectedPath: undefined };
}

function setProjectPath(state, payload) {
	return { ...state, projectPath: payload.projectPath, selectedPath: undefined };
}

export default function project(state, action) {
	if (action.type === SET_SETTINGS) return setSettings(state, action.payload);
	if (action.type === SET_PROJECT_PATH) return setProjectPath(state, action.payload);
	return state;
}
