import { r2d } from "./path-generator/util";
import coockies from 'js-cookie';
const fs = window.require('fs');
const PROJECT_FOLDER = "projectFolder"

function loadFieldImage(folderPath, imageName, callback) {
    fs.readFile(`${folderPath}/${imageName}`, function (err, data) {
        if (!err)
            callback(URL.createObjectURL(new Blob([data])));
    });
}

function loadPaths(folderPath, callback) {
    fs.readdir(`${folderPath}/paths`, (err, files) => {
        if (err) return;
        files.forEach(file => {
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
    fs.writeFile(`${folderPath}/paths/${path.name}.json`, JSON.stringify(path), () => { });
}

export const deletePathFile = (folderPath, pathName) => {
    fs.unlink(`${folderPath}/paths/${pathName}.json`, () => { });
}

export const renamePathFile = (folderPath, oldName, pathName) => {
    fs.rename(`${folderPath}/paths/${oldName}.json`, `${folderPath}/paths/${pathName}.json`, () => { });
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

export const saveCSV = (path, pathName) => {
    if (path === undefined || pathName === undefined) return;
    const csv = pathToCSV(path);
    const blob = new Blob([csv], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = pathName + '.csv';
    link.href = url;
    link.click();
}

export const saveProjectFile = (projectFile) => {
    const blob = new Blob([JSON.stringify(projectFile)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'PathGenerator.json';
    link.href = url;
    link.click();
}

// fs.writeFile('/home/user/Desktop/PathGenerator/nodejs/test.txt', 'This is my text', function (err) {
//   if (err) throw err;
//   console.log('Replaced!');
// }); 