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
			const index = state.groups[state.selected].indexOf(pathName);
			if (index >= 0) state.groups[state.selected].splice(index, 1);
			return;
		}
		const path = new state.driveType.Path(state.paths[pathName].waypoints, state.pathConfig);
		if (path.isIllegal()) {
			illegalPathInGroup(group, state);
			return;
		}
		addPathToGroup(state, group, path, pathName);
	});
	return { ...state, path: group };
}
