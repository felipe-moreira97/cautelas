import { CasoDeUso, Militar } from "common";
import { RepositorioLivro } from "../provider";
import { Livro } from "../model";

type Entrada = {
  militar: Militar;
  livro: Livro;
};

export default class NovoMilitar implements CasoDeUso<Entrada, Livro> {
  constructor() { }
  async executar(entrada: Entrada): Promise<Livro> {
    return entrada.livro.inserirMilitar(entrada.militar)
  }
}