import { SET_SETTINGS } from './action-types';

export function setSettings(settings) {
	return {
		type: SET_SETTINGS,
		payload: {
			settings: settings,
		},
	};
}
