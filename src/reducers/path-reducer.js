import { Tank } from 'path-generator';
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

export default function path(state = initialState, action) {
	return state;
}
