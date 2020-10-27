import { POPUPS_REDUCER } from '../../redux/reducer-types'
import {
    CHANGE_POPUP_STATUS, CHANGE_PATH_NAME, DELETE_PATH, CREATE_NEW_PATH
} from './popups-action-types';

export function changePopupStatus(popupName) {
    return {
        reducer: POPUPS_REDUCER,
        type: CHANGE_POPUP_STATUS,
        payload: {
            popupName: popupName,
        },
    };
}

export function changePathName(pathName) {
    return {
        reducer: POPUPS_REDUCER,
        type: CHANGE_PATH_NAME,
        payload: {
            name: pathName,
        },
    };
}

export function deletePath() {
    return {
        reducer: POPUPS_REDUCER,
        type: DELETE_PATH,
        payload: {},
    };
}

export function createNewPath(pathName) {
    return {
        reducer: POPUPS_REDUCER,
        type: CREATE_NEW_PATH,
        payload: {
            name: pathName,
        },
    };
}