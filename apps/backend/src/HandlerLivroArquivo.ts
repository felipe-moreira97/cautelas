import { LivroProps } from "cautelas";
import { app, dialog, Event } from "electron";
import path from "path";
import fs from "fs/promises";
import { existsSync, mkdirSync } from "original-fs";

export interface HandlerLivro {
  abrirLivro(): Promise<LivroProps | undefined>;
  novoLivro(event: Event, livro:LivroProps): Promise<LivroProps | undefined>;
  salvarLivro(event: Event, livro: LivroProps): Promise<LivroProps>;
}


export default class HandlerLivroArquivo implements HandlerLivro {
  static caminhoArquivo: string = "";
  static dataPath: string = path.join(app.getPath("userData"), "data");
  constructor() { }
  async abrirLivro(): Promise<LivroProps | undefined> {
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
      return fs
        .readFile(HandlerLivroArquivo.caminhoArquivo, { encoding: "utf8" })
        .then((string) => JSON.parse(string));
    }
  }

  async novoLivro(event: Event,livro:LivroProps): Promise<LivroProps | undefined> {
    if (!existsSync(HandlerLivroArquivo.dataPath))
      mkdirSync(HandlerLivroArquivo.dataPath);
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
    return fs
      .writeFile(HandlerLivroArquivo.caminhoArquivo, JSON.stringify(livro))
      .then(() =>  livro);
  }

  async salvarLivro(event: Event, livro: LivroProps): Promise<LivroProps> {
    return fs
      .writeFile(HandlerLivroArquivo.caminhoArquivo, JSON.stringify(livro))
      .then(() => livro);
  }

  static setCaminhoArquivo(valor: string) {
    HandlerLivroArquivo.caminhoArquivo = valor;
    if (!path.extname(HandlerLivroArquivo.caminhoArquivo).length) {
      HandlerLivroArquivo.caminhoArquivo =
        HandlerLivroArquivo.caminhoArquivo + ".json";
    }
  }
}
