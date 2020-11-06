import Generator from '../../path-generator/generator';
import { PathConfig } from '../../path-generator/path-generator';
import { savePathToFile } from '../..//handlers/project-handler'
import { PopupsConfig } from '../popups/popups-config';
import { stopDrawRobotInterval } from '../tools/tools-reducer';
import { ADD_WAYPOINT, REMOVE_WAYPOINT, UPDATE_WAYPOINT } from './waypoint-info-action-type';

function updateWaypoint(state, payload) {
    const paths = state.paths;
    paths[state.pathID].waypoints[payload.id][payload.key] = payload.value;
    return {
        ...state,
        paths: paths,
        update: !state.update,
    }
}

function addWaypoint(state, payload) {
    var waypointID = undefined;
    var listenToMouseClicks = false;
    if (state.waypointID === undefined || state.waypointID !== payload.index){
        waypointID = payload.index;
        listenToMouseClicks = true;
    }
    return {
        ...state,
        robotDrawConfig: stopDrawRobotInterval(state),
        listenToMouseClicks: listenToMouseClicks,
        waypointID: waypointID,
        update: !state.update,
    };
}

function removeWaypoint(state, payload) {
    const waypoints = [];
    state.paths[state.pathID].waypoints.forEach((waypoint, index) => {
        if (index !== payload.index)
            waypoints.push(waypoint);
    });
    const newState = { ...state };
    newState.paths[state.pathID].waypoints = waypoints;
    return {
        ...newState,
        update: !state.update,
        robotDrawConfig: stopDrawRobotInterval(newState),
    };
}

function fixWaypoint(state, payload) {
    if (payload.key === "vMax")
        state.paths[state.pathID].waypoints[payload.id][payload.key] = Math.min(state.pathConfig.vMax, payload.value);
    else if (payload.key === "v")
        state.paths[state.pathID].waypoints[payload.id][payload.key] = Math.min(state.pathConfig.vMax, payload.value);
}

export function updateIsIllegalPopupStatus(path) {
    const popupsStatus = new PopupsConfig();
    if (path === undefined) return popupsStatus;
    popupsStatus.pathIsIllegal = !path.isLegal;
    return popupsStatus;
}

export const waypointInfoReducer = (state, action) => {
    if (action.type === UPDATE_WAYPOINT)
        state = updateWaypoint(state, action.payload);
    else if (action.type === REMOVE_WAYPOINT)
        state = removeWaypoint(state, action.payload);
    else if (action.type === ADD_WAYPOINT)
        state = addWaypoint(state, action.payload);
    const waypoints = state.paths[state.pathID].waypoints;
    const config = new PathConfig(state.pathConfig);
    state.rangePosition = 0;
    state.path = new Generator(waypoints, config);
    state.popupsStatus = updateIsIllegalPopupStatus(state.path);
    fixWaypoint(state, action.payload);
    savePathToFile(state.projectPath, state.paths[state.pathID]);
    return state;
}