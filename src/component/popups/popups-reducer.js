import { PathConfig, PathGenerator } from '../../path-generator/path-generator';
import { deletePathFile, savePathToFile, renamePathFile } from '../..//handlers/project-handler'
import { PopupsConfig } from "./popups-config";
import { stopDrawRobotInterval } from "../tools/tools-reducer";
import {
  CHANGE_POPUP_STATUS, CHANGE_PATH_NAME, DELETE_PATH, CREATE_NEW_PATH
} from './popups-action-types';
import { updateIsIllegalPopupStatus } from '../waypoint-info/waypoint-info-reducer';

function changePopupStatus(state, payload) {
  const newState = {
    ...state,
    robotDrawConfig: stopDrawRobotInterval(state),
  };
  newState.popupsStatus = new PopupsConfig();
  newState.popupsStatus[payload.popupName] = !state.popupsStatus[payload.popupName];
  return newState;
}

function changePathName(state, payload) {
  const paths = state.paths;
  var isNewPath = true;
  paths.forEach(path => {
    if (path.name === payload.name)
      isNewPath = false;
  });
  if (isNewPath) {
    renamePathFile(state.projectPath, paths[state.pathID].name, payload.name);
    paths[state.pathID].name = payload.name;
  }
  return {
    ...state,
    paths: paths,
    update: !state.update,
    popupsStatus: new PopupsConfig(),
  }
}

function deletePath(state, payload) {
  const paths = [];
  state.paths.forEach((path, index) => {
    if (index !== state.pathID)
      paths.push(path)
  });
  deletePathFile(state.projectPath, state.paths[state.pathID].name);
  var path = undefined;
  if (paths.length > 0) {
    const waypoints = paths[0].waypoints;
    const config = new PathConfig(state.pathConfig);
    path = new PathGenerator(waypoints, config);
  }
  return {
    ...state,
    pathID: 0,
    path: path,
    paths: paths,
    rangePosition: 0,
    popupsStatus: updateIsIllegalPopupStatus(path),
  }
}

function createNewPath(state, payload) {
  const paths = state.paths;
  var isNewPath = true;
  paths.forEach(path => {
    if (path.name === payload.name)
      isNewPath = false;
  });
  if (isNewPath) {
    const path = { name: payload.name, waypoints: [], isInReverse: false };
    paths.push(path);
    savePathToFile(state.projectPath, path);
  }
  return {
    ...state,
    paths: paths,
    update: !state.update,
    popupsStatus: new PopupsConfig(),
  }
}

export const popupsReducer = (state, action) => {
  if (action.type === CHANGE_POPUP_STATUS)
    return changePopupStatus(state, action.payload);
  else if (action.type === CHANGE_PATH_NAME)
    return changePathName(state, action.payload);
  else if (action.type === DELETE_PATH)
    return deletePath(state, action.payload);
  else if (action.type === CREATE_NEW_PATH)
    return createNewPath(state, action.payload);
  return state;
};