import { CasoDeUso } from "common";
import { Livro, Item, Militar } from "../model";
import RepositorioLivro from "../provider/RepositorioLivro";

type Entrada = {
    livro: Livro,
    itens: Item[]
}

export default class NovaCautela implements CasoDeUso<Entrada, Livro, Militar> {
    constructor(private repo: RepositorioLivro) { }
    async executar(entrada: Entrada, usuario: Militar): Promise<Livro> {
        const livro = entrada.livro.novaCautela(usuario, ...entrada.itens)
        return this.repo.salvar(livro)
    }
}