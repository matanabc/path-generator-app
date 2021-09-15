import { saveJsonPath, deletePath, renameJsonPath } from '../../handlers/project-handler';
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

function getNewWaypoint(state, waypoint, object, pathConfig, fieldConfig) {
	const newWaypointObject = {
		x: Number.isNaN(object.x) ? waypoint.x : object.x,
		y: Number.isNaN(object.y) ? waypoint.y : object.y,
		v: Number.isNaN(object.v) ? waypoint.v : object.v,
		vMax: Number.isNaN(object.vMax) ? waypoint.vMax : object.vMax,
		angle: Number.isNaN(object.angle) ? waypoint.angle : object.angle,
		robotAngle: Number.isNaN(object.robotAngle) ? waypoint.robotAngle : object.robotAngle,
	};

	if (newWaypointObject.x < 0) newWaypointObject.x = 0;
	if (newWaypointObject.x > fieldConfig.widthInMeter) newWaypointObject.x = fieldConfig.widthInMeter;
	if (newWaypointObject.y < 0) newWaypointObject.y = 0;
	if (newWaypointObject.y > fieldConfig.heightInMeter) newWaypointObject.y = fieldConfig.heightInMeter;
	if (newWaypointObject.v < 0) newWaypointObject.v = 0;
	if (newWaypointObject.v > pathConfig.vMax) newWaypointObject.v = pathConfig.vMax;
	if (newWaypointObject.vMax < 0) newWaypointObject.vMax = 0;
	if (newWaypointObject.vMax > pathConfig.vMax) newWaypointObject.vMax = pathConfig.vMax;

	if (newWaypointObject.robotAngle === undefined) delete newWaypointObject.robotAngle;
	return Object.assign(new state.driveType.Waypoint(), newWaypointObject);
}

function setWaypoint(state, payload) {
	const newState = { ...state };
	const waypoints = state.paths[state.selected].waypoints.map((element, index) => {
		if (index !== payload.index) return element;
		else return getNewWaypoint(state, element, payload.waypoint, state.pathConfig, state.fieldConfig);
	});
	state.paths[state.selected].waypoints = waypoints;
	newState.path = new state.driveType.Path(waypoints, state.pathConfig);
	if (state.paths[state.selected].isInReverse) newState.path.changeDirection();
	saveJsonPath(newState.selected, newState.paths[state.selected]);
	return newState;
}

function removeWaypoint(state, payload) {
	const waypoints = [];
	const newState = { ...state, selectedWaypoint: undefined };
	state.paths[state.selected].waypoints.forEach((element, index) => {
		if (index !== payload.index) waypoints.push(element);
	});
	state.paths[state.selected].waypoints = waypoints;
	newState.path = new state.driveType.Path(waypoints, state.pathConfig);
	if (state.paths[state.selected].isInReverse) newState.path.changeDirection();
	saveJsonPath(newState.selected, newState.paths[state.selected]);
	return newState;
}

function changeSelectedPath(state, payload) {
	const newState = { ...state, selected: payload.pathName, isPathMode: true, selectedWaypoint: undefined };
	newState.path = new state.driveType.Path(newState.paths[payload.pathName].waypoints, state.pathConfig);
	if (newState.paths[payload.pathName].isInReverse) newState.path.changeDirection();
	return newState;
}

function removePath(state, payload) {
	const newState = { ...state, listenToMouseClicks: false, selected: undefined, path: undefined };
	delete newState.paths[state.selected];
	deletePath(state.selected, state.saveCSVTo);
	return newState;
}

function renamePath(state, payload) {
	const newState = { ...state, selected: payload.name };
	if (payload.name !== state.selected) {
		newState.paths[payload.name] = newState.paths[state.selected];
		delete newState.paths[state.selected];
		renameJsonPath(state.selected, payload.name);
	}
	return newState;
}

function addPath(state, payload) {
	const newState = { ...state, selectedWaypoint: undefined };
	const waypoints = [];
	if (payload.waypoints)
		payload.waypoints.forEach((waypoint) => {
			waypoints.push(Object.assign(new state.driveType.Waypoint(), waypoint));
		});
	else
		waypoints.push(
			Object.assign(new state.driveType.Waypoint(), { y: 1, vMax: state.pathConfig.vMax }),
			Object.assign(new state.driveType.Waypoint(), { x: 2, y: 1 })
		);
	newState.paths[payload.name] = {
		waypoints: waypoints,
		isInReverse: payload.isInReverse ? payload.isInReverse : false,
	};
	if (!payload.waypoints) {
		saveJsonPath(payload.name, newState.paths[payload.name]);
		newState.path = new state.driveType.Path(waypoints, state.pathConfig);
		newState.selected = payload.name;
	}
	return newState;
}

function addWaypoint(state, payload) {
	const newState = { ...state };
	const waypoints = [];
	const newWaypoint = Object.assign(new state.driveType.Waypoint(), { ...payload.waypoint });
	state.paths[state.selected].waypoints.forEach((waypoint, index) => {
		waypoints.push(waypoint);
		if (index === payload.index) {
			newWaypoint.vMax = state.pathConfig.vMax;
			if (index !== state.paths[state.selected].waypoints.length - 1) {
				newWaypoint.v = waypoints[index].vMax;
			} else newWaypoint.vMax = 0;
			if (waypoints.length > 1) waypoints[waypoints.length - 1].v = waypoints[waypoints.length - 2].vMax;
			if (waypoints[waypoints.length - 1].vMax === 0)
				waypoints[waypoints.length - 1].vMax = state.pathConfig.vMax;
			waypoints.push(newWaypoint);
		}
	});
	state.paths[state.selected].waypoints = waypoints;
	newState.path = new state.driveType.Path(waypoints, state.pathConfig);
	if (state.paths[state.selected].isInReverse) newState.path.changeDirection();
	saveJsonPath(newState.selected, newState.paths[state.selected]);
	return newState;
}

function setPathConfig(state, payload) {
	const pathConfig = new state.driveType.PathConfig(
		payload.pathConfig.vMax || 0,
		payload.pathConfig.acc || 0,
		payload.pathConfig.width || 0,
		payload.pathConfig.length || 0,
		payload.pathConfig.robotLoopTime || 0
	);
	const newState = { ...state, pathConfig: pathConfig };
	if (payload.driveType) newState.driveType = payload.driveType;
	return newState;
}

function changeDirection(state, payload) {
	const newState = { ...state };
	newState.path.changeDirection();
	state.paths[state.selected].isInReverse = !state.paths[state.selected].isInReverse;
	saveJsonPath(newState.selected, newState.paths[state.selected]);
	return newState;
}

function setSelectedWaypoint(state, payload) {
	return { ...state, selectedWaypoint: payload.index };
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
	if (action.type === SET_SELECTED_WAYPOINT) return setSelectedWaypoint(state, action.payload);
	return state;
}
