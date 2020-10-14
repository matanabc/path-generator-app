import { TOOLS_REDUCER } from '../../redux/reducer-types'
import { 
    OPEN_SETTINGS, CHANGE_SELECTED_PATH, CHANGE_LISTEN_TO_MOUSE_STATUS, RENAME_PATH,
    SHOW_DELETE_PATH, DELETE_PATH, SHOW_CREATE_NEW_PATH , CREATE_NEW_PATH
} from './tools-action-types';

export function deletePath() {
    return {
        reducer: TOOLS_REDUCER,
        type: DELETE_PATH,
        payload: {},
    };
}

export function createPath(name) {
    return {
        reducer: TOOLS_REDUCER,
        type: CREATE_NEW_PATH,
        payload: {
            name: name,
        },
    };
}

export function changeShowCreateNewPathStatus() {
    return {
        reducer: TOOLS_REDUCER,
        type: SHOW_CREATE_NEW_PATH,
        payload: {},
    };
}

export function changeShowDeletePathStatus() {
    return {
        reducer: TOOLS_REDUCER,
        type: SHOW_DELETE_PATH,
        payload: {},
    };
}

export function renamePath() {
    return {
        reducer: TOOLS_REDUCER,
        type: RENAME_PATH,
        payload: {},
    };
}

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