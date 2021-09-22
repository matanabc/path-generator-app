import {
	SET_SELECTED_WAYPOINT,
	CHANGE_SELECTED_PATH,
	CHANGE_DIRECTION,
	REMOVE_WAYPOINT,
	SET_PATH_CONFIG,
	ADD_WAYPOINT,
	SET_WAYPOINT,
	DELETE_PATH,
	RENAME_PATH,
	ADD_PATH,
} from './action-types';

export function setSelectedWaypoint(index) {
	return {
		type: SET_SELECTED_WAYPOINT,
		payload: {
			index: index,
		},
	};
}

export function addWaypoint(waypoint, index) {
	return {
		type: ADD_WAYPOINT,
		payload: {
			waypoint: waypoint,
			index: index + 1,
		},
	};
}

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

export function deletePath() {
	return {
		type: DELETE_PATH,
		payload: {},
	};
}

export function renamePath(name) {
	return {
		type: RENAME_PATH,
		payload: {
			name: name,
		},
	};
}

export function addPath(name, waypoints, isInReverse) {
	return {
		type: ADD_PATH,
		payload: {
			name: name,
			waypoints: waypoints,
			isInReverse: isInReverse,
		},
	};
}

export function setPathConfig(pathConfig, driveType) {
	return {
		type: SET_PATH_CONFIG,
		payload: {
			pathConfig: pathConfig,
			driveType: driveType,
		},
	};
}

export function changeDirection() {
	return {
		type: CHANGE_DIRECTION,
		payload: {},
	};
}
