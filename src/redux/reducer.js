import {
    TOOLS_REDUCER, SETTINGS_REDUCER, APP_REDUCER, WAYPOINT_INFO_REDUCER, FIELD_VIEW_REDUCER,
    RENAME_PATH_REDUCER
} from './reducer-types'
import { toolsReducer } from "../component/tools/tools-reducer";
import { settingsReducer } from "../component/settings/settings-reducer";
import { appReducer } from "../component/app/app-reducer";
import { waypointInfoReducer } from "../component/waypoint-info/waypoint-info-reducer";
import { fieldViewReducer } from "../component/field-view/field-view-reducer";
import { renamePathReducer } from "../component/rename-path/rename-path-reducer";

const initialState = {
    update: false,
    paths: undefined,
    pathID: 0,
    listenToMouseClicks: false,
    setFiledSize: false,
    showSettings: false,
    filedInfo: {
        x_min: 130,
        x_max: 754,
        y_min: 20,
        y_max: 440,
        fieldWidth: 16.5354,
        fieldHeight: 8.0010,
        widthMeterToPixel: (16.5354) / (754 - 130),
        hightMeterToPixel: (8.0010) / (440 - 20),
        // widthMeterToPixel: (fieldWidth) / (x_max - x_min),
        // hightMeterToPixel: (fieldHeight) / (y_max - y_min),
    },
    robotConfig: {
        acc: 3,
        vMax: 4,
        width: 0.8,
    },
    path: undefined,
    renamePath: false,
};

function reducer(state = initialState, action) {
    if (action.reducer === TOOLS_REDUCER)
        return toolsReducer(state, action)
    else if (action.reducer === SETTINGS_REDUCER)
        return settingsReducer(state, action)
    else if (action.reducer === APP_REDUCER)
        return appReducer(state, action)
    else if (action.reducer === WAYPOINT_INFO_REDUCER)
        return waypointInfoReducer(state, action)
    else if (action.reducer === FIELD_VIEW_REDUCER)
        return fieldViewReducer(state, action)
    else if (action.reducer === RENAME_PATH_REDUCER)
        return renamePathReducer(state, action)
    return state;
};

export default reducer;