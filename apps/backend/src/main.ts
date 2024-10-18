import { app, BrowserWindow, ipcMain, protocol } from "electron";
import path from "path";
import express from "express"
import HandlerLivroArquivo from "./HandlerLivroArquivo";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadURL('http://localhost:3000')
}

const handler = new HandlerLivroArquivo();
const server =express()
const url = path.join(__dirname, "dist")
const port = 3000
server.use(express.static(url,{
  extensions:['html','css','js','svg']
}))
server.use('/_next', express.static(path.join(__dirname, 'dist','_next')))
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

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
