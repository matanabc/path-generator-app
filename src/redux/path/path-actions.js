import { SET_WAYPOINT, REMOVE_WAYPOINT } from './path-action-types';

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
