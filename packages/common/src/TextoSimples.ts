import ErroUtil from "./ErroUtil"

export default class TextoSimles {
    constructor(
        readonly completo: string,
        minimo: number,
        maximo: number,
        atributo?: string,
        objeto?: string,
    ) {
        this.completo = completo?.trim() ?? ""

        const erros = []

        if (!completo) {
            erros.push(ErroUtil.msgPadrao("não pode ser vazio", atributo, objeto))
        }

        if (completo!.length < minimo) {
            erros.push(
                ErroUtil.msgPadrao(
                    `deve ter no mínimo ${minimo} caracteres`,
                    atributo,
                    objeto,
                ),
            )
        }

        if (completo!.length > maximo) {
            erros.push(
                ErroUtil.msgPadrao(
                    `deve ter no máximo ${maximo} caracteres`,
                    atributo,
                    objeto,
                ),
            )
        }

        if (erros.length > 0) {
            throw new Error(erros.join("\n"))
        }
    }
}