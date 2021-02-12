import { CHANGE_SELECTED_PATHS_GROUP, CHANGE_ORDER } from './action-types';

export function changeSelectedGroup(pathGroupName) {
	return {
		type: CHANGE_SELECTED_PATHS_GROUP,
		payload: {
			pathGroupName: pathGroupName,
		},
	};
}

export function changeOrder(source, destination) {
	return {
		type: CHANGE_ORDER,
		payload: {
			source: source,
			destination: destination,
		},
	};
}
