import { v4 as uuid, validate } from "uuid";
import ErroUtil, { ErroDeDominio } from "./ErroUtil";

export default class Id {
  readonly valor: string;

  constructor(valor?: string, atributo?: string, objeto?: string) {
    this.valor = valor ?? uuid();
    if (!Id.isValido(this.valor)) {
      const msg = ErroUtil.msgPadrao("não é um id (uuid) válido", atributo, objeto);
      throw new ErroDeDominio(msg);
    }
  }

  static get novo() {
    return new Id();
  }

  igual(id: Id) {
    return this.valor === id.valor;
  }

  diferente(id: Id) {
    return this.valor !== id.valor;
  }

  static isValido(id: string): boolean {
    return validate(id);
  }
}
