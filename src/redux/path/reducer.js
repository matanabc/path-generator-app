import { UPDATE_PATH_REDUCER, LOAD_PATH } from './action-types';

const updatePathReducer = (state, payload) => ({ ...state, ...payload });

function loadPath(state, payload) {
	const { driveType, paths } = state;
	let { waypoints, name, isInReverse } = payload;
	waypoints = waypoints.map((waypoint) => Object.assign(new driveType.Waypoint(), waypoint));
	paths[name] = { waypoints: waypoints, isInReverse: isInReverse };
	return updatePathReducer(state, { waypoints: waypoints, paths: paths });
}

export default function path(state, action) {
	if (action.type === LOAD_PATH) return loadPath(state, action.payload);
	if (action.type === UPDATE_PATH_REDUCER) return updatePathReducer(state, action.payload);
	return state;
}
