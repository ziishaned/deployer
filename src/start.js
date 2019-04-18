const url = require('url');
const path = require('path');
const { app, BrowserWindow } = require('electron');

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
      webPreferences: {webSecurity: false}
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  const {
    REACT_DEVELOPER_TOOLS,
    default: installExtension,
  } = require('electron-devtools-installer');


  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    installExtension(REACT_DEVELOPER_TOOLS).then(name => {
      console.log(`Added Extension: ${name}`);
    }).catch(err => {
      console.log('An error occurred: ', err);
    });
  }

  mainWindow.webContents.openDevTools();

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
