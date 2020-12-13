import { SET_WAYPOINT } from './path-action-types';

export function setWaypoint(waypoint, index) {
	return {
		type: SET_WAYPOINT,
		payload: {
			waypoint: waypoint,
			index: index,
		},
	};
}
