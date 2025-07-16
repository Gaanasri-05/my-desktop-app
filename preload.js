const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('notesAPI', {
  saveNotes: (notes) => ipcRenderer.send('save-notes', notes),
  loadNotes: () => ipcRenderer.invoke('load-notes')
});
