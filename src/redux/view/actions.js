import { CHANGE_RANGE_POSITION, SET_DRAW_ROBOT_INTERVAL } from './action-types';

export function changeRangePosition(position) {
	return {
		type: CHANGE_RANGE_POSITION,
		payload: {
			position: position,
		},
	};
}

export function setDrawRobotInterval(interval) {
	return {
		type: SET_DRAW_ROBOT_INTERVAL,
		payload: {
			interval: interval,
		},
	};
}
