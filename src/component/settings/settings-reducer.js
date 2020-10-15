import { CLOSE_SETTINGS, SET_ROBOT_CONFIG } from './settings-action-types';
import { saveProjectFile } from "../../FileHandler";

function closeSettings(state, payload) {
    return {
        ...state,
        showSettings: false,
    }
}

function setRobotConfig(state, payload) {
    const robotConfig = state.robotConfig;
    robotConfig[payload.key] = payload.value;
    const projectFile = {
        fieldImage: state.filedImageName,
        saveCSVTo: state.saveCSVTo,
        filedInfo: state.filedInfo,
        robotConfig: robotConfig,
    };
    saveProjectFile(state.projectPath ,projectFile);
    return {
        ...state,
        robotConfig: robotConfig,
        update: !state.update,
    }
}

export const settingsReducer = (state, action) => {
    if (action.type === CLOSE_SETTINGS)
        return closeSettings(state, action.payload);
    else if (action.type === SET_ROBOT_CONFIG)
        return setRobotConfig(state, action.payload);
    return state;
};