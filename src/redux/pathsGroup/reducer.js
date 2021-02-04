import { PopupsConfig } from '../../component/popups/popups-config';
import { CHANGE_SELECTED_PATHS_GROUP } from './action-types';

function changeSelectedPathsGroup(state, payload) {
	const pathsGroup = { coords: [], waypoints: [], sourceSetpoints: [], isIllegal: () => false };
	const newState = { ...state, selected: payload.pathGroupName, popupsStatus: new PopupsConfig() };
	state.pathsGroups[payload.pathGroupName].forEach((pathName) => {
		if (!state.paths[pathName]) {
			pathsGroup.isIllegal = () => true;
			pathsGroup.error = {
				info: 'Missing Path!',
				problem: `Can't find ${pathName} path!`,
				solution: `Create ${pathName} path or remove ${pathName} path from this paths group!`,
			};
			newState.popupsStatus.pathIsIllegalPopup = true;
			return;
		}
		const path = new state.driveType.Path(state.paths[pathName].waypoints, state.pathConfig);
		pathsGroup.sourceSetpoints.push(...path.sourceSetpoints);
		pathsGroup.waypoints.push(...path.waypoints);
		pathsGroup.coords.push(...path.coords);
	});

	newState.path = pathsGroup;
	return newState;
}

export default function path(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeSelectedPathsGroup(state, action.payload);
	return state;
}
