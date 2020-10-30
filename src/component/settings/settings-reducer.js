import { SET_SETTINGS } from './settings-action-types';
import { saveProjectFolderPath, saveProjectFile } from "../../ProjectHandler";
import { PathGenerator } from "../../path-generator/path-generator";
import { PopupsConfig } from "../popups/popups-config";
import { updateIsIllegalPopupStatus } from '../waypoint-info/waypoint-info-reducer';

function setSettings(state, payload) {
    saveProjectFolderPath(payload.settings.projectPath);
    const newState = {
        ...state,
        ...payload.settings,
        popupsStatus: new PopupsConfig(),
        update: !state.update,
        rangePosition: 0,
    };
    if (state.paths.length > 0) {
        const waypoints = state.paths[state.pathID].waypoints;
        const config = newState.pathConfig;
        newState.path = new PathGenerator(waypoints, config);
    }
    const projectFile = {
        saveCSVTo: newState.saveCSVTo,
        fieldConfig: newState.fieldConfig,
        pathConfig: payload.settings.pathConfig,
        robotDrawConfig: payload.settings.robotDrawConfig,
        popupsStatus: updateIsIllegalPopupStatus(newState.path),
    };
    if (payload.settings.projectPath === state.projectPath)
        saveProjectFile(newState.projectPath, projectFile);
    else {
        newState.paths = [];
        newState.pathID = 0;
    }
    return newState;
}

export const settingsReducer = (state, action) => {
    if (action.type === SET_SETTINGS)
        return setSettings(state, action.payload);
    return state;
};