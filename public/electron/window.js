const isDev = require('electron-is-dev');
const electron = require('electron');
const path = require('path');

const { createUpdater } = require('./updater');
const { createIPCHandles } = require('./ipc');

let window = undefined;
const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../build/index.html')}`;

function getWindowOptions() {
	const preload = __dirname + '/preload.js';
	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
	const webPreferences = { preload, nodeIntegration: true, enableRemoteModule: true, contextIsolation: false };
	return { webPreferences, width, height, movable: false, resizable: false };
}

module.exports.createWindow = () => {
	if (window !== undefined) return;
	window = new electron.BrowserWindow(getWindowOptions());
	window.on('closed', () => (window = undefined));
	window.setMenuBarVisibility(false);
	window.loadURL(url);
	window.maximize();

	createUpdater(window);
	createIPCHandles();
};
