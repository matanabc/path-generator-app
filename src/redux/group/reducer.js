import { PopupsConfig } from '../../component/popups/popups-config';
import { CHANGE_SELECTED_PATHS_GROUP } from './action-types';

function changeSelectedgroup(state, payload) {
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

export default function group(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeSelectedgroup(state, action.payload);
	return state;
}
