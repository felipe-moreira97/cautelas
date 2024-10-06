import { CasoDeUso } from "common";
import { Livro, Cautela } from "../model";

type Entrada = {
  livro: Livro;
  cautela: Cautela;
};

export default class NovaCautela implements CasoDeUso<Entrada, Livro> {
  constructor() { }
  async executar(entrada: Entrada): Promise<Livro> {
    return entrada.livro.fecharCautela(entrada.cautela)
  }
}
