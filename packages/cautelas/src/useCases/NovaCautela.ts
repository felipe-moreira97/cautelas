import { CasoDeUso, Militar } from "common";
import { Livro, Item } from "../model";

type Entrada = {
  livro: Livro;
  itens: Item[];
};

export default class NovaCautela implements CasoDeUso<Entrada, Livro, Militar> {
  async executar(entrada: Entrada, usuario: Militar): Promise<Livro> {
    return entrada.livro.novaCautela(usuario, ...entrada.itens);
  }
}
