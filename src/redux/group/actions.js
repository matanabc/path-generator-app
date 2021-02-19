import {
	CHANGE_SELECTED_PATHS_GROUP,
	CHANGE_ORDER,
	REMOVE_PATH,
	DELETE_GROUP,
	RENAME_GROUP,
	ADD_GROUP,
} from './action-types';

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

export function deleteGroup() {
	return {
		type: DELETE_GROUP,
		payload: {},
	};
}

export function renameGroup(name) {
	return {
		type: RENAME_GROUP,
		payload: {
			name: name,
		},
	};
}

export function addGroup(name, paths) {
	return {
		type: ADD_GROUP,
		payload: {
			name: name,
			paths: paths,
		},
	};
}
