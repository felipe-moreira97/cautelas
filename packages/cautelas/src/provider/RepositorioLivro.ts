import { LivroProps } from "../model";

export default interface RepositorioLivro {
    salvar(livro: LivroProps): Promise<LivroProps>
    obter(): Promise<LivroProps>
}