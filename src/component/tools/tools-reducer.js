import { PathConfig, PathGenerator } from '../../path-generator/path-generator';
import { savePathToFile } from '../../ProjectHandler'
import { RobotDrawConfig } from "../field-view/field-view-config";
import {
  CHANGE_SELECTED_PATH, CHANGE_LISTEN_TO_MOUSE_STATUS, IS_PATH_IN_REVERSE, SET_DRAW_ROBOT
} from './tools-action-types';

export function stopDrawRobotInterval(state) {
  if (state.robotDrawConfig.drawRobotInterval)
    clearInterval(state.robotDrawConfig.drawRobotInterval);
  return new RobotDrawConfig(state.robotDrawConfig);
}

function changeSelectedPath(state, payload) {
  const waypoints = state.paths[payload.id].waypoints;
  const config = new PathConfig(state.pathConfig);
  const path = new PathGenerator(waypoints, config);
  return {
    ...state,
    robotDrawConfig: stopDrawRobotInterval(state),
    pathID: payload.id,
    rangePosition: 0,
    path: path,
  }
}

function changeListenToMouseStatus(state, payload) {
  if (state.paths.length === 0) return state;
  return {
    ...state,
    listenToMouseClicks: !state.listenToMouseClicks,
    robotDrawConfig: stopDrawRobotInterval(state),
  }
}

function isPathInReverse(state, payload) {
  const paths = state.paths;
  if (paths.length > 0) {
    paths[state.pathID].isInReverse = !paths[state.pathID].isInReverse;
    savePathToFile(state.projectPath, paths[state.pathID])
  }
  return {
    ...state,
    paths: paths,
    rangePosition: 0,
    robotDrawConfig: stopDrawRobotInterval(state),
  }
}

function setDrawRobotInterval(state, payload) {
  const newState = {
    ...state,
    listenToMouseClicks: false,
    update: !state.update
  };
  newState.robotDrawConfig.drawRobotInterval = payload.interval;
  if (state.rangePosition === state.path.sourceSetpoints.length - 1 && payload.interval)
    newState.rangePosition = 0;
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