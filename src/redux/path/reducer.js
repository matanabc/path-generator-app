import { PopupsConfig } from '../../component/popups/popups-config';
import {
	CHANGE_SELECTED_PATH,
	REMOVE_WAYPOINT,
	ADD_WAYPOINT,
	SET_WAYPOINT,
	DELETE_PATH,
	RENAME_PATH,
	ADD_PATH,
} from './action-types';

function getNewWaypoint(state, waypoint, object) {
	return new state.pathType.Waypoint(
		Number.isNaN(Number(object.x)) ? waypoint.x : Number(object.x),
		Number.isNaN(Number(object.y)) ? waypoint.y : Number(object.y),
		Number.isNaN(Number(object.angle)) ? waypoint.angle : Number(object.angle),
		Number.isNaN(Number(object.v)) ? waypoint.v : Number(object.v),
		Number.isNaN(Number(object.vMax)) ? waypoint.vMax : Number(object.vMax)
	);
}

function setWaypoint(state, payload) {
	const waypoints = [];
	const newState = { ...state };
	state.paths[state.selectedPath].waypoints.forEach((element, index) => {
		if (index !== payload.index) waypoints.push(element);
		else waypoints.push(getNewWaypoint(state, element, payload.waypoint));
	});
	newState.paths[state.selectedPath] = new state.pathType.Path(waypoints, newState.pathConfig);
	return newState;
}

function removeWaypoint(state, payload) {
	const waypoints = [];
	const newState = { ...state };
	state.paths[state.selectedPath].waypoints.forEach((element, index) => {
		if (index !== payload.index) waypoints.push(element);
	});

	newState.paths[state.selectedPath] = new state.pathType.Path(waypoints, newState.pathConfig);
	return newState;
}

function changeSelectedPath(state, payload) {
	const oldPath = state.paths[payload.pathName];
	const newState = { ...state, selectedPath: payload.pathName, listenToMouseClicks: false };
	newState.paths[payload.pathName] = new state.pathType.Path(oldPath.waypoints, state.pathConfig);
	return newState;
}

function deletePath(state, payload) {
	const newState = { ...state, listenToMouseClicks: false };
	delete newState.paths[state.selectedPath];
	newState.selectedPath = undefined;
	return newState;
}

function renamePath(state, payload) {
	const newState = { ...state, selectedPath: payload.name };
	newState.paths[payload.name] = newState.paths[state.selectedPath];
	delete newState.paths[state.selectedPath];
	return newState;
}

function addPath(state, payload) {
	const newState = { ...state, selectedPath: payload.name };
	newState.paths[payload.name] = new state.pathType.Path([], state.pathConfig);
	return newState;
}

function checkIfPathIsIllegal(oldState, state) {
	const path = state.paths[state.selectedPath];
	if (oldState === state || !path || !path.isIllegal()) return state;
	state.popupsStatus = new PopupsConfig();
	state.popupsStatus.pathIsIllegalPopup = true;
	return state;
}

function addWaypoint(state, payload) {
	const waypoints = state.paths[state.selectedPath].waypoints;
	const waypoint = Object.assign(new state.pathType.Waypoint(), payload.waypoint);
	if (waypoints[waypoints.length - 1].vMax === 0) waypoints[waypoints.length - 1].vMax = 0.1;
	waypoints.push(waypoint);

	const newState = { ...state };
	newState.paths[state.selectedPath] = new state.pathType.Path(waypoints, state.pathConfig);
	return newState;
}

export default function path(state, action) {
	const oldState = state;
	if (action.type === ADD_PATH) state = addPath(state, action.payload);
	if (action.type === RENAME_PATH) state = renamePath(state, action.payload);
	if (action.type === DELETE_PATH) state = deletePath(state, action.payload);
	if (action.type === ADD_WAYPOINT) state = addWaypoint(state, action.payload);
	if (action.type === SET_WAYPOINT) state = setWaypoint(state, action.payload);
	if (action.type === REMOVE_WAYPOINT) state = removeWaypoint(state, action.payload);
	if (action.type === CHANGE_SELECTED_PATH) state = changeSelectedPath(state, action.payload);
	return checkIfPathIsIllegal(oldState, state);
}
