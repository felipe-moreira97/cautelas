import { CasoDeUso, Militar } from "common";
import { Livro } from "../model";

type Entrada = {
  militar: Militar;
  livro: Livro;
};

export default class EditarMilitar implements CasoDeUso<Entrada, Livro> {
  constructor() { }
  async executar(entrada: Entrada): Promise<Livro> {
    return entrada.livro.editarMilitar(entrada.militar)
  }
}