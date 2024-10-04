import { CasoDeUso } from "common";
import RepositorioLivro from "../provider/RepositorioLivro";
import { Livro } from "../model";

export default class ObterLivro implements CasoDeUso<any, Livro | undefined> {
  constructor(private repo: RepositorioLivro) {}
  async executar(): Promise<Livro | undefined> {
    return this.repo.obter().then((l) =>  l && new Livro(l));
  }
}
