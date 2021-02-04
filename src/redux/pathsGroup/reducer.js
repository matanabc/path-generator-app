import { CHANGE_SELECTED_PATHS_GROUP } from './action-types';

function changeSelectedPathsGroup(state, payload) {
	const pathsGroup = { coords: [], waypoints: [], sourceSetpoints: [], isIllegal: () => false };
	state.pathsGroups[payload.pathGroupName].forEach((pathName) => {
		if (!state.paths[pathName]) {
			pathsGroup.isIllegal = () => true;
		}
		const path = new state.driveType.Path(state.paths[pathName].waypoints, state.pathConfig);
		pathsGroup.sourceSetpoints.push(...path.sourceSetpoints);
		pathsGroup.waypoints.push(...path.waypoints);
		pathsGroup.coords.push(...path.coords);
	});

	return { ...state, selected: payload.pathGroupName, path: pathsGroup };
}

export default function path(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeSelectedPathsGroup(state, action.payload);
	return state;
}
