const { app, BrowserWindow } = require('electron');

const url = require('url');
const path = require('path');

let mainWindow;

function createWindow() {
  const defaultWidth = 478;
  const defaultHeight = 712;
  mainWindow = new BrowserWindow({ 
      width: defaultWidth,
      minWidth: defaultWidth,
      maxWidth: defaultWidth,
      height: defaultHeight,
      minHeight: defaultHeight,
      maxHeight: defaultHeight,
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});