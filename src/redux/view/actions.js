import {
	CHANGE_LISTEN_TO_MOUSE_STATUS,
	SET_DRAW_ROBOT_INTERVAL,
	CHANGE_RANGE_POSITION,
	CHANGE_MODE,
} from './action-types';

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

export function changeListenToMouseStatus(index) {
	return {
		type: CHANGE_LISTEN_TO_MOUSE_STATUS,
		payload: {
			index: index,
		},
	};
}

export function changeMode() {
	return {
		type: CHANGE_MODE,
		payload: {},
	};
}
