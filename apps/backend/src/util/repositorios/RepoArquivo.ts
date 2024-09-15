import { RepositorioMilitar } from "auth";
import { RepositorioLivro, LivroProps } from "cautelas";
import { MilitarProps } from "common";
import * as fs from "fs/promises";
import { existsSync } from "original-fs";

export default class RepoArquivo implements RepositorioLivro, RepositorioMilitar {
  constructor(private caminhoArquivo: string) { }
  async obterMilitarPorCpf(cpf: string): Promise<MilitarProps> {
    const militares = await this.obterMilitares()
    const militar = militares.find(m => m.cpf === cpf)
    if (!militar) throw new Error("Militar não encontrado")
    return militar
  }
  async cadastrarMilitar(militar: MilitarProps): Promise<MilitarProps> {
    const livro = await this.obter()
    const militares = await this.obterMilitares()
    militares.push(militar)
    return fs
      .writeFile(this.caminhoArquivo, JSON.stringify({ livro, militares }))
      .then(() => militar)
  }

  async obter(): Promise<LivroProps> {
    return fs
      .readFile(this.caminhoArquivo, { encoding: "utf8" })
      .then((string) => JSON.parse(string).livro);
  }
  async salvar(livro: LivroProps): Promise<LivroProps> {
    const militares = await this.obterMilitares()
    return fs
      .writeFile(this.caminhoArquivo, JSON.stringify({ livro, militares }))
      .then(() => livro);
  }
  async obterMilitares(): Promise<MilitarProps[]> {
    if (!existsSync(this.caminhoArquivo)) return []
    return fs
      .readFile(this.caminhoArquivo, { encoding: "utf8" })
      .then((string: string) => JSON.parse(string).militares)
  }
}
