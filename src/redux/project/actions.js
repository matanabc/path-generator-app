import { SET_SETTINGS, SET_PROJECT_PATH } from './action-types';

export function setSettings(settings) {
	return {
		type: SET_SETTINGS,
		payload: {
			settings: settings,
		},
	};
}

export function setProjectPath(path) {
	return {
		type: SET_PROJECT_PATH,
		payload: {
			projectPath: path,
		},
	};
}
