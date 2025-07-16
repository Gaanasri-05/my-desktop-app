const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const notesPath = path.join(__dirname, 'notes.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile('index.html');
}

ipcMain.on('save-notes', (event, notes) => {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
});

ipcMain.handle('load-notes', () => {
  if (fs.existsSync(notesPath)) {
    const data = fs.readFileSync(notesPath);
    return JSON.parse(data);
  }
  return [];
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});