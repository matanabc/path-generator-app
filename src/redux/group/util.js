import { Util } from 'path-generator';

function illegalGroup(group, state) {
	group.coords = [];
	group.waypoints = [];
	group.sourceSetpoints = [];
	group.isIllegal = () => true;
	state.popupsStatus.pathIsIllegalPopup = true;
}

function illegalPathInGroup(group, state) {
	illegalGroup(group, state);
	group.error = {
		info: 'Illegal Path In Group!',
		problem: `There is illegal path!`,
		solution: `Fix the illegal path!`,
	};
}

function pathMissingInGroup(group, state) {
	illegalGroup(group, state);
	group.error = {
		info: 'Missing Path In Group!',
		problem: `Can't find all paths in group!`,
		solution: `Check that all the paths in the group exists!`,
	};
}

function addPathToGroup(state, group, path, pathName) {
	group.sourceSetpoints.push(...path.sourceSetpoints);
	group.waypoints.push(...path.waypoints);

	const coords = path.coords;
	if (state.paths[pathName].isInReverse)
		path.coords.forEach((coord) => {
			coord.angle += Util.d2r(180);
		});
	group.coords.push(...coords);
}

export function getGroup(state) {
	const group = { coords: [], waypoints: [], sourceSetpoints: [], isIllegal: () => false, isReverse: () => false };
	state.groups[state.selected].forEach((pathName) => {
		if (!state.paths[pathName]) {
			pathMissingInGroup(group, state);
			return;
		}

		const path = new state.driveType.Path(state.paths[pathName].waypoints, state.pathConfig);
		if (path.isIllegal()) {
			illegalPathInGroup(group, state);
			return;
		}

		addPathToGroup(state, group, path, pathName);
	});
	return group;
}

export function reorder(list, startIndex, endIndex) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
}
