import { Tank } from 'path-generator';
import { REMOVE_WAYPOINT, SET_WAYPOINT } from './path-action-types';

const { Path, PathConfig, Waypoint } = Tank;

const waypoints = [
	new Waypoint(0, 0, 0, 0, 2),
	new Waypoint(1.5, 1.5, 90, 2, 2),
	new Waypoint(3, 3, 0, 0, 0),
];
const pathConfig = new PathConfig(0.8, 3.5, 3);

const initialState = {
	pathConfig: new PathConfig(0.8, 3.5, 3),
	selectedPath: 'test',
	pathType: Tank,
	paths: {
		test: new Path(waypoints, pathConfig),
	},
};

function getNewWaypoint(waypoint, object) {
	return new Tank.Waypoint(
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
		else waypoints.push(getNewWaypoint(element, payload.waypoint));
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

export default function path(state = initialState, action) {
	if (action.type === SET_WAYPOINT) return setWaypoint(state, action.payload);
	if (action.type === REMOVE_WAYPOINT) return removeWaypoint(state, action.payload);
	return state;
}
