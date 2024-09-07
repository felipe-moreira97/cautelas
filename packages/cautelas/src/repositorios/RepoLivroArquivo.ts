import { LivroProps } from "../model";
import RepositorioLivro from "../provider/RepositorioLivro";
import * as fs from 'fs/promises'

export default class RepoLivroArquivo implements RepositorioLivro {
    constructor(private caminhoArquivo: string) { }
    async obter(): Promise<LivroProps> {
        return fs.readFile(this.caminhoArquivo, { encoding: 'utf8' })
            .then(string => JSON.parse(string))
    }
    async salvar(livro: LivroProps): Promise<LivroProps> {
        return fs.writeFile(this.caminhoArquivo, JSON.stringify(livro))
            .then(() => livro)
    }
}