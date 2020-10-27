import { PathConfig, PathGenerator } from '../../path-generator/path-generator';
import { savePathToFile } from '../../ProjectHandler'
import {
  CHANGE_SELECTED_PATH, CHANGE_LISTEN_TO_MOUSE_STATUS, IS_PATH_IN_REVERSE, SET_DRAW_ROBOT
} from './tools-action-types';

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
  if (action.type === CHANGE_SELECTED_PATH)
    return changeSelectedPath(state, action.payload);
  else if (action.type === CHANGE_LISTEN_TO_MOUSE_STATUS)
    return changeListenToMouseStatus(state, action.payload);
  else if (action.type === IS_PATH_IN_REVERSE)
    return isPathInReverse(state, action.payload);
  else if (action.type === SET_DRAW_ROBOT)
    return setDrawRobotInterval(state, action.payload);
  return state;
};