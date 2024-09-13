import { CasoDeUso, Militar } from "common";
import { Livro } from "../model";

type Entrada = {};

export default class NovoLivro implements CasoDeUso<Entrada, Livro, Militar> {
  async executar(): Promise<Livro> {
    return new Livro({
      cautelas: [],
      itens: [],
    });
  }
}
