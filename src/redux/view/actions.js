import { CHANGE_RANGE_POSITION } from './action-types';

export function changeRangePosition(position) {
	return {
		type: CHANGE_RANGE_POSITION,
		payload: {
			position: position,
		},
	};
}
