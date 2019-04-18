const url = require('url');
const http = require('http');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const { app, BrowserWindow } = require('electron');

const { setMainMenu } = require('./menu');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Deployer',
    width: 478,
    height: 712,
    resizable: false,
    webPreferences: {
      plugins: true,
      webSecurity: false,
    },
  });

  const isDev = !!process.env.APP_URL;
  if (process.env.APP_URL) {
    mainWindow.loadURL(process.env.APP_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  // Open the dev tools only for dev
  // and when the flag is not set
  if (isDev && !process.env.DEV_TOOLS) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  setMainMenu(mainWindow);
}

function checkAndDownloadUpdate() {
  try {
    autoUpdater.checkForUpdatesAndNotify();
  } catch (e) {
    console.log(e.message);
  }
}

app.on('ready', () => {
  createWindow();
  checkAndDownloadUpdate();
  const server = http.createServer((request, response) => {
    let target_url = url.parse(request.url, true).query.url;

    if (target_url) {
      if (Array.isArray(target_url)) {
        target_url = target_url.pop();
      }
      mainWindow.webContents.send('url.requested', target_url);
    }

    response.writeHeader(200);
    response.end();
  });
  server.listen(6280, "0.0.0.0")
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
