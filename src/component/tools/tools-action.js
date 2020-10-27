import { TOOLS_REDUCER } from '../../redux/reducer-types'
import {
    CHANGE_SELECTED_PATH, CHANGE_LISTEN_TO_MOUSE_STATUS, IS_PATH_IN_REVERSE, SET_DRAW_ROBOT
} from './tools-action-types';

export function setDrawRobotInterval(interval, drawRobotInterval, robotLoopTime) {
    if (interval) {
        clearInterval(interval);
        interval = undefined;
    } else if (!interval && drawRobotInterval && robotLoopTime)
        interval = setInterval(drawRobotInterval, 1000 * robotLoopTime);
    else
        interval = undefined;

    return {
        reducer: TOOLS_REDUCER,
        type: SET_DRAW_ROBOT,
        payload: {
            interval: interval
        },
    };
}

export function isPathInReverse() {
    return {
        reducer: TOOLS_REDUCER,
        type: IS_PATH_IN_REVERSE,
        payload: {},
    };
}

export function changeSelectedPath(id) {
    return {
        reducer: TOOLS_REDUCER,
        type: CHANGE_SELECTED_PATH,
        payload: {
            id: id,
        },
    };
}

export function changeListenToMouseStatus() {
    return {
        reducer: TOOLS_REDUCER,
        type: CHANGE_LISTEN_TO_MOUSE_STATUS,
        payload: {},
    };
}