import { OPEN_SETTINGS, CHANGE_SELECTED_PATH, CHANGE_LISTEN_TO_MOUSE_STATUS } from './tools-action-types';

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

export const toolsReducer = (state, action) => {
  if (action.type === OPEN_SETTINGS)
    return openSettings(state, action.payload);
  else if (action.type === CHANGE_SELECTED_PATH)
    return changeSelectedPath(state, action.payload);
  else if (action.type === CHANGE_LISTEN_TO_MOUSE_STATUS)
    return changeListenToMouseStatus(state, action.payload);
  return state;
};