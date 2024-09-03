import { ErroDeDominio } from "./ErroUtil";

export default class Preco {
  readonly valor: number;
  constructor(valor: number) {
    if (valor >= 0) {
      this.valor = valor;
    } else {
      const msg = "não pode ser negativo";
      throw new ErroDeDominio(msg);
    }
  }

  toString(): string {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(this.valor);
  }
}
