import { CasoDeUso, Militar } from "common";
import { Livro } from "../model";

type Entrada = {
  militar: Militar;
  livro: Livro;
};

export default class ExcluirMilitar implements CasoDeUso<Entrada, Livro> {
  constructor() { }
  async executar(entrada: Entrada): Promise<Livro> {
    return entrada.livro.excluirMilitar(entrada.militar)
  }
}