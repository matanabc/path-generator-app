import { saveCookies, PATHS } from '../../CookieHandler'
import { ADD_WAYPOINT } from './field-view-action-types';

function addWaypoint(state, payload) {
    const newState = state;
    newState.paths[state.pathID].waypoints.push(payload.waypoint);
    saveCookies(PATHS, newState.paths);
    return {
        ...newState,
        update: !state.update
    }
}

export const fieldViewReducer = (state, action) => {
    if (action.type === ADD_WAYPOINT)
        return addWaypoint(state, action.payload);
    return state;
};