import { SET_PLATFORM } from './action-types';

export function isWeb(value) {
	return {
		type: SET_PLATFORM,
		payload: {
			isWeb: value,
		},
	};
}
