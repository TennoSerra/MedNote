const { app, BrowserWindow, ipcMain } = require('electron');
app.isPackaged || require('electron-reloader')(module)
const path = require('path');
const fs = require('fs');

let mainWindow;

const notesFilePath = path.join(app.getPath('userData'), 'notes.json');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(path.join('file://', __dirname, 'public/index.html'));
});

// IPC handlers for saving and loading notes
ipcMain.on('save-note', (event, note) => {
  console.log('Received save-note:', note);
  const notes = loadNotesFromFile();
  notes.push(note);
  saveNotesToFile(notes);
});

ipcMain.handle('load-notes', () => {
  const notes = loadNotesFromFile();
  console.log('Loaded notes from file:', notes);
  return notes;
});


function loadNotesFromFile() {
  try {
    const data = fs.readFileSync(notesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveNotesToFile(notes) {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}

