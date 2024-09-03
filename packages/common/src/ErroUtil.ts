export default class ErroUtil {
  static msgPadrao(erro: string, atributo?: string, objeto?: string) {
    const msgAt = atributo && atributo.length > 0 ? ` para ${atributo}` : "";
    const msgObj = objeto && objeto.length > 0 ? ` em ${objeto}` : "";
    return `O valor informado${msgAt}${msgObj} ${erro}.`;
  }
}

export class ErroDeDominio extends Error {
  constructor(mensagem?: string) {
    const erro = mensagem || "Erro de domínio";
    super(erro);
  }
}
