import {
	SET_PROJECT_PATH,
	SET_FIELD_CONFIG,
	SET_SETTINGS,
	SET_CSV_PATH,
	SET_IMAGE,
} from './action-types';

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

export function setImage(imageUrl, image) {
	return {
		type: SET_IMAGE,
		payload: {
			imageUrl: imageUrl,
			image: image,
		},
	};
}

export function setCSVPath(path) {
	return {
		type: SET_CSV_PATH,
		payload: {
			path: path,
		},
	};
}
