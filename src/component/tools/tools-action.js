import { TOOLS_REDUCER } from '../../redux/reducer-types'
import { OPEN_SETTINGS, CHANGE_SELECTED_PATH, CHANGE_LISTEN_TO_MOUSE_STATUS } from './tools-action-types';

export function openSettings() {
    return {
        reducer: TOOLS_REDUCER,
        type: OPEN_SETTINGS,
        payload: {},
    };
}

export function changeSelectedPath(id) {
    return {
        reducer: TOOLS_REDUCER,
        type: CHANGE_SELECTED_PATH,
        payload: {
            id: id,
        },
    };
}

export function changeListenToMouseStatus() {
    return {
        reducer: TOOLS_REDUCER,
        type: CHANGE_LISTEN_TO_MOUSE_STATUS,
        payload: {},
    };
}