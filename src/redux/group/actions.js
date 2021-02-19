import { CHANGE_SELECTED_PATHS_GROUP, CHANGE_ORDER, REMOVE_PATH } from './action-types';

export function changeSelectedGroup(groupName) {
	return {
		type: CHANGE_SELECTED_PATHS_GROUP,
		payload: {
			groupName: groupName,
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

export function removePath(pathName) {
	return {
		type: REMOVE_PATH,
		payload: {
			pathName: pathName,
		},
	};
}
