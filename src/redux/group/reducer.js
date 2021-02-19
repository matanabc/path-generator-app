import { CHANGE_SELECTED_PATHS_GROUP, CHANGE_ORDER, REMOVE_PATH } from './action-types';
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

export default function group(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeSelectedGroup(state, action.payload);
	if (action.type === CHANGE_ORDER) return changeOrder(state, action.payload);
	if (action.type === REMOVE_PATH) return removePath(state, action.payload);
	return state;
}
