import { APP_REDUCER } from '../../redux/reducer-types';
import { LOAD_COOKIE, SET_FIELD_IMAGE, ADD_PATH, SET_PROJECT_SETTINGS } from './app-action-types';

export function loadCookiesToState(robotConfig, paths) {
    return {
        reducer: APP_REDUCER,
        type: LOAD_COOKIE,
        payload: {
            robotConfig: robotConfig,
            paths: paths,
        },
    };
}

export function setFiledImage(filedImage) {
    return {
        reducer: APP_REDUCER,
        type: SET_FIELD_IMAGE,
        payload: {
            filedImage: filedImage,
        },
    };
}

export function addPath(path) {
    return {
        reducer: APP_REDUCER,
        type: ADD_PATH,
        payload: {
            path: path,
        },
    };
}

export function setProjectSettings(settings) {
    return {
        reducer: APP_REDUCER,
        type: SET_PROJECT_SETTINGS,
        payload: {
            settings: settings,
        },
    };
}
