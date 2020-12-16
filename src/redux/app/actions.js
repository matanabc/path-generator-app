import { SET_APP_VERSION, SET_PLATFORM } from './action-types';

export function isWeb(value) {
	return {
		type: SET_PLATFORM,
		payload: {
			isWeb: value,
		},
	};
}

export function setAppVersion(version) {
	return {
		type: SET_APP_VERSION,
		payload: {
			version: version,
		},
	};
}
