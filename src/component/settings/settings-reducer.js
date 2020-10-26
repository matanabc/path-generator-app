import { CLOSE_SETTINGS, SET_SETTINGS } from './settings-action-types';
import { saveProjectFolderPath, saveProjectFile } from "../../ProjectHandler";
import { PathGenerator } from "../../path-generator/path-generator";

function closeSettings(state, payload) {
    return {
        ...state,
        showSettings: false,
    }
}

function setSettings(state, payload) {
    saveProjectFolderPath(payload.settings.projectPath);
    const waypoints = state.paths[state.pathID].waypoints;
    const config = state.pathConfig;
    const path = new PathGenerator(waypoints, config);
    const newState = {
        ...state,
        ...payload.settings,
        showSettings: false,
        rangePosition: 0,
        path: path,
    };
    const projectFile = {
        saveCSVTo: newState.saveCSVTo,
        fieldConfig: newState.fieldConfig,
        pathConfig: payload.settings.pathConfig,
    };
    saveProjectFile(newState.projectPath, projectFile);
    return newState;
}

export const settingsReducer = (state, action) => {
    if (action.type === CLOSE_SETTINGS)
        return closeSettings(state, action.payload);
    else if (action.type === SET_SETTINGS)
        return setSettings(state, action.payload);
    return state;
};