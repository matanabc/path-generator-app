import { r2d } from "./path-generator/util";
import cookies from 'js-cookie';

const ipcRenderer = window.require('electron').ipcRenderer;
const cookieName = "project_path";
const fs = window.require('fs');
const os = window.require('os');

export function loadFieldImage(folderPath, imageName, callback) {
    fs.readFile(`${folderPath}/${imageName}`, function (err, data) {
        if (!err)
            callback(URL.createObjectURL(new Blob([data])), imageName);
        else
            callback(undefined, imageName);
    });
}

function loadPaths(folderPath, callback) {
    fs.readdir(`${folderPath}/paths`, (err, files) => {
        if (err) return;
        files.forEach(file => {
            if (file.endsWith(".json"))
                fs.readFile(`${folderPath}/paths/${file}`, (err, data) => {
                    if (err) return;
                    callback(JSON.parse(data));
                });
        });
    });
}

export const loadProjectFile = (callback, projetcFolderCallback, filedImageCallback, loadPathsCallback) => {
    var folderPath = cookies.get(cookieName);
    if (folderPath === undefined)
        folderPath = `${os.homedir()}/PathGenerator`;
    projetcFolderCallback(folderPath);
    if (folderPath)
        fs.readFile(`${folderPath}/PathGenerator.json`, (err, data) => {
            if (err) return;
            const projectFile = JSON.parse(data);
            if (projectFile.fieldConfig && projectFile.fieldConfig.imageName)
                loadFieldImage(folderPath, projectFile.fieldConfig.imageName, filedImageCallback);
            loadPaths(folderPath, loadPathsCallback);
            callback(projectFile);
        });
}

export const savePathToFile = (folderPath, path) => {
    if (!fs.existsSync(`${folderPath}/paths`))
        fs.mkdirSync(`${folderPath}/paths`);
    fs.writeFile(`${folderPath}/paths/${path.name}.json`, JSON.stringify(path), () => { });
}

export const deletePathFile = (folderPath, pathName) => {
    fs.unlink(`${folderPath}/paths/${pathName}.json`, () => { });
}

export const renamePathFile = (folderPath, oldName, pathName) => {
    fs.rename(`${folderPath}/paths/${oldName}.json`, `${folderPath}/paths/${pathName}.json`, () => { });
}

export const saveProjectFile = (folderPath, projectFile) => {
    fs.writeFile(`${folderPath}/PathGenerator.json`, JSON.stringify(projectFile), () => { });
}

export const savePathToCSV = (folderPath, path, pathName, isInReverse, callback) => {
    fs.writeFile(`${folderPath}/${pathName}.csv`, pathToCSV(path, isInReverse), () => {
        callback();
    });
}

function pathToCSV(path, isInReverse) {
    var csv = "Left Position,Right Position,Left Velocity,Right Velocity,Left Acc,Right Acc,Angle,X,Y, \n";
    if (path.isTurnInPlace)
        csv += turnInPlaceCSV(path);
    else
        csv += tankPathCSV(path, isInReverse);
    return csv;
}

function turnInPlaceCSV(path) {
    var csv = "";
    const way = path.turnWay;
    for (let i = 0; i < path.sourceSetpoints.length; i++) {
        const right = path.rightSetpoints[i];
        const left = path.leftSetpoints[i];
        const source = path.sourceSetpoints[i];
        const x = path.sourceSetpoints[0].x;
        const y = path.sourceSetpoints[0].y;
        const angle = Number(r2d(source.position / path.pathConfig.width * 2) * path.turnWay) + path.turnStartAngle;

        csv += `${left.position * way},${right.position * -way},`;
        csv += `${left.velocity * way},${right.velocity * -way},`;
        csv += `${left.acceleration * way},${right.acceleration * -way},`;
        csv += `${angle},${x},${y},\n`;
    }
    return csv;
}

function tankPathCSV(path, isInReverse) {
    var csv = "";
    const way = isInReverse ? -1 : 1;
    for (let i = 0; i < path.sourceSetpoints.length; i++) {
        const right = isInReverse ? path.leftSetpoints[i] : path.rightSetpoints[i];
        const left = isInReverse ? path.rightSetpoints[i] : path.leftSetpoints[i];
        const source = path.sourceSetpoints[i];
        const x = source.x;
        const y = source.y;
        const angleR = isInReverse ? right.position - left.position : left.position - right.position;
        const angleD = Number(path.waypoints[0].angle) + r2d(angleR) / Number(path.pathConfig.width);

        csv += `${left.position * way},${right.position * way},`;
        csv += `${left.velocity * way},${right.velocity * way},`;
        csv += `${left.acceleration * way},${right.acceleration * way},`;
        csv += `${angleD},${x},${y},\n`;
    }
    return csv;
}

export const saveProjectFolderPath = folderPath => {
    ipcRenderer.invoke('SetCookieProjctPath', folderPath);
}