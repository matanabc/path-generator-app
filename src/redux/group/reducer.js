import { getGroup, reorder } from './util';
import {
	CHANGE_SELECTED_PATHS_GROUP,
	CHANGE_ORDER,
	REMOVE_PATH,
	DELETE_GROUP,
	RENAME_GROUP,
	ADD_GROUP,
	ADD_PATH,
} from './action-types';

function changeSelectedGroup(state, payload) {
	const newState = { ...state, selected: payload.groupName };
	newState.path = getGroup(newState);
	return newState;
}

function changeOrder(state, payload) {
	const newState = { ...state };
	newState.groups[state.selected] = reorder(state.groups[state.selected], payload.source, payload.destination);
	newState.path = getGroup(newState);
	return newState;
}

function removePath(state, payload) {
	const newState = { ...state };
	newState.groups[state.selected] = state.groups[state.selected].filter((pathName) => pathName !== payload.pathName);
	newState.path = getGroup(newState);
	return newState;
}

function deleteGroup(state, payload) {
	const newState = { ...state, selected: undefined, path: undefined };
	delete newState.groups[state.selected];
	return newState;
}

function renameGroup(state, payload) {
	const newState = { ...state, selected: payload.name };
	if (payload.name !== state.selected) {
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
	}
	return newState;
}

function addPath(state, payload) {
	const newState = { ...state };
	newState.groups[state.selected].push(payload.name);
	newState.path = getGroup(newState);
	return newState;
}

export default function group(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeSelectedGroup(state, action.payload);
	if (action.type === CHANGE_ORDER) return changeOrder(state, action.payload);
	if (action.type === RENAME_GROUP) return renameGroup(state, action.payload);
	if (action.type === DELETE_GROUP) return deleteGroup(state, action.payload);
	if (action.type === REMOVE_PATH) return removePath(state, action.payload);
	if (action.type === ADD_GROUP) return addGroup(state, action.payload);
	if (action.type === ADD_PATH) return addPath(state, action.payload);
	return state;
}
