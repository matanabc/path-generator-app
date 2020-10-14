import { RENAME_PATH_REDUCER } from '../../redux/reducer-types';
import { CLOSE, SAVE_PATH_NAME } from './rename-path-action-types'

export function close() {
    return {
        reducer: RENAME_PATH_REDUCER,
        type: CLOSE,
        payload: {},
    };
}

export function savePathName(name) {
    return {
        reducer: RENAME_PATH_REDUCER,
        type: SAVE_PATH_NAME,
        payload: {
            name: name
        },
    };
}
