import { CHANGE_SELECTED_PATHS_GROUP, DELETE_GROUP, RENAME_GROUP, ADD_GROUP, UPDATE_GROUP } from './action-types';
import { saveJsonGroup, deleteGroup, renameJsonGroup } from '../../handlers/project-handler';
import { getGroup } from './util';

function changeSelectedGroup(state, payload) {
	return getGroup({ ...state, selected: payload.groupName });
}

function updateGroup(state, payload) {
	const newState = { ...state };
	newState.groups[newState.selected] = payload.group;
	saveJsonGroup(newState.selected, newState.groups[newState.selected]);
	return getGroup(newState);
}

function removeGroup(state, payload) {
	const newState = { ...state, selected: undefined, path: undefined };
	delete newState.groups[state.selected];
	deleteGroup(state.selected);
	return newState;
}

function renameGroup(state, payload) {
	const newState = { ...state, selected: payload.name };
	if (payload.name !== state.selected) {
		renameJsonGroup(state.selected, payload.name);
		newState.groups[payload.name] = newState.groups[state.selected];
		delete newState.groups[state.selected];
	}
	return newState;
}

function addGroup(state, payload) {
	const newState = { ...state };
	const paths = payload.paths ? payload.paths : [];
	newState.groups[payload.name] = paths;
	if (!payload.paths) {
		newState.path = undefined;
		newState.selected = payload.name;
		saveJsonGroup(newState.selected, newState.groups[state.selected]);
	}
	return newState;
}

export default function group(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeSelectedGroup(state, action.payload);
	if (action.type === UPDATE_GROUP) return updateGroup(state, action.payload);
	if (action.type === RENAME_GROUP) return renameGroup(state, action.payload);
	if (action.type === DELETE_GROUP) return removeGroup(state, action.payload);
	if (action.type === ADD_GROUP) return addGroup(state, action.payload);
	return state;
}
