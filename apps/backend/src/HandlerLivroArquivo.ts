import { Livro, NovoLivro, ObterLivro, SalvarLivro } from "cautelas";
import { app, dialog, Event } from "electron";
import RepoLivroArquivo from "./util/repositorios/RepoArquivo";
import path from "path";
import fs from "fs";

export interface HandlerLivro {
  abrirLivro(): Promise<Livro | undefined>;
  novoLivro(): Promise<Livro | undefined>;
  salvarLivro(event: Event, livro: Livro): Promise<Livro>;
}

export default class HandlerLivroArquivo implements HandlerLivro {
  static caminhoArquivo: string = "";
  static dataPath: string = path.join(app.getPath("userData"), "data");
  constructor() {}
  async abrirLivro() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [
        {
          name: "json",
          extensions: ["json"],
        },
      ],
      buttonLabel: "Abrir",
      defaultPath: HandlerLivroArquivo.dataPath,
    });
    if (!canceled) {
      HandlerLivroArquivo.caminhoArquivo = filePaths[0]!;
      return new ObterLivro(
        new RepoLivroArquivo(HandlerLivroArquivo.caminhoArquivo),
      ).executar();
    }
  }

  async novoLivro() {
    if (!fs.existsSync(HandlerLivroArquivo.dataPath))
      fs.mkdirSync(HandlerLivroArquivo.dataPath);
    const { filePath, canceled } = await dialog.showSaveDialog({
      filters: [
        {
          name: "json",
          extensions: ["json"],
        },
      ],
      buttonLabel: "Novo",
      defaultPath: HandlerLivroArquivo.dataPath,
    });
    if (canceled) return;
    HandlerLivroArquivo.setCaminhoArquivo(filePath);
    const novoLivro = await new NovoLivro().executar();
    const repo = new RepoLivroArquivo(HandlerLivroArquivo.caminhoArquivo);
    return new SalvarLivro(repo).executar(novoLivro);
  }

  async salvarLivro(event: Event, livro: Livro): Promise<Livro> {
    const repo = new RepoLivroArquivo(HandlerLivroArquivo.caminhoArquivo);
    return new SalvarLivro(repo).executar(livro);
  }

  static setCaminhoArquivo(valor: string) {
    HandlerLivroArquivo.caminhoArquivo = valor;
    if (!path.extname(HandlerLivroArquivo.caminhoArquivo).length) {
      HandlerLivroArquivo.caminhoArquivo =
        HandlerLivroArquivo.caminhoArquivo + ".json";
    }
  }
}
