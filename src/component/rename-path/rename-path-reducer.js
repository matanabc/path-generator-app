import { CLOSE, SAVE_PATH_NAME } from './rename-path-action-types';
import { saveCookies, PATHS } from '../../CookieHandler'

function close(state, payload) {    
    return {
        ...state,
        renamePath: false,
    }
}

function save(state, payload) {
    const paths = state.paths;
    paths[state.pathID].name = payload.name;
    saveCookies(PATHS, paths);
    return {
        ...state,
        renamePath: false,
        paths: paths,
        update: !state.update,
    }
}

export const renamePathReducer = (state, action) => {
    if (action.type === CLOSE)
        return close(state, action.payload);
    else if (action.type === SAVE_PATH_NAME)
        return save(state, action.payload);
    return state;
};