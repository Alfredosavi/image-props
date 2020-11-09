const { app, BrowserWindow, ipcMain } = require("electron");
var isDev = process.env.APP_DEV ? process.env.APP_DEV.trim() == "true" : false;

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}

const sizeOf = require("image-size");

let mainWindow;
app.allowRendererProcessReuse = true;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 550,
    height: 400,
    resizable: false,
    icon: __dirname + "/Icon/icon.png",
  });
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  mainWindow.removeMenu();
});

ipcMain.on("dimensoes", (event, path) => {
  sizeOf(path, (err, dimensions) => {
    mainWindow.webContents.send("dimensoesImage", dimensions);
  });
});
