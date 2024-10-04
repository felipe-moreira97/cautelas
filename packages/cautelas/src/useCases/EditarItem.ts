import { CasoDeUso } from "common";
import { Item, Livro } from "../model";
import { RepositorioLivro } from "../provider";

type Entrada = {
  item: Item;
  livro: Livro;
};

export default class EditarItem implements CasoDeUso<Entrada, Livro> {
  constructor(private repo: RepositorioLivro) {}
  async executar(entrada: Entrada): Promise<Livro> {
    return this.repo
      .salvar(entrada.livro.editarItem(entrada.item).props)
      .then((l) => new Livro(l));
  }
}
