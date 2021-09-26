import { CHANGE_SELECTED_PATHS_GROUP, DELETE_GROUP, RENAME_GROUP, ADD_GROUP, UPDATE_GROUP } from './action-types';

export function changeSelectedGroup(groupName) {
	return {
		type: CHANGE_SELECTED_PATHS_GROUP,
		payload: { groupName: groupName },
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
		payload: { name: name },
	};
}

export function addGroup(name, paths) {
	return {
		type: ADD_GROUP,
		payload: { name: name, paths: paths },
	};
}

export function updateGroup(group) {
	return {
		type: UPDATE_GROUP,
		payload: { group: group },
	};
}
