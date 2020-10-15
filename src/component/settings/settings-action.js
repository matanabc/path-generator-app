import { SETTINGS_REDUCER } from '../../redux/reducer-types';
import {
    CLOSE_SETTINGS, SET_ROBOT_CONFIG
} from './settings-action-types'

export function closeSettings() {
    return {
        reducer: SETTINGS_REDUCER,
        type: CLOSE_SETTINGS,
        payload: {},
    };
}

export function setRobotConfig(key, value) {
    return {
        reducer: SETTINGS_REDUCER,
        type: SET_ROBOT_CONFIG,
        payload: {
            key: key,
            value: Number(value),
        }
    };
}
