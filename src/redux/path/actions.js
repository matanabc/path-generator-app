import { saveJsonPath, deleteJsonPath, renameJsonPath } from '../../handlers/project-handler';
import { UPDATE_PATH_REDUCER, LOAD_PATH } from './action-types';

export const setSelectedWaypoint = (index) => ({ type: UPDATE_PATH_REDUCER, payload: { selectedWaypoint: index } });

export async function addWaypoint(waypoint, index, state) {
	const { paths, selected, driveType } = state;
	const { vMax } = state.pathConfig;
	const { waypoints } = paths[selected];
	waypoint = Object.assign(new driveType.Waypoint(), { ...waypoint, v: vMax, vMax: vMax });
	waypoints.splice(index + 1, 0, waypoint);
	if (index === waypoints.length - 1) {
		if (waypoints[index - 1].v === 0) waypoints[index - 1].v = vMax;
		waypoints[index - 1].vMax = vMax;
		waypoints[index].v = 0;
	}
	return actionReturn({ path: getNewPath(waypoints, state) });
}

export async function setWaypoint(waypoint, state) {
	const { paths, selected, selectedWaypoint } = state;
	const { waypoints } = paths[selected];
	waypoints[selectedWaypoint] = getNewWaypoint(state, waypoints[selectedWaypoint], waypoint);
	return actionReturn({ path: getNewPath(waypoints, state), selectedWaypoint: selectedWaypoint });
}

export async function removeWaypoint(state) {
	const { paths, selected, selectedWaypoint } = state;
	const { waypoints } = paths[selected];
	waypoints.splice(selectedWaypoint, 1);
	return actionReturn({ selectedWaypoint: undefined, path: getNewPath(waypoints, state) });
}

export async function changeSelectedPath(pathName, state) {
	const { waypoints } = state.paths[pathName];
	return actionReturn({
		path: getNewPath(waypoints, { ...state, selected: pathName }),
		selectedWaypoint: undefined,
		selected: pathName,
		isPathMode: true,
	});
}

export async function deletePath(state) {
	const { paths, selected, saveCSVTo } = state;
	deleteJsonPath(selected, saveCSVTo);
	delete paths[selected];
	return actionReturn({ listenToMouseClicks: false, selected: undefined, path: undefined });
}

export async function renamePath(paths, oldName, newName) {
	if (oldName !== newName) {
		paths[newName] = paths[oldName];
		delete paths[oldName];
		renameJsonPath(oldName, newName);
	}
	return actionReturn({ selected: newName });
}

export async function addPath(paths, pathConfig, driveType, name) {
	const waypoints = [
		Object.assign(new driveType.Waypoint(), { y: 1, vMax: pathConfig.vMax }),
		Object.assign(new driveType.Waypoint(), { x: 2, y: 1 }),
	];
	paths[name] = { waypoints: waypoints, isInReverse: false };
	return actionReturn({
		path: getNewPath(waypoints, { driveType, pathConfig, paths, selected: name }),
		selectedWaypoint: undefined,
		selected: name,
		paths,
	});
}

export function loadPath(name, waypoints, isInReverse) {
	return { type: LOAD_PATH, payload: { name, waypoints, isInReverse } };
}

export async function setPathConfig(pathConfig, driveType) {
	pathConfig = new driveType.PathConfig(
		pathConfig.vMax || 0,
		pathConfig.acc || 0,
		pathConfig.width || 0,
		pathConfig.length || 0,
		pathConfig.robotLoopTime || 0
	);
	return actionReturn({ driveType, pathConfig });
}

export async function changeDirection(path, paths, selected) {
	path.changeDirection();
	paths[selected].isInReverse = path.isReverse();
	saveJsonPath(selected, paths[selected]);
	return actionReturn({ paths, path });
}

function getNewWaypoint(state, waypoint, object) {
	const { fieldConfig, pathConfig } = state;
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

function getNewPath(waypoints, state) {
	const { driveType, pathConfig, paths, selected } = state;
	const path = new driveType.Path(waypoints, pathConfig);
	if (paths[selected].isInReverse) path.changeDirection();
	saveJsonPath(selected, paths[selected]);
	return path;
}

const actionReturn = (payload) => ({ type: UPDATE_PATH_REDUCER, payload: payload });
