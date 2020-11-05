const ipcMain = require('electron').ipcMain;
const Store = require('electron-store');
const os = require('os');

const DEFAULT_PROJECT_FOLDER_PATH = `${os.homedir()}/PathGenerator`;
const PROJECT_FOLDER_PATH = "PROJECT_FOLDER_PATH";
const store = new Store();

ipcMain.handle('UpdateProjctPath', async (event, path) => {
    store.set(PROJECT_FOLDER_PATH, path);
});

ipcMain.handle('GetProjctPath', async (event, arg) => {
    return store.get(PROJECT_FOLDER_PATH, DEFAULT_PROJECT_FOLDER_PATH);
});