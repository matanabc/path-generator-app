import { saveJsonPath, deletePath, renameJsonPath } from '../../handlers/project-handler';
import {
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

function getNewWaypoint(state, waypoint, object) {
	const newWaypointObject = {
		x: Number.isNaN(object.x) ? waypoint.x : object.x,
		y: Number.isNaN(object.y) ? waypoint.y : object.y,
		v: Number.isNaN(object.v) ? waypoint.v : object.v,
		vMax: Number.isNaN(object.vMax) ? waypoint.vMax : object.vMax,
		angle: Number.isNaN(object.angle) ? waypoint.angle : object.angle,
		robotAngle: Number.isNaN(object.robotAngle) ? waypoint.robotAngle : object.robotAngle,
	};
	if (newWaypointObject.robotAngle === undefined) delete newWaypointObject.robotAngle;
	return Object.assign(new state.driveType.Waypoint(), newWaypointObject);
}

function setWaypoint(state, payload) {
	const waypoints = [];
	const newState = { ...state };
	state.paths[state.selectedPath].waypoints.forEach((element, index) => {
		if (index !== payload.index) waypoints.push(element);
		else waypoints.push(getNewWaypoint(state, element, payload.waypoint));
		if (waypoints[index].vMax > state.pathConfig.vMax)
			waypoints[index].vMax = state.pathConfig.vMax;
	});
	newState.paths[state.selectedPath] = new state.driveType.Path(waypoints, newState.pathConfig);
	if (state.paths[state.selectedPath].isReverse())
		newState.paths[state.selectedPath].changeDirection();
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
	if (state.paths[state.selectedPath].isReverse())
		newState.paths[state.selectedPath].changeDirection();
	saveJsonPath(state.selectedPath, newState.paths[state.selectedPath]);
	return newState;
}

function changeSelectedPath(state, payload) {
	const oldPath = state.paths[payload.pathName];
	const newState = { ...state, selectedPath: payload.pathName };
	newState.paths[payload.pathName] = new state.driveType.Path(oldPath.waypoints, state.pathConfig);
	if (oldPath.isReverse()) newState.paths[payload.pathName].changeDirection();
	return newState;
}

function removePath(state, payload) {
	const newState = { ...state, listenToMouseClicks: false };
	delete newState.paths[state.selectedPath];
	newState.selectedPath = undefined;
	deletePath(state.selectedPath, state.saveCSVTo);
	return newState;
}

function renamePath(state, payload) {
	const newState = { ...state, selectedPath: payload.name };
	newState.paths[payload.name] = newState.paths[state.selectedPath];
	delete newState.paths[state.selectedPath];
	renameJsonPath(state.selectedPath, payload.name);
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
	if (payload.isInReverse) newState.paths[payload.name].changeDirection();
	newState.selectedPath = payload.waypoints ? undefined : payload.name;
	if (!payload.waypoints) saveJsonPath(payload.name, newState.paths[payload.name]);
	return newState;
}

function addWaypoint(state, payload) {
	const waypoints = [];
	const object = { ...payload.waypoint };
	const newWaypoint = Object.assign(new state.driveType.Waypoint(), object);
	state.paths[state.selectedPath].waypoints.forEach((waypoint, index) => {
		waypoints.push(waypoint);
		if (index === state.addWaypointInIndex) waypoints.push(newWaypoint);
	});
	if (state.addWaypointInIndex === undefined) waypoints.push(newWaypoint);
	const newState = { ...state, addWaypointInIndex: undefined };
	newState.paths[state.selectedPath] = new state.driveType.Path(waypoints, state.pathConfig);
	if (state.paths[state.selectedPath].isReverse())
		newState.paths[state.selectedPath].changeDirection();
	saveJsonPath(state.selectedPath, newState.paths[state.selectedPath]);
	return newState;
}

function setPathConfig(state, payload) {
	const pathConfig = Object.assign(new state.driveType.PathConfig(), payload.pathConfig);
	const newState = { ...state, pathConfig: pathConfig };
	if (payload.driveType) newState.driveType = payload.driveType;
	return newState;
}

function changeDirection(state, payload) {
	const newState = { ...state };
	newState.paths[state.selectedPath].changeDirection();
	saveJsonPath(state.selectedPath, newState.paths[state.selectedPath]);
	return newState;
}

export default function path(state, action) {
	if (action.type === ADD_PATH) return addPath(state, action.payload);
	if (action.type === RENAME_PATH) return renamePath(state, action.payload);
	if (action.type === DELETE_PATH) return removePath(state, action.payload);
	if (action.type === ADD_WAYPOINT) return addWaypoint(state, action.payload);
	if (action.type === SET_WAYPOINT) return setWaypoint(state, action.payload);
	if (action.type === SET_PATH_CONFIG) return setPathConfig(state, action.payload);
	if (action.type === REMOVE_WAYPOINT) return removeWaypoint(state, action.payload);
	if (action.type === CHANGE_DIRECTION) return changeDirection(state, action.payload);
	if (action.type === CHANGE_SELECTED_PATH) return changeSelectedPath(state, action.payload);
	return state;
}
