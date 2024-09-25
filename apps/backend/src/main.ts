import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import HandlerLivroArquivo from "./HandlerLivroArquivo";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const indexHTML = path.join(__dirname, "index.html");
  // win.loadFile(indexHTML);
  win.loadURL('http://localhost:3000')
  win.webContents.openDevTools()
}
const handler = new HandlerLivroArquivo();

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("abrirLivro", handler.abrirLivro);
  ipcMain.handle("novoLivro", handler.novoLivro);
  ipcMain.handle("salvarLivro", handler.salvarLivro);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
