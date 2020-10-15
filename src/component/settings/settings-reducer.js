import { CLOSE_SETTINGS, SET_SETTINGS } from './settings-action-types';
import { saveProjectFolderPath, saveProjectFile } from "../../ProjectHandler";

function closeSettings(state, payload) {
    return {
        ...state,
        showSettings: false,
    }
}

function setSettings(state, payload) {
    saveProjectFolderPath(payload.settings.projectPath);
    const newState = {
        ...state,
        ...payload.settings,
        showSettings: false,
    };
    const projectFile = {
        fieldImage: newState.filedImageName,
        saveCSVTo: newState.saveCSVTo,
        filedInfo: newState.filedInfo,
        robotConfig: payload.settings.robotConfig,
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