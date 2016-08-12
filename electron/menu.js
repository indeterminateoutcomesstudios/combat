/* eslint-env node */

const electron = require('electron');
const { app, Menu, shell } = electron;

const menu = [
  {
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
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
      { role: 'selectall' },
      { type: 'separator' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: `Report an Issue...`,
        click() { shell.openExternal('https://github.com/magic-stash/combat/issues/new'); }
      },
      { type: 'separator' },
      {
        label: 'Welcome Guide',
        click(item, browserWindow) {
          if (browserWindow) {
            browserWindow.webContents.send('show:welcome');
          }
        }
      },
    ]
  }
];

module.exports = Menu.buildFromTemplate(menu);
