import { CasoDeUso, Militar } from "common";
import { RepositorioLivro } from "../provider";
import { Livro } from "../model";

type Entrada = {
  militar: Militar;
  livro: Livro;
};

export default class ExcluirMilitar implements CasoDeUso<Entrada, Livro> {
  constructor(private repo: RepositorioLivro) {}
  async executar(entrada: Entrada): Promise<Livro> {
    return this.repo
      .salvar(entrada.livro.excluirMilitar(entrada.militar).props)
      .then((l) => new Livro(l));
  }
}