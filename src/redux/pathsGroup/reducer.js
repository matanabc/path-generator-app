import { CHANGE_SELECTED_PATHS_GROUP } from './action-types';

function changeselectedsGroup(state, payload) {
	return { ...state, selected: payload.pathGroupName };
}

export default function path(state, action) {
	if (action.type === CHANGE_SELECTED_PATHS_GROUP) return changeselectedsGroup(state, action.payload);
	return state;
}
