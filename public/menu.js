const { app, dialog, Menu, shell } = require('electron');

const isWindows = process.platform === 'win32';
const appVersion = app.getVersion();

/**
 * Sets the main menu
 * @param mainWindow
 */
function setMainMenu(mainWindow) {
  const template = [
    {
      label: isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog(function (fileNames) {
              if (!fileNames || !fileNames[0]) {
                return;
              }

              // For the file URLs, load them directly
              // Append the `file://` prefix otherwise
              const url = /^file:\/\/\//.test(fileNames[0]) ? fileNames[0] : `file://${fileNames[0]}`;
              mainWindow.loadURL(url);
            });
          }
        },
        { role: 'close' },
        { type: 'separator' },
        { role: 'quit' },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Detached Mode',
          accelerator: 'CmdOrCtrl+Shift+D',
          click() {
            app.dock && app.dock.setBadge('Detached');
            mainWindow.setIgnoreMouseEvents(true);
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Developer Tools',
          accelerator: 'CmdOrCtrl+Alt+I',
          click() {
            mainWindow.webContents.openDevTools();
          }
        },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin', accelerator: 'CmdOrCtrl+=' },
        { role: 'zoomout' },
        { type: 'separator' },
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Found a Bug',
          click() {
            shell.openExternal('https://github.com/ziishaned/deployer/issues/new');
          }
        },
        {
          label: 'Suggestions',
          click() {
            shell.openExternal('https://github.com/ziishaned/deployer/issues/new');
          }
        },
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://github.com/ziishaned');
          }
        },
        {
          label: `About Version`,
          click() {
            shell.openExternal(`https://github.com/ziishaned/deployer/releases/tag/v${appVersion}`);
          }
        },
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  setMainMenu
};
