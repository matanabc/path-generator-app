import { CLOSE_SETTINGS, SET_ROBOT_V_MAX, SET_ROBOT_ACC, SET_ROBOT_WIDTH } from './settings-action-types';

function closeSettings(state, payload) {
    return {
        ...state,
        showSettings: false,
    }
}

function setRobotConfig(state, payload) {
    return {
        ...state,
        robotConfig: payload.robotConfig,
    }
}

export const settingsReducer = (state, action) => {
    if (action.type === CLOSE_SETTINGS)
        return closeSettings(state, action.payload);
    else if (action.type === SET_ROBOT_V_MAX || action.type === SET_ROBOT_ACC || action.type === SET_ROBOT_WIDTH)
        return setRobotConfig(state, action.payload);
    return state;
};