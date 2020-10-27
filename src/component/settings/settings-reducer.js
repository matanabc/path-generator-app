import { SET_SETTINGS } from './settings-action-types';
import { saveProjectFolderPath, saveProjectFile } from "../../ProjectHandler";
import { PathGenerator } from "../../path-generator/path-generator";
import { PopupsConfig } from "../popups/popups-config";

function setSettings(state, payload) {
    saveProjectFolderPath(payload.settings.projectPath);
    const newState = {
        ...state,
        ...payload.settings,
        popupsStatus: new PopupsConfig(),
        rangePosition: 0,
    };
    if (state.paths.length > 0){
        const waypoints = state.paths[state.pathID].waypoints;
        const config = newState.pathConfig;
        newState.path = new PathGenerator(waypoints, config);
    }
    const projectFile = {
        saveCSVTo: newState.saveCSVTo,
        fieldConfig: newState.fieldConfig,
        pathConfig: payload.settings.pathConfig,
        robotDrawConfig: payload.settings.robotDrawConfig,
    };
    saveProjectFile(newState.projectPath, projectFile);
    return newState;
}

export const settingsReducer = (state, action) => {
    if (action.type === SET_SETTINGS)
        return setSettings(state, action.payload);
    return state;
};