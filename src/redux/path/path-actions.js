import { SET_WAYPOINT, REMOVE_WAYPOINT, CHANGE_SELECTED_PATH } from './path-action-types';

export function setWaypoint(waypoint, index) {
	return {
		type: SET_WAYPOINT,
		payload: {
			waypoint: waypoint,
			index: index,
		},
	};
}

export function removeWaypoint(index) {
	return {
		type: REMOVE_WAYPOINT,
		payload: {
			index: index,
		},
	};
}

export function changeSelectedPath(pathName) {
	return {
		type: CHANGE_SELECTED_PATH,
		payload: {
			pathName: pathName,
		},
	};
}
