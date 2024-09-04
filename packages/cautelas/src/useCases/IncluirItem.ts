import { CasoDeUso } from "common";
import { ItemProps, Livro } from "../model";
import RepositorioLivro from "../provider/RepositorioLivro";


type Entrada = {
    item: ItemProps,
    livro: Livro
}

export default class IncluirItem implements CasoDeUso<Entrada, Livro> {
    constructor(private repo: RepositorioLivro) { }
    executar(entrada: Entrada): Promise<Livro> {
        const livro = entrada.livro.inserirItem(entrada.item)
        return this.repo.salvar(livro)
    }

}