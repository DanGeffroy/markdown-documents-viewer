'use strict';
const {app, Menu} = require('electron')

const appMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        role: 'open'
      },
      {
        label: 'Open from GitHub...',
        accelerator: 'CmdOrCtrl+G',
      },
      {
        label: 'Open recent',
        submenu: [
          {
            label: 'No recent files',
            enabled: false
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        label: 'Close'
      },
      {
        label: 'Close all documents'
      },
      {
        type: 'separator'
      },
      {
        label: 'Print'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo',
        enabled: false
      },
      {
        role: 'redo',
        enabled: false
      },
      {
        type: 'separator'
      },
      {
        role: 'cut',
        enabled: false
      },
      {
        role: 'copy'
      },
      {
        role: 'paste',
        enabled: false
      },
      {
        role: 'pasteandmatchstyle',
        enabled: false
      },
      {
        role: 'delete',
        enabled: false
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Developer',
        submenu: [
          {
            label: 'Reload window',
            accelerator: 'CmdOrCtrl+R',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload()
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.webContents.toggleDevTools()
            }
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  }
]

// If macOS
if (process.platform === 'darwin') {
  appMenuTemplate.unshift({
    label: app.getName(),
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Preferences...',
        accelerator: 'CmdOrCtrl+,'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Edit menu.
  appMenuTemplate[2].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  )
  // Window menu.
  appMenuTemplate[4].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
}

// If Windows or Linux
if (process.platform !== 'darwin') {
  // File menu
  appMenuTemplate[0].submenu.push({
    role: 'quit'
  });
}

module.exports = Menu.buildFromTemplate(appMenuTemplate)
