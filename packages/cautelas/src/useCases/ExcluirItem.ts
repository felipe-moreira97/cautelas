import { CasoDeUso } from "common";
import { Item, Livro, Material } from "../model";

type Entrada = {
  item: Item | Material;
  livro: Livro;
};

export default class ExcluirItem implements CasoDeUso<Entrada, Livro> {
  constructor() { }
  async executar(entrada: Entrada): Promise<Livro> {
    return entrada.livro.removerItem(entrada.item)
  }
}
