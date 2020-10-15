import { APP_REDUCER } from '../../redux/reducer-types';
import { SET_PROJECT_FOLDER_PATH, SET_FIELD_IMAGE, ADD_PATH, SET_PROJECT_SETTINGS } from './app-action-types';

export function setProjectFolderPath(projectPath) {
    return {
        reducer: APP_REDUCER,
        type: SET_PROJECT_FOLDER_PATH,
        payload: {
            projectPath: projectPath
        },
    };
}

export function setFiledImage(filedImage, imageName) {
    return {
        reducer: APP_REDUCER,
        type: SET_FIELD_IMAGE,
        payload: {
            filedImage: filedImage,
            imageName: imageName,
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
