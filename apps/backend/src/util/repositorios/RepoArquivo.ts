import { RepositorioMilitar } from "auth";
import { RepositorioLivro, LivroProps } from "cautelas";
import { Militar } from "common";
import * as fs from "fs/promises";

export default class RepoArquivo implements RepositorioLivro, RepositorioMilitar {
  constructor(private caminhoArquivo: string) {}
  obterMilitarPorCpf(cpf: string): Promise<Militar> {
    throw new Error("Method not implemented.");
  }
  cadastrarMilitar(militar: Militar): Promise<Militar> {
    throw new Error("Method not implemented.");
  }
  async obter(): Promise<LivroProps> {
    return fs
      .readFile(this.caminhoArquivo, { encoding: "utf8" })
      .then((string) => JSON.parse(string).livro);
  }
  async salvar(livro: LivroProps): Promise<LivroProps> {
    const militares = await this.obterMilitares()
    return fs
      .writeFile(this.caminhoArquivo, JSON.stringify({ livro, militares}))
      .then(() => livro);
  }
  private async obterMilitares():Promise<Militar[]> {
    return fs
    .readFile(this.caminhoArquivo, { encoding: "utf8" })
    .then((string) => JSON.parse(string).militares);
  }
}
