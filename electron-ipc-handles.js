const { autoUpdater } = require('electron-updater');
const ipcMain = require('electron').ipcMain;
const Store = require('electron-store');
const app = require('electron').app;
const os = require('os');

const DEFAULT_PROJECT_FOLDER_PATH = `${os.homedir()}/PathGenerator`;
const PROJECT_FOLDER_PATH = "PROJECT_FOLDER_PATH";
const store = new Store();

module.exports.set = mainWindow => {
    ipcMain.handle('UpdateProjctPath', async (event, path) => {
        store.set(PROJECT_FOLDER_PATH, path);
    });

    ipcMain.handle('GetProjctPath', async (event, arg) => {
        return store.get(PROJECT_FOLDER_PATH, DEFAULT_PROJECT_FOLDER_PATH);
    });

    ipcMain.handle('GetAppVersion', async (event, arg) => {
        return app.getVersion();
    });

    ipcMain.handle('UpdateApp', async (event, arg) => {
        autoUpdater.quitAndInstall();
    });

    autoUpdater.on("update-downloaded", info => {
        mainWindow.webContents.send("update-downloaded", info);
    });
}