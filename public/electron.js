const ipcHandles = require('./electron-ipc-handles');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const electron = require('electron');
const path = require('path');

const BrowserWindow = electron.BrowserWindow;
let mainWindow = undefined;
const app = electron.app;

function createWindow() {
	if (mainWindow !== undefined) return;
	mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true, webSecurity: false } });
	mainWindow.setMenuBarVisibility(false);
	mainWindow.maximize();
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.on('closed', () => (mainWindow = undefined));
	autoUpdater.autoInstallOnAppQuit = false;
	autoUpdater.checkForUpdates();
	ipcHandles.set(mainWindow);
}

function closeWindow() {
	if (process.platform !== 'darwin') app.quit();
}

app.on('ready', createWindow);
app.on('window-all-closed', closeWindow);
app.on('activate', createWindow);
