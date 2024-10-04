import { LivroProps } from "cautelas";
import { contextBridge, ipcRenderer } from "electron/renderer";


contextBridge.exposeInMainWorld("electronAPI", {
  abrirLivro: () => ipcRenderer.invoke("abrirLivro"),
  novoLivro: (livro: LivroProps) => ipcRenderer.invoke("novoLivro",livro),
  salvarLivro: (livro: LivroProps) => ipcRenderer.invoke("salvarLivro", livro),
});
