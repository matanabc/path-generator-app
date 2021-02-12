import { CHANGE_SELECTED_PATHS_GROUP } from './action-types';

export function changeSelectedGroup(pathGroupName) {
	return {
		type: CHANGE_SELECTED_PATHS_GROUP,
		payload: {
			pathGroupName: pathGroupName,
		},
	};
}
