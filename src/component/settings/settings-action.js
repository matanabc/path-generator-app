import { SETTINGS_REDUCER } from '../../redux/reducer-types';
import { saveCookies, ROBOT_CONFIG } from '../../CookieHandler'
import {
    CLOSE_SETTINGS, SET_ROBOT_ACC, SET_ROBOT_V_MAX, SET_ROBOT_WIDTH
} from './settings-action-types'

export function closeSettings() {
    return {
        reducer: SETTINGS_REDUCER,
        type: CLOSE_SETTINGS,
        payload: {},
    };
}

export function setRobotAcc(robotConfig, acc) {
    const config = getNewRobotConfig(robotConfig, "acc", acc)
    return {
        reducer: SETTINGS_REDUCER,
        type: SET_ROBOT_ACC,
        payload: {
            robotConfig: config,
        }
    };
}

export function setRobotVMax(robotConfig, vMax) {
    const config = getNewRobotConfig(robotConfig, "vMax", vMax)
    return {
        reducer: SETTINGS_REDUCER,
        type: SET_ROBOT_V_MAX,
        payload: {
            robotConfig: config,
        }
    };
}

export function setRobotWidth(robotConfig, width) {
    const config = getNewRobotConfig(robotConfig, "width", width)
    return {
        reducer: SETTINGS_REDUCER,
        type: SET_ROBOT_WIDTH,
        payload: {
            robotConfig: config,
        }
    };
}

function getNewRobotConfig(robotConfig, key, value) {
    const config = {
        acc: robotConfig.acc,
        vMax: robotConfig.vMax,
        width: robotConfig.width,
    }
    config[key] = Number(value);
    saveCookies(ROBOT_CONFIG, config);
    return config;
}
