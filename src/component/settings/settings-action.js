import { SETTINGS_REDUCER } from '../../redux/reducer-types';
import { CLOSE_SETTINGS, SET_SETTINGS } from './settings-action-types'

export function closeSettings() {
    return {
        reducer: SETTINGS_REDUCER,
        type: CLOSE_SETTINGS,
        payload: {},
    };
}

export function setSettings(settings) {
    return {
        reducer: SETTINGS_REDUCER,
        type: SET_SETTINGS,
        payload: {
            settings: settings,
        }
    };
}
