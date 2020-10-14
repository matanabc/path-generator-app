import { saveCookies, PATHS } from '../../CookieHandler';
import {
  OPEN_SETTINGS, CHANGE_SELECTED_PATH, CHANGE_LISTEN_TO_MOUSE_STATUS, RENAME_PATH,
  SHOW_DELETE_PATH, DELETE_PATH, SHOW_CREATE_NEW_PATH, CREATE_NEW_PATH
} from './tools-action-types';

function openSettings(state, payload) {
  return {
    ...state,
    showSettings: true,
  }
}

function changeSelectedPath(state, payload) {
  return {
    ...state,
    pathID: payload.id,
  }
}

function changeListenToMouseStatus(state, payload) {
  return {
    ...state,
    listenToMouseClicks: !state.listenToMouseClicks,
  }
}

function renamePath(state, payload) {
  return {
    ...state,
    renamePath: true,
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
    createNewPath: !state.createANewPath,
  }
}

function deletePath(state, payload) {
  const paths = [];
  state.paths.forEach((path, index) => {
    if (index !== state.pathID)
      paths.push(path)
  });
  saveCookies(PATHS, paths);
  return {
    ...state,
    paths: paths,
    pathID: 0,
  }
}

function createNewPath(state, payload) {
  const paths = state.paths;
  paths.push({ name: payload.name, waypoints: [] });
  saveCookies(PATHS, paths);
  return {
    ...state,
    paths: paths,
    createNewPath: false,
  }
}

export const toolsReducer = (state, action) => {
  if (action.type === OPEN_SETTINGS)
    return openSettings(state, action.payload);
  else if (action.type === CHANGE_SELECTED_PATH)
    return changeSelectedPath(state, action.payload);
  else if (action.type === CHANGE_LISTEN_TO_MOUSE_STATUS)
    return changeListenToMouseStatus(state, action.payload);
  else if (action.type === RENAME_PATH)
    return renamePath(state, action.payload);
  else if (action.type === SHOW_DELETE_PATH)
    return showDeletePath(state, action.payload);
  else if (action.type === DELETE_PATH)
    return deletePath(state, action.payload);
  else if (action.type === SHOW_CREATE_NEW_PATH)
    return showCreateNewPath(state, action.payload);
  else if (action.type === CREATE_NEW_PATH)
    return createNewPath(state, action.payload);
  return state;
};