import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import express from "express"
import HandlerLivroArquivo from "./HandlerLivroArquivo";

const handler = new HandlerLivroArquivo();
const server = express()
const url = path.resolve(__dirname, "..", "build")
const _next = path.resolve(__dirname, "..", 'build', '_next')
server.use(express.static(url))
server.use('/_next', express.static(_next))
const port = 3000
server.listen(port, () => console.log(`serving on port ${port}`))

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadURL(`http://localhost:${port}`)
}

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
