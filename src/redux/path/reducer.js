import { saveJsonPath, deleteJsonPath } from '../../handlers/project-handler';
import { PopupsConfig } from '../../component/popups/popups-config';
import {
	CHANGE_SELECTED_PATH,
	REMOVE_WAYPOINT,
	SET_PATH_CONFIG,
	ADD_WAYPOINT,
	SET_WAYPOINT,
	DELETE_PATH,
	RENAME_PATH,
	ADD_PATH,
} from './action-types';

function getNewWaypoint(state, waypoint, object) {
	return new state.driveType.Waypoint(
		Number.isNaN(object.x) ? waypoint.x : object.x,
		Number.isNaN(object.y) ? waypoint.y : object.y,
		Number.isNaN(object.angle) ? waypoint.angle : object.angle,
		Number.isNaN(object.v) ? waypoint.v : object.v,
		Number.isNaN(object.vMax) ? waypoint.vMax : object.vMax
	);
}

function setWaypoint(state, payload) {
	const waypoints = [];
	const newState = { ...state };
	state.paths[state.selectedPath].waypoints.forEach((element, index) => {
		if (index !== payload.index) waypoints.push(element);
		else waypoints.push(getNewWaypoint(state, element, payload.waypoint));
	});
	newState.paths[state.selectedPath] = new state.driveType.Path(waypoints, newState.pathConfig);
	saveJsonPath(state.selectedPath, newState.paths[state.selectedPath]);
	return newState;
}

function removeWaypoint(state, payload) {
	const waypoints = [];
	const newState = { ...state };
	state.paths[state.selectedPath].waypoints.forEach((element, index) => {
		if (index !== payload.index) waypoints.push(element);
	});
	newState.paths[state.selectedPath] = new state.driveType.Path(waypoints, newState.pathConfig);
	saveJsonPath(state.selectedPath, newState.paths[state.selectedPath]);
	return newState;
}

function changeSelectedPath(state, payload) {
	const oldPath = state.paths[payload.pathName];
	const newState = { ...state, selectedPath: payload.pathName };
	newState.paths[payload.pathName] = new state.driveType.Path(oldPath.waypoints, state.pathConfig);
	return newState;
}

function deletePath(state, payload) {
	const newState = { ...state, listenToMouseClicks: false };
	delete newState.paths[state.selectedPath];
	newState.selectedPath = undefined;
	deleteJsonPath(state.selectedPath);
	return newState;
}

function renamePath(state, payload) {
	const newState = { ...state, selectedPath: payload.name };
	newState.paths[payload.name] = newState.paths[state.selectedPath];
	delete newState.paths[state.selectedPath];
	return newState;
}

function addPath(state, payload) {
	const newState = { ...state };
	const waypoints = [];
	if (payload.waypoints)
		payload.waypoints.forEach((waypoint) => {
			waypoints.push(Object.assign(new state.driveType.Waypoint(), waypoint));
		});
	newState.paths[payload.name] = new state.driveType.Path(waypoints, state.pathConfig);
	newState.selectedPath = payload.waypoints ? undefined : payload.name;
	if (!payload.waypoints) saveJsonPath(payload.name, newState.paths[payload.name]);
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
	const waypoints = [];
	const object = { ...payload.waypoint, vMax: 0.1 };
	const newWaypoint = Object.assign(new state.driveType.Waypoint(), object);
	state.paths[state.selectedPath].waypoints.forEach((waypoint, index) => {
		if (waypoints.vMax === 0) waypoints.vMax = 0.1;
		waypoints.push(waypoint);
		if (index === state.addWaypointInIndex) waypoints.push(newWaypoint);
	});
	if (state.addWaypointInIndex === undefined) waypoints.push(newWaypoint);
	const newState = { ...state, addWaypointInIndex: undefined };
	newState.paths[state.selectedPath] = new state.driveType.Path(waypoints, state.pathConfig);
	saveJsonPath(state.selectedPath, newState.paths[state.selectedPath]);
	return newState;
}

function setPathConfig(state, payload) {
	const pathConfig = new state.driveType.PathConfig(
		payload.pathConfig.width,
		payload.pathConfig.vMax,
		payload.pathConfig.acc,
		payload.pathConfig.robotLoopTime
	);
	return { ...state, pathConfig: pathConfig };
}

export default function path(state, action) {
	const oldState = state;
	if (action.type === ADD_PATH) state = addPath(state, action.payload);
	if (action.type === RENAME_PATH) state = renamePath(state, action.payload);
	if (action.type === DELETE_PATH) state = deletePath(state, action.payload);
	if (action.type === ADD_WAYPOINT) state = addWaypoint(state, action.payload);
	if (action.type === SET_WAYPOINT) state = setWaypoint(state, action.payload);
	if (action.type === SET_PATH_CONFIG) state = setPathConfig(state, action.payload);
	if (action.type === REMOVE_WAYPOINT) state = removeWaypoint(state, action.payload);
	if (action.type === CHANGE_SELECTED_PATH) state = changeSelectedPath(state, action.payload);
	return checkIfPathIsIllegal(oldState, state);
}
