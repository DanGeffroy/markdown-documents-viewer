'use strict';

const {BrowserWindow, dialog, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

let documentWindows = []

const documentsManager = {
  /**
   * Shows the OpenFileDialog and creates a new DocumentWindow.
   */
  'openNewFile': function () {
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
  },
  /**
   * Creates a nex DocumentWindow for the file specified.
   */
  'createNewWindow': function (filePath) {
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
      let index = documentWindows.indexOf(newDocWindow)
      if (index > -1) {
        documentWindows.splice(index, 1);
      }
    })

    newDocWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../windows/views/document.html'),
      protocol: 'file:',
      slashes: true,
      search: filePath
    }))

    documentWindows.push(newDocWindow);
  },
  /**
   * Returns true if documents are openned.
   */
  'hasOpenedDocuments': function() {
    return documentWindows.length > 0
  }
}

module.exports = documentsManager;
