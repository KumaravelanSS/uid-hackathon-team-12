const {app,BrowserWindow} = require('electron');

function createwindow(){
    const win = new BrowserWindow({
        width:900,
        height:700,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    });
    win.loadFile('index.html');
}
app.whenReady().then(createwindow);