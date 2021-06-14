const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.setMenuBarVisibility(false)

  mainWindow.loadURL(path.join('file://', __dirname, 'public/index.html'));
});