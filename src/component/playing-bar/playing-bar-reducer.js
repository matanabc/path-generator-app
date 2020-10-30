import { stopDrawRobotInterval } from "../tools/tools-reducer";
import { SET_RANGE_POSITION, ADD_TO_RANGE_POSITION } from './playing-bar-types';

function setRangePosition(state, payload) {
    return {
        ...state,
        listenToMouseClicks: false,
        rangePosition: payload.rangePosition,
        robotDrawConfig: stopDrawRobotInterval(state),
    }
}

function addToRangePosition(state, payload) {
    const newState = { ...state };
    const maxRange = state.path.sourceSetpoints.length - 1;
    if (state.rangePosition === maxRange && payload.add > 0)
        payload.add = 0;
    else if (state.rangePosition === 0 && payload.add < 0)
        payload.add = 0;
    else if (state.rangePosition === maxRange)
        newState.robotDrawConfig.drawRobotInterval = undefined;
    newState.rangePosition = state.rangePosition + payload.add;
    newState.listenToMouseClicks = false;
    return newState;
}

export const playingBarReducer = (state, action) => {
    if (action.type === SET_RANGE_POSITION)
        return setRangePosition(state, action.payload);
    else if (action.type === ADD_TO_RANGE_POSITION)
        return addToRangePosition(state, action.payload);
    return state;
};