import { LivroProps, NovoLivro } from "cautelas";
import { app, dialog, Event } from "electron";
import path from "path";
import fs from "fs/promises";
import { MilitarProps } from "common";
import { existsSync, mkdirSync } from "original-fs";

export interface HandlerLivro {
  abrirLivro(): Promise<Data | undefined>;
  novoLivro(): Promise<Data | undefined>;
  salvarLivro(event: Event, livro: Data): Promise<Data>;
}

export type Data = {
  livro: LivroProps,
  militares: MilitarProps[]
}

export default class HandlerLivroArquivo implements HandlerLivro {
  static caminhoArquivo: string = "";
  static dataPath: string = path.join(app.getPath("userData"), "data");
  constructor() { }
  async abrirLivro(): Promise<Data | undefined> {
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

  async novoLivro(): Promise<Data | undefined> {
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
    const livro = (await new NovoLivro().executar()).props;
    const militares = [] as MilitarProps[]
    return fs
      .writeFile(HandlerLivroArquivo.caminhoArquivo, JSON.stringify({ livro, militares }))
      .then(() => ({ livro, militares }));
  }

  async salvarLivro(event: Event, data: Data): Promise<Data> {
    return fs
      .writeFile(HandlerLivroArquivo.caminhoArquivo, JSON.stringify(data))
      .then(() => data);
  }

  static setCaminhoArquivo(valor: string) {
    HandlerLivroArquivo.caminhoArquivo = valor;
    if (!path.extname(HandlerLivroArquivo.caminhoArquivo).length) {
      HandlerLivroArquivo.caminhoArquivo =
        HandlerLivroArquivo.caminhoArquivo + ".json";
    }
  }
}
