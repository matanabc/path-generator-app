const app = require('electron').app;

const { createWindow } = require('./window');

app.on('ready', createWindow);
app.on('activate', createWindow);
app.on('window-all-closed', app.quit);
