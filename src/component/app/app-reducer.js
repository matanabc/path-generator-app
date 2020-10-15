import { LOAD_COOKIE, SET_FIELD_IMAGE, ADD_PATH, SET_PROJECT_SETTINGS } from './app-action-types';

function loadCookies(state, payload) {
    return {
        ...state,
        robotConfig: payload.robotConfig,
        paths: payload.paths,
    }
}

function setFiledImage(state, payload) {
    return {
        ...state,
        filedImage: payload.filedImage
    }
}

function addPath(state, payload) {
    const paths = state.paths;
    paths.push(payload.path);
    return {
        ...state,
        paths: paths,
        update: !state.update,
    }
}

function setProjectSettings(state, payload) {
    return {
        ...state,
        robotConfig: payload.settings.robotConfig,
        filedInfo: payload.settings.filedInfo,
    }
}

export const appReducer = (state, action) => {
    if (action.type === LOAD_COOKIE)
        return loadCookies(state, action.payload);
    else if (action.type === SET_FIELD_IMAGE)
        return setFiledImage(state, action.payload);
    else if (action.type === ADD_PATH)
        return addPath(state, action.payload);
    else if (action.type === SET_PROJECT_SETTINGS)
        return setProjectSettings(state, action.payload);
    return state;
};