import { CasoDeUso } from "common";
import { Livro } from "../model";
import RepositorioLivro from "../provider/RepositorioLivro";

export default class SalvarLivro implements CasoDeUso<Livro, Livro> {
  constructor(private repo: RepositorioLivro) {}
  async executar(livro: Livro): Promise<Livro> {
    const novoLivro = await this.repo
      .salvar(livro.props)
      .then((l) => new Livro(l));
    return novoLivro;
  }
}
