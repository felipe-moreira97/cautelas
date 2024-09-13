import { CasoDeUso } from "common";
import RepositorioLivro from "../provider/RepositorioLivro";
import { Livro } from "../model";

export default class ObterLivro implements CasoDeUso<any, Livro> {
  constructor(private repo: RepositorioLivro) {}
  async executar(): Promise<Livro> {
    return this.repo.obter().then((l) => new Livro(l));
  }
}
