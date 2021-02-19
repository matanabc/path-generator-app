import { CHANGE_SELECTED_PATHS_GROUP, CHANGE_ORDER, REMOVE_PATH, DELETE_GROUP } from './action-types';
import { PopupsConfig } from '../../component/popups/popups-config';
import { getGroup, reorder } from './util';

function changeSelectedGroup(state, payload) {
	const newState = { ...state, selected: payload.groupName, popupsStatus: new PopupsConfig() };
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

export default function group(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeSelectedGroup(state, action.payload);
	if (action.type === CHANGE_ORDER) return changeOrder(state, action.payload);
	if (action.type === DELETE_GROUP) return deleteGroup(state, action.payload);
	if (action.type === REMOVE_PATH) return removePath(state, action.payload);
	return state;
}
