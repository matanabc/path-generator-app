import Generator from '../../path-generator/generator';
import { RobotConfig } from '../../path-generator/path';
import { savePathToFile } from '../../ProjectHandler'
import { ADD_WAYPOINT, SET_PATH } from './field-view-action-types';

function addWaypoint(state, payload) {
    const newState = state;
    newState.paths[state.pathID].waypoints.push(payload.waypoint);
    savePathToFile(state.projectPath, state.paths[state.pathID]);
    const waypoints = newState.paths[state.pathID].waypoints;
    const config = new RobotConfig(state.robotConfig);
    const path = new Generator(waypoints, config);
    return {
        ...newState,
        update: !state.update,
        path: path,
    }
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