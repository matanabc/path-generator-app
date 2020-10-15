import coockies from 'js-cookie';

export const FILED_CONFIG = "filed_config"
export const ROBOT_CONFIG = "robot_config"
export const PATHS = "paths"
export const PROJECT_FOLDER = "projectFolder"


export const saveCookies = async (key, value) => {
    if (key === PROJECT_FOLDER)
        coockies.set(key, value, { expires: 999999 });
    if (key === FILED_CONFIG || key === ROBOT_CONFIG || key === PATHS)
        coockies.set(key, JSON.stringify(value), { expires: 999999 });
}

export const loadCookies = async (callback) => {
    var filedConfig = coockies.get(FILED_CONFIG);
    var robotConfig = coockies.get(ROBOT_CONFIG);
    var paths = coockies.get(PATHS);

    if (!filedConfig)
        filedConfig = {};
    else
        filedConfig = JSON.parse(filedConfig);

    if (!robotConfig)
        robotConfig = { width: 0.8, vMax: 2, acc: 2 };
    else
        robotConfig = JSON.parse(robotConfig);

    if (!paths)
        paths = [];
    else
        paths = JSON.parse(paths);

    callback(robotConfig, paths, filedConfig);
}