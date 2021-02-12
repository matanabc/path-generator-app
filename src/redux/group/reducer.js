import { PopupsConfig } from '../../component/popups/popups-config';
import { CHANGE_SELECTED_PATHS_GROUP, CHANGE_ORDER } from './action-types';

function changeSelectedGroup(state, payload) {
	const group = { coords: [], waypoints: [], sourceSetpoints: [], isIllegal: () => false };
	const newState = { ...state, selected: payload.pathGroupName, popupsStatus: new PopupsConfig() };
	state.groups[payload.pathGroupName].forEach((pathName) => {
		if (!state.paths[pathName]) {
			group.isIllegal = () => true;
			group.error = {
				info: 'Missing Path!',
				problem: `Can't find ${pathName} path!`,
				solution: `Create ${pathName} path or remove ${pathName} path from this paths group!`,
			};
			newState.popupsStatus.pathIsIllegalPopup = true;
			return;
		}
		const path = new state.driveType.Path(state.paths[pathName].waypoints, state.pathConfig);
		group.sourceSetpoints.push(...path.sourceSetpoints);
		group.waypoints.push(...path.waypoints);
		group.coords.push(...path.coords);
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
