import ErroUtil, { ErroDeDominio } from "./ErroUtil";

export default class SenhaHash {
  constructor(
    readonly valor: string,
    atributo?: string,
    objeto?: string,
  ) {
    if (!SenhaHash.isValida(valor)) {
      throw new ErroDeDominio(
        ErroUtil.msgPadrao("não é um hash válido", atributo, objeto),
      );
    }
  }

  static isValida(hash: string): boolean {
    const regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/;
    return regex.test(hash);
  }
}
