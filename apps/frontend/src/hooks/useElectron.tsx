"use client"
import { EditarItem, EditarMilitar, ExcluirItem, ExcluirMilitar, FecharCautela, LivroProps, NovaCautela, NovoLivro, NovoMilitar, ObterLivro, RepositorioLivro } from "cautelas"
import NovoItem from "cautelas/dist/useCases/NovoItem"

export interface electronAPI {
    abrirLivro(): Promise<LivroProps | undefined>,
    novoLivro(livro:LivroProps): Promise<LivroProps | undefined>,
    salvarLivro(livro: LivroProps): Promise<LivroProps>
}

export function useElectron() {
    const api = (window as any).electronAPI as electronAPI
    const repo:RepositorioLivro = {
       salvar: livro => api.salvarLivro(livro),
       obter: () => api.abrirLivro(),
       novo: livro => api.novoLivro(livro)
    }
    const novaCautela = new NovaCautela(repo)
    const fecharCautela = new FecharCautela(repo)

    const novoLivro = new NovoLivro(repo)
    const abrirLivro = new ObterLivro(repo)
    
    const novoItem = new NovoItem(repo)
    const excluirItem = new ExcluirItem(repo)
    const editarItem = new EditarItem(repo)

    const novoMilitar = new NovoMilitar(repo)
    const excluirMilitar = new ExcluirMilitar(repo)
    const editarMilitar = new EditarMilitar(repo)

    return {
        novaCautela,
        fecharCautela,
        novoItem,
        editarItem,
        excluirItem,
        novoMilitar,
        editarMilitar,
        excluirMilitar,
        novoLivro,
        abrirLivro
    }
}