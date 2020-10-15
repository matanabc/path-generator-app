import { r2d } from "./path-generator/util";
import coockies from 'js-cookie';
const fs = window.require('fs');
const PROJECT_FOLDER = "projectFolder"

function loadFieldImage(folderPath, imageName, callback) {
    fs.readFile(`${folderPath}/${imageName}`, function (err, data) {
        if (!err)
            callback(URL.createObjectURL(new Blob([data])), imageName);
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
    const folderPath = coockies.get(PROJECT_FOLDER);
    projetcFolderCallback(folderPath);
    if (folderPath)
        fs.readFile(`${folderPath}/PathGenerator.json`, (err, data) => {
            if (err) return;
            const projectFile = JSON.parse(data);
            loadFieldImage(folderPath, projectFile.fieldImage, filedImageCallback);
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

export const savePathToCSV = (folderPath, path, pathName) => {
    fs.writeFile(`${folderPath}/${pathName}.csv`, pathToCSV(path), () => { });
}

function pathToCSV(path) {
    var csv = "Left Position,Right Position,Left Velocity,Right Velocity,Left Acc,Right Acc,Angle,X,Y \n";
    for (let i = 0; i < path.sourceSetpoints.length; i++) {
        const left = path.leftSetpoints[i];
        const right = path.rightSetpoints[i];
        const source = path.sourceSetpoints[i];
        const angleR = left.position - right.position;
        const angleD = r2d(angleR) / path.robotConfig.width;
        csv += `${left.position},${right.position},`;
        csv += `${left.velocity},${right.velocity},`;
        csv += `${left.acceleration},${right.acceleration},`;
        csv += `${angleD},${source.x},${source.y},\n`;
    }
    return csv;
}

export const saveProjectFolderPath = folderPath => {
    coockies.set(PROJECT_FOLDER, folderPath, { expires: 999999 });
}