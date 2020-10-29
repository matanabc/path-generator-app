import { PathConfig, PathGenerator } from '../../path-generator/path-generator';
import { FieldConfig, RobotDrawConfig } from "../field-view/field-view-config";
import { updateIsIllegalPopupStatus } from '../waypoint-info/waypoint-info-reducer';
import { SET_PROJECT_FOLDER_PATH, SET_FIELD_IMAGE, ADD_PATH, SET_PROJECT_SETTINGS } from './app-action-types';

function setProjectFolderPath(state, payload) {
    return {
        ...state,
        projectPath: payload.projectPath
    }
}

function setFiledImage(state, payload) {
    return {
        ...state,
        filedImage: payload.filedImage,
        update: !state.update,
    }
}

function addPath(state, payload) {
    const paths = state.paths;
    paths.push(payload.path);
    const waypoints = paths[state.pathID].waypoints;
    const config = new PathConfig(state.pathConfig);
    const path = new PathGenerator(waypoints, config);
    return {
        ...state,
        path: path,
        paths: paths,
        update: !state.update,
        popupsStatus: updateIsIllegalPopupStatus(path),
    }
}

function setProjectSettings(state, payload) {
    return {
        ...state,
        pathConfig: new PathConfig(payload.settings.pathConfig),
        fieldConfig: new FieldConfig(payload.settings.fieldConfig),
        robotDrawConfig: new RobotDrawConfig(payload.settings.robotDrawConfig),
        saveCSVTo: payload.settings.saveCSVTo,
        update: !state.update,
    }
}

export const appReducer = (state, action) => {
    if (action.type === SET_PROJECT_FOLDER_PATH)
        return setProjectFolderPath(state, action.payload);
    else if (action.type === SET_FIELD_IMAGE)
        return setFiledImage(state, action.payload);
    else if (action.type === ADD_PATH)
        return addPath(state, action.payload);
    else if (action.type === SET_PROJECT_SETTINGS)
        return setProjectSettings(state, action.payload);
    return state;
};