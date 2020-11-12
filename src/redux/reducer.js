import {
    TOOLS_REDUCER, SETTINGS_REDUCER, APP_REDUCER, WAYPOINT_INFO_REDUCER,
    FIELD_VIEW_REDUCER, PLAYING_BAR_REDUCER, POPUPS_REDUCER
} from './reducer-types'
import { toolsReducer } from "../component/tools/tools-reducer";
import { settingsReducer } from "../component/settings/settings-reducer";
import { appReducer } from "../component/app/app-reducer";
import { waypointInfoReducer } from "../component/waypoint-info/waypoint-info-reducer";
import { fieldViewReducer } from "../component/field-view/field-view-reducer";
import { playingBarReducer } from "../component/playing-bar/playing-bar-reducer";
import { popupsReducer } from "../component/popups/popups-reducer";
import { PathConfig } from "../path-generator/path-generator";
import { FieldConfig, RobotDrawConfig } from "../component/field-view/field-view-config";
import { PopupsConfig } from "../component/popups/popups-config";

const initialState = {
    pathConfig: new PathConfig(),
    robotDrawConfig: new RobotDrawConfig(),
    fieldConfig: new FieldConfig(),
    popupsStatus: new PopupsConfig(),

    listenToMouseClicks: false,
    newVersion: undefined,
    waypointID: undefined,
    rangePosition: 0,
    version: "0.0.0",
    projectPath: "",
    path: undefined,
    filedImage: "",
    saveCSVTo: "",
    update: false,
    pathID: 0,
    paths: [],
};

function reducer(state = initialState, action) {
    if (action.reducer === TOOLS_REDUCER)
        return toolsReducer(state, action);
    else if (action.reducer === SETTINGS_REDUCER)
        return settingsReducer(state, action);
    else if (action.reducer === APP_REDUCER)
        return appReducer(state, action);
    else if (action.reducer === WAYPOINT_INFO_REDUCER)
        return waypointInfoReducer(state, action);
    else if (action.reducer === FIELD_VIEW_REDUCER)
        return fieldViewReducer(state, action);
    else if (action.reducer === PLAYING_BAR_REDUCER)
        return playingBarReducer(state, action);
    else if (action.reducer === POPUPS_REDUCER)
        return popupsReducer(state, action);
    return state;
};

export default reducer;