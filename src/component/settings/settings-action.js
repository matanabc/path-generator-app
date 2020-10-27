import { SETTINGS_REDUCER } from '../../redux/reducer-types';
import { SET_SETTINGS } from './settings-action-types'

export function setSettings(settings) {
    return {
        reducer: SETTINGS_REDUCER,
        type: SET_SETTINGS,
        payload: {
            settings: settings,
        }
    };
}
