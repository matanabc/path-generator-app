const { autoUpdater } = require('electron-updater');

module.exports.createUpdater = (window) => {
	autoUpdater.on('update-downloaded', (info) => window.webContents.send('update-downloaded', info));
	autoUpdater.autoInstallOnAppQuit = false;
	autoUpdater.checkForUpdates();
};
