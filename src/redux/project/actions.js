import { SET_SETTINGS, SET_PROJECT_PATH, SET_FIELD_CONFIG } from './action-types';

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

export function setFieldConfig(fieldConfig) {
	return {
		type: SET_FIELD_CONFIG,
		payload: {
			fieldConfig: fieldConfig,
		},
	};
}
