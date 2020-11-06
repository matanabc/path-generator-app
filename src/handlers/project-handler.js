import { getProjectFolderPath, saveProjectFolderPath, getAppVersion } from "./electron-handler";
import { pathToCSV } from "./csv-handler";

const fs = window.require('fs');

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

export const loadProjectFile = async (callback, projetcFolderCallback, filedImageCallback, loadPathsCallback) => {
    const folderPath = await getProjectFolderPath();
    projetcFolderCallback(folderPath);
    if (folderPath)
        fs.readFile(`${folderPath}/PathGenerator.json`, async (err, data) => {
            if (err) return;
            const projectFile = JSON.parse(data);
            projectFile.version = await getAppVersion();
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

export const updateProjectFolderPath = saveProjectFolderPath;