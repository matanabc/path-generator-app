import { LOAD_COOKIE } from './app-action-types';

function loadCookies(state, payload) {
    return {
        ...state,
        robotConfig: payload.robotConfig,
        paths: payload.paths,
    }
}

export const appReducer = (state, action) => {
    if (action.type === LOAD_COOKIE)
        return loadCookies(state, action.payload);
    return state;
};