const ipcMain = require('electron').ipcMain;
const Store = require('electron-store');
const app = require('electron').app;

const store = new Store();

module.exports.createIPCHandles = () => {
	ipcMain.handle('saveInStore', async (_, key, value) => store.set(key, value));
	ipcMain.handle('loadFromStore', async (_, key, defaultValue) => store.get(key, defaultValue));

	ipcMain.handle('getAppVersion', async () => app.getVersion());
	ipcMain.handle('updateApp', async () => autoUpdater.quitAndInstall());
};
