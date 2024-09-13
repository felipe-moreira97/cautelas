import { Livro } from "cautelas";
import { contextBridge, ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld("electronAPI", {
  abrirLivro: () => ipcRenderer.invoke("abrirLivro"),
  novoLivro: () => ipcRenderer.invoke("novoLivro"),
  salvarLivro: (livro: Livro) => ipcRenderer.invoke("salvarLivro", livro),
});
