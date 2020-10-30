const electron = require('electron');
const ipcMain = require('electron').ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true, webSecurity: false } });
  mainWindow.maximize();
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(url);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('SetCookieProjctPath', async (event, arg) => {
  electron.session.defaultSession.cookies.set({
    url: url,
    expirationDate: 999999999999,
    name: 'project_path',
    value: arg,
  });
});