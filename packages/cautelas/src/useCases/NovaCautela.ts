import { CasoDeUso, Militar } from "common";
import { Livro, Item, Material } from "../model";

type Entrada = {
  livro: Livro;
  itens: Item[];
  materiais: Material[]
};

export default class NovaCautela implements CasoDeUso<Entrada, Livro, Militar> {
  constructor() { }
  async executar(entrada: Entrada, usuario: Militar): Promise<Livro> {
    return entrada.livro.novaCautela(usuario, entrada.itens, entrada.materiais)
  }
}

