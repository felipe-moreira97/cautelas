"use client"
import { Cautela, EditarItem, EditarMilitar, ExcluirItem, ExcluirMilitar, FecharCautela, Item, ItemProps, Livro, LivroProps, NovaCautela, NovoLivro, NovoMilitar, ObterLivro, RepositorioLivro, SalvarLivro } from "cautelas"
import NovoItem from "cautelas/dist/useCases/NovoItem"
import { Militar, MilitarProps } from "common"

export interface electronAPI {
    abrirLivro(): Promise<LivroProps | undefined>,
    novoLivro(livro: LivroProps): Promise<LivroProps | undefined>,
    salvarLivro(livro: LivroProps): Promise<LivroProps>
}

export function useElectron() {
    const api = (window as any).electronAPI as electronAPI
    const repo: RepositorioLivro = {
        salvar: livro => api.salvarLivro(livro),
        obter: () => api.abrirLivro(),
        novo: livro => api.novoLivro(livro)
    }

    const salvarLivro = new SalvarLivro(repo)
    const novoLivro = new NovoLivro(repo)
    const abrirLivro = new ObterLivro(repo)

    const novaCautela = async ({ livro, itens, militar }: {
        livro: Livro,
        itens: Item[],
        militar: Militar
    }) => new NovaCautela().executar({
        itens, livro
    }, militar).then(livro => salvarLivro.executar(livro))

    const fecharCautela = async ({ cautela, livro }: {
        livro: Livro,
        cautela: Cautela
    }) => new FecharCautela().executar({
        cautela, livro
    }).then(livro => salvarLivro.executar(livro))


    const novoItem = async ({ livro, itemProps }: {
        livro: Livro,
        itemProps: ItemProps
    }) => {
        const item = new Item(itemProps)
        return new NovoItem().executar({
            item,
            livro
        }).then(livro => salvarLivro.executar(livro))
    }

    const editarItem = async ({ livro, itemProps }: {
        livro: Livro,
        itemProps: ItemProps
    }) => {
        const item = new Item(itemProps)
        return new EditarItem().executar({
            item,
            livro
        }).then(livro => salvarLivro.executar(livro))
    }

    const excluirItem = async ({ livro, item }: {
        livro: Livro,
        item: Item
    }) => {
        return new ExcluirItem().executar({
            item,
            livro
        }).then(livro => salvarLivro.executar(livro))
    }


    const novoMilitar = async ({ livro, militarProps }: {
        livro: Livro,
        militarProps: MilitarProps
    }) => {
        const militar = new Militar(militarProps)
        return new NovoMilitar().executar({
            livro,
            militar
        }).then(livro => salvarLivro.executar(livro))
    }

    const editarMilitar = async ({ livro, militarProps }: {
        livro: Livro,
        militarProps: MilitarProps
    }) => {
        const militar = new Militar(militarProps)
        return new EditarMilitar().executar({
            livro,
            militar
        }).then(livro => salvarLivro.executar(livro))
    }

    const excluirMilitar = async ({ livro, militar }: {
        livro: Livro,
        militar: Militar
    }) => {
        return new ExcluirMilitar().executar({
            livro,
            militar
        }).then(livro => salvarLivro.executar(livro))
    }

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