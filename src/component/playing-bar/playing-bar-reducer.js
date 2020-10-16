import { SET_RANGE_POSITION, ADD_TO_RANGE_POSITION } from './playing-bar-types';

function setRangePosition(state, payload) {
    return {
        ...state,
        rangePosition: payload.rangePosition,
    }
}

function addToRangePosition(state, payload) {
    const newState = { ...state };
    if (state.rangePosition === 100 && payload.add > 0)
        payload.add = 0;
    else if (state.rangePosition === 0 && payload.add < 0)
        payload.add = 0;
    else if (state.rangePosition === 100)
        newState.drawRobotInterval = undefined;
    newState.rangePosition = state.rangePosition + payload.add;
    return newState;
}

export const playingBarReducer = (state, action) => {
    if (action.type === SET_RANGE_POSITION)
        return setRangePosition(state, action.payload);
    else if (action.type === ADD_TO_RANGE_POSITION)
        return addToRangePosition(state, action.payload);
    return state;
};