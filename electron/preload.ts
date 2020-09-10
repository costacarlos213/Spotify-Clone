import * as fs from 'fs'
import * as path from 'path'
declare global {
    type PlaylistSongProps = {
        name: string,
        src?: string
    }; 

    interface Window {
        ipcRenderer: any
    }
}

window.ipcRenderer = require('electron').ipcRenderer;


// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// THIS is juts for TypeScript error
export {};
