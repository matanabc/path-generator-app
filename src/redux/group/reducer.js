import { Util } from 'path-generator';
import { PopupsConfig } from '../../component/popups/popups-config';
import { CHANGE_SELECTED_PATHS_GROUP, CHANGE_ORDER } from './action-types';

function illegalGroup(group, state) {
	group.coords = [];
	group.waypoints = [];
	group.sourceSetpoints = [];
	group.isIllegal = () => true;
	state.popupsStatus.pathIsIllegalPopup = true;
}

function pathMissingInGroup(group, state) {
	illegalGroup(group, state);
	group.error = {
		info: 'Missing Path In Group!',
		problem: `Can't find all paths in group!`,
		solution: `Check that all the paths in the group are exists!`,
	};
}

function illegalPathInGroup(group, state) {
	illegalGroup(group, state);
	group.error = {
		info: 'Illegal Path In Group!',
		problem: `There is illegal path!`,
		solution: `Fix the illegal path!`,
	};
}

function changeSelectedGroup(state, payload) {
	const group = { coords: [], waypoints: [], sourceSetpoints: [], isIllegal: () => false, isReverse: () => false };
	const newState = { ...state, selected: payload.pathGroupName, popupsStatus: new PopupsConfig() };
	state.groups[payload.pathGroupName].forEach((pathName) => {
		if (!state.paths[pathName]) {
			pathMissingInGroup(group, newState);
			return;
		}

		const path = new state.driveType.Path(state.paths[pathName].waypoints, state.pathConfig);
		if (path.isIllegal()) {
			illegalPathInGroup(group, newState);
			return;
		}

		group.sourceSetpoints.push(...path.sourceSetpoints);
		group.waypoints.push(...path.waypoints);

		const coords = path.coords;
		if (state.paths[pathName].isInReverse)
			path.coords.forEach((coord) => {
				coord.angle += Util.d2r(180);
			});
		group.coords.push(...coords);
	});

	newState.path = group;
	return newState;
}

function reorder(list, startIndex, endIndex) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
}

function changeOrder(state, payload) {
	const newState = { ...state };
	newState.groups[state.selected] = reorder(state.groups[state.selected], payload.source, payload.destination);
	return state;
}

export default function group(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeSelectedGroup(state, action.payload);
	if (action.type === CHANGE_ORDER) return changeOrder(state, action.payload);
	return state;
}
