import { Livro } from "../model";

export default interface RepositorioLivro {
    salvar(livro: Livro): Promise<Livro>
}