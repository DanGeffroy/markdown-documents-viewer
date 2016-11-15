'use strict';

const {BrowserWindow, dialog, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

class DocumentsWindowManager {
  constructor() {
    this.documentWindows = []
  }

  openNewFile() {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {name: 'Markdown', extensions: ['md', 'markdown']},
        {name: 'Text file', extensions: ['txt']},
        {name: 'All Files', extensions: ['*']}
      ]
    }, (filePaths) => {
      if (filePaths) {
        filePaths.forEach((path) => {
          this.createNewWindow(path)
        })
      }
    })
  }

  createNewWindow(filePath) {
    const newDocWindow = new BrowserWindow({
      width: 1082,
      height: 655,
      show: false,
      title: path.parse(filePath).base,
      webPreferences: {
        scrollBounce: true
      }
    })

    newDocWindow.setRepresentedFilename(filePath)

    newDocWindow.once('ready-to-show', () => {
      newDocWindow.show()
    })

    newDocWindow.on('enter-full-screen', () => {
      newDocWindow.send('fullscreen', true)
    })

    newDocWindow.on('leave-full-screen', () => {
      newDocWindow.send('fullscreen', false)
    })

    newDocWindow.on('closed', () => {
      let index = this.documentWindows.indexOf(newDocWindow)
      if (index > -1) {
        this.documentWindows.splice(index, 1);
      }
    })

    newDocWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../views/document.html'),
      protocol: 'file:',
      slashes: true,
      search: filePath
    }))

    this.documentWindows.push(newDocWindow);
  }

  hasOpenedDocuments() {
    return this.documentWindows.length > 0
  }
}

module.exports = DocumentsWindowManager;
