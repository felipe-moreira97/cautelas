import { contextBridge, ipcRenderer } from "electron/renderer";
import { Data } from "./HandlerLivroArquivo";

contextBridge.exposeInMainWorld("electronAPI", {
  abrirLivro: () => ipcRenderer.invoke("abrirLivro"),
  novoLivro: () => ipcRenderer.invoke("novoLivro"),
  salvarLivro: (livro: Data) => ipcRenderer.invoke("salvarLivro", livro),
});
