const ipcRenderer = window.require('electron').ipcRenderer;

export const saveProjectFolderPath = async folderPath => {
    ipcRenderer.invoke('UpdateProjctPath', folderPath);
}

export const getProjectFolderPath = async () => {
    return await ipcRenderer.invoke('GetProjctPath');
}

export const getAppVersion = async () => {
    return await ipcRenderer.invoke('GetAppVersion');
}