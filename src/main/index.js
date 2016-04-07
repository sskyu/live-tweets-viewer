import electron, { app, BrowserWindow } from 'electron';
import dotenv from 'dotenv';

if (!dotenv.config()) {
  app.quit();
}

app.on('window-all-closed', () => {
  // TODO: multi platform
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

let mainWindow = null;
app.on('ready', () => {
  const electronScreen = electron.screen;
  const { size } = electronScreen.getPrimaryDisplay();
  mainWindow = new BrowserWindow({
    left: 0,
    top: 0,
    width: size.width,
    height: size.height,
    frame: false,
    show: false,
    transparent: true,
    resizable: false,
    'always-on-top': true
  });
  mainWindow.loadURL('file://' + __dirname + '/../templates/index.html');
  mainWindow.show();
  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
