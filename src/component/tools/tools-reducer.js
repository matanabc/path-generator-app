import { PathConfig, PathGenerator } from '../../path-generator/path-generator';
import { deletePathFile, savePathToFile, renamePathFile } from '../../ProjectHandler'
import {
  OPEN_SETTINGS, CHANGE_SELECTED_PATH, CHANGE_LISTEN_TO_MOUSE_STATUS, SHOW_RENAME_PATH_POPUP,
  SHOW_DELETE_PATH, DELETE_PATH, SHOW_CREATE_NEW_PATH, CREATE_NEW_PATH, CHANGE_PATH_NAME,
  IS_PATH_IN_REVERSE, SET_DRAW_ROBOT
} from './tools-action-types';

function openSettings(state, payload) {
  return {
    ...state,
    showSettings: true,
  }
}

function changeSelectedPath(state, payload) {
  const waypoints = state.paths[payload.id].waypoints;
  const config = new PathConfig(state.pathConfig);
  const path = new PathGenerator(waypoints, config);
  return {
    ...state,
    pathID: payload.id,
    rangePosition: 0,
    path: path,
  }
}

function changeListenToMouseStatus(state, payload) {
  return {
    ...state,
    listenToMouseClicks: !state.listenToMouseClicks,
    rangePosition: 0,
  }
}

function showRenamePathPopup(state, payload) {
  return {
    ...state,
    showRenamePathPopup: !state.showRenamePathPopup,
  }
}

function showDeletePath(state, payload) {
  return {
    ...state,
    showDeletePath: !state.showDeletePath,
  }
}

function showCreateNewPath(state, payload) {
  return {
    ...state,
    createNewPath: !state.createNewPath,
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
    showDeletePath: false,
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
    createNewPath: false,
    showDeletePath: false,
  }
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
    createNewPath: false,
    showDeletePath: false,
    showRenamePathPopup: false,
  }
}

function isPathInReverse(state, payload) {
  const paths = state.paths;
  paths[state.pathID].isInReverse = !paths[state.pathID].isInReverse;
  savePathToFile(state.projectPath, paths[state.pathID])
  return {
    ...state,
    paths: paths,
    update: !state.update
  }
}

function setDrawRobotInterval(state, payload) {
  const newState = {
    ...state,
    listenToMouseClicks: false,
    update: !state.update
  };
  newState.robotDrawConfig.drawRobotInterval = payload.interval;
  return newState;
}

export const toolsReducer = (state, action) => {
  if (action.type === OPEN_SETTINGS)
    return openSettings(state, action.payload);
  else if (action.type === CHANGE_SELECTED_PATH)
    return changeSelectedPath(state, action.payload);
  else if (action.type === CHANGE_LISTEN_TO_MOUSE_STATUS)
    return changeListenToMouseStatus(state, action.payload);
  else if (action.type === SHOW_RENAME_PATH_POPUP)
    return showRenamePathPopup(state, action.payload);
  else if (action.type === SHOW_DELETE_PATH)
    return showDeletePath(state, action.payload);
  else if (action.type === DELETE_PATH)
    return deletePath(state, action.payload);
  else if (action.type === SHOW_CREATE_NEW_PATH)
    return showCreateNewPath(state, action.payload);
  else if (action.type === CREATE_NEW_PATH)
    return createNewPath(state, action.payload);
  else if (action.type === CHANGE_PATH_NAME)
    return changePathName(state, action.payload);
  else if (action.type === IS_PATH_IN_REVERSE)
    return isPathInReverse(state, action.payload);
  else if (action.type === SET_DRAW_ROBOT)
    return setDrawRobotInterval(state, action.payload);
  return state;
};