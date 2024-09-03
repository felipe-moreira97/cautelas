import ErroUtil, { ErroDeDominio } from "./ErroUtil";

export default class Quantidade {
  readonly valor: number;
  constructor(valor: number, atributo?: string, objeto?: string) {
    const erros = []
    this.valor = valor;

    if (valor < 0) {
      erros.push(ErroUtil.msgPadrao("não pode ser negativo", atributo, objeto))
    }
    if (!Number.isInteger(valor)) {
      erros.push(ErroUtil.msgPadrao("não pode ser decimal", atributo, objeto))
    }
    if (erros.length > 0) {
      throw new ErroDeDominio(erros.join("\n"));
    }
  }
}
