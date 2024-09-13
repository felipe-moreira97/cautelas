import { CasoDeUso } from "common";
import { Item, Livro } from "../model";

type Entrada = {
  item: Item;
  livro: Livro;
};

export default class ExcluirItem implements CasoDeUso<Entrada, Livro> {
  async executar(entrada: Entrada): Promise<Livro> {
    return entrada.livro.removerItem(entrada.item);
  }
}
