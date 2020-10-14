import { FIELD_VIEW_REDUCER } from '../../redux/reducer-types';
import {
    ADD_WAYPOINT, SET_METER_TO_PIXEL, SET_PATH
} from './field-view-action-types'

export function addWaypoint(waypoint) {
    return {
        reducer: FIELD_VIEW_REDUCER,
        type: ADD_WAYPOINT,
        payload: {
            waypoint: waypoint
        }
    };
}

export function setPath(path) {
    return {
        reducer: FIELD_VIEW_REDUCER,
        type: SET_PATH,
        payload: {
            path: path
        }
    };
}

export function setMeterToPixel(widthMeterToPixel, hightMeterToPixel) {
    return {
        reducer: FIELD_VIEW_REDUCER,
        type: SET_METER_TO_PIXEL,
        payload: {
            hightMeterToPixel: hightMeterToPixel,
            widthMeterToPixel: widthMeterToPixel,
        }
    };
}
