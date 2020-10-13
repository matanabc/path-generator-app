const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.maximize();
  mainWindow.setResizable(false);
  mainWindow.setMenuBarVisibility(false);
  const _url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(_url);
  mainWindow.on('closed', () => mainWindow = null);

  // const coockies = mainWindow.webContents.session.cookies;
  // coockies.set({url:_url, name: "filed config", value: "{}", expirationDate: 999999999999})
  // coockies.set({url:_url, name: "robot config", value: "{}", expirationDate: 999999999999})
  // coockies.set({url:_url, name: "paths", value: "[]", expirationDate: 999999999999})
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