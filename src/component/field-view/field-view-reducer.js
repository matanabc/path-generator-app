import Generator from '../../path-generator/generator';
import { PathConfig } from '../../path-generator/path-generator';
import { savePathToFile } from '../..//handlers/project-handler'
import { ADD_WAYPOINT, SET_PATH } from './field-view-action-types';

function addWaypoint(state, payload) {
    const newState = { ...state, update: !state.update };
    if (newState.paths.length > 0) {
        const path = newState.paths[newState.pathID];
        const waypoints = [];
        path.waypoints.forEach((waypoint, index) => {
            waypoints.push(waypoint);
            if (newState.waypointID !== undefined && newState.waypointID === index)
                waypoints.push(payload.waypoint);
        });

        if (newState.waypointID === undefined)
            waypoints.push(payload.waypoint);
        else {
            newState.listenToMouseClicks = false;
            newState.waypointID = undefined;
        }

        path.waypoints = waypoints;
        newState.paths[newState.pathID] = path;
        savePathToFile(newState.projectPath, path);
        const config = new PathConfig(newState.pathConfig);
        newState.path = new Generator(waypoints, config);
    }
    return newState;
}

function setPath(state, payload) {
    return {
        ...state,
        path: payload.path
    }
}

export const fieldViewReducer = (state, action) => {
    if (action.type === ADD_WAYPOINT)
        return addWaypoint(state, action.payload);
    if (action.type === SET_PATH)
        return setPath(state, action.payload);
    return state;
};