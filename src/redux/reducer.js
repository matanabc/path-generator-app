import {
    TOOLS_REDUCER, SETTINGS_REDUCER, APP_REDUCER, WAYPOINT_INFO_REDUCER, FIELD_VIEW_REDUCER,
} from './reducer-types'
import { toolsReducer } from "../component/tools/tools-reducer";
import { settingsReducer } from "../component/settings/settings-reducer";
import { appReducer } from "../component/app/app-reducer";
import { waypointInfoReducer } from "../component/waypoint-info/waypoint-info-reducer";
import { fieldViewReducer } from "../component/field-view/field-view-reducer";

const initialState = {
    showRenamePathPopup: false,
    listenToMouseClicks: false,
    robotConfig: undefined,
    showDeletePath: false,
    createNewPath: false,
    filedInfo: undefined,
    setFiledSize: false,
    showSettings: false,
    filedImageName: "",
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
        return toolsReducer(state, action)
    else if (action.reducer === SETTINGS_REDUCER)
        return settingsReducer(state, action)
    else if (action.reducer === APP_REDUCER)
        return appReducer(state, action)
    else if (action.reducer === WAYPOINT_INFO_REDUCER)
        return waypointInfoReducer(state, action)
    else if (action.reducer === FIELD_VIEW_REDUCER)
        return fieldViewReducer(state, action)
    return state;
};

export default reducer;