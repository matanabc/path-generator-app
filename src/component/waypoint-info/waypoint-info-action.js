import { WAYPOINT_INFO_REDUCER } from '../../redux/reducer-types';
import { ADD_WAYPOINT, REMOVE_WAYPOINT, UPDATE_WAYPOINT } from './waypoint-info-action-type';

export function updateWaypoint(id, key, value) {
    if (key !== "angle")
        value = Number(value);
    return {
        reducer: WAYPOINT_INFO_REDUCER,
        type: UPDATE_WAYPOINT,
        payload: {
            id: id,
            value: value,
            key: key,
        },
    };
}

export function addWaypoint(index) {
    return {
        reducer: WAYPOINT_INFO_REDUCER,
        type: ADD_WAYPOINT,
        payload: {
            index: index,
        },
    };
}

export function removeWaypoint(index) {
    return {
        reducer: WAYPOINT_INFO_REDUCER,
        type: REMOVE_WAYPOINT,
        payload: {
            index: index,
        },
    };
}