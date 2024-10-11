import ErroUtil, { ErroDeDominio } from "./ErroUtil";

export default class Quantidade {
  readonly valor: number;
  constructor(valor: number, atributo?: string, objeto?: string) {
    const erros = [];
    this.valor = valor;

    if (valor < 1) {
      erros.push(ErroUtil.msgPadrao("não pode ser negativo ou zero", atributo, objeto));
    }
    if (!Number.isInteger(valor)) {
      erros.push(ErroUtil.msgPadrao("não pode ser decimal", atributo, objeto));
    }
    if (erros.length > 0) {
      throw new ErroDeDominio(erros.join("\n"));
    }
  }
  maior(quantidade:Quantidade):boolean {
    return this.valor > quantidade.valor
  }
  menor(quantidade:Quantidade):boolean {
    return this.valor < quantidade.valor
  }
  igual(quantidade:Quantidade):boolean {
    return this.valor === quantidade.valor
  }
  maiorOuIgual(quantidade:Quantidade):boolean {
    return this.valor >= quantidade.valor
  }
  menorOuIgual(quantidade:Quantidade):boolean {
    return this.valor <= quantidade.valor
  }
}
