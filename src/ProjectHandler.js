import { r2d } from "./path-generator/util";
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
    const folderPath = `${os.homedir()}/PathGenerator`;
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
    for (let i = 0; i < path.sourceSetpoints.length; i++) {
        const right = isInReverse ? path.leftSetpoints[i] : path.rightSetpoints[i];
        const left = isInReverse ? path.rightSetpoints[i] : path.leftSetpoints[i];
        const source = path.sourceSetpoints[i];
        const angleR = isInReverse ? right.position - left.position : left.position - right.position;
        const angleD = path.waypoints[0].angle + (r2d(angleR) / path.pathConfig.width);
        csv += `${left.position},${right.position},`;
        csv += `${left.velocity},${right.velocity},`;
        csv += `${left.acceleration},${right.acceleration},`;
        csv += `${angleD},${source.x},${source.y},\n`;
    }
    return csv;
}

export const saveProjectFolderPath = folderPath => {
    // coockies.set(PROJECT_FOLDER, folderPath, { expires: 999999 });
}