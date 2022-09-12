const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    renderMd: (content) => ipcRenderer.invoke('context:render', content)
})
