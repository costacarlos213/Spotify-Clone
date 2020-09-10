import {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} from "electron";
import * as fs from 'fs'
import * as path from 'path'


let mainWindow: Electron.BrowserWindow | null;
let newWindow: number

function createWindow() {
  // Create the browser window.electron
  mainWindow = new BrowserWindow({
    minHeight: 700,
    minWidth: 1200,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      webSecurity: false
    },
    width: 1280,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
ipcMain.on('open-file-dialog', async (event) => {
  if (mainWindow) {
    try {
      const { filePaths, canceled } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'multiSelections'],
        filters: [{
          name: 'Audio',
          extensions: ['mp3']
        }]
      })

      if (!canceled) event.sender.send('selected-file', filePaths)
    } catch (err) {
      console.log(err)
    }
  }
})

ipcMain.once('load-file-request', (event) => {
  const dir = path.join(__dirname, '../src/assets/musics/')
  let loadedFiles: Array<PlaylistSongProps> = [{name: ''}]

  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir)
    
    files.map(file => { 
      loadedFiles.push({
        name: path.basename(file, path.extname(file)),
        src: path.join(dir, file)
      })
    })

    loadedFiles.shift()

  } else {
    fs.mkdir(path.join(dir), (err) => console.log(err))
    loadedFiles.push({
      name: 'created-dir'
    })
  }
  event.sender.send('loaded-file', loadedFiles)
})

ipcMain.once('footer-load', (event) => {
  newWindow = event.sender.id
})

app.on("ready", async () => {
  await createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
