import { Id } from "common";
import Categoria, { CategoriaProps } from "./Categoria";
import Item, { ItemProps } from "./Item";

type ItensPorCategoria = {
    categoria:CategoriaProps,
    itens:ItemProps[]
}

export default class Itens {
    readonly todos: Item[]

    constructor(props: ItemProps[]) {
        this.todos = props.map(i => new Item(i))
    }

    get props(): ItemProps[] {
        return this.todos.map(i => i.props)
    }

    get length(): number {
        return this.todos.length
    }

    get categorias(): Categoria[] {
        return this.todos.reduce((listaCategoria,itemAtual) => {
            if (listaCategoria.map(this.IdCategoria).includes(itemAtual.categoria.id.valor)) {
                return listaCategoria
            } else {
                listaCategoria.push(itemAtual.categoria)
                return listaCategoria

            }
        },[] as Categoria[])
    }

    incluir(item: Item): Itens {
        const itens = [...this.props]
        itens.push(item.props)
        return new Itens(itens)
    }

    excluir(item: Item | Id | string): Itens {
        const ItemId = Itens.IdItem(item)
        return new Itens(this.props.filter(i => i.id !== ItemId))
    }

    contem(item: Item | Id | string): boolean {
        const ItemId = Itens.IdItem(item)
        return this.todos.some(i => i.id.valor === ItemId)
    }

    intersecaoCom(itens: Item[]):Itens {
        return new Itens(this.todos
            .filter(i => itens
                .map(Itens.IdItem)
                .includes(i.id.valor))
            .map(i => i.props)
        )
    }

    porCategoria(categoria: Categoria | Id | string): Item[] {
        const categoriaId = this.IdCategoria(categoria)
        return this.todos.filter(i => i.categoria.id.valor === categoriaId)
    }

    get porCategorias():ItensPorCategoria[] {
        const categorias = this.categorias
        return categorias.map(c => {
            const itens = this.porCategoria(c).map(i => i.props)
            return {
                categoria:c.props,
                itens
            }
        })
    }

    private IdCategoria(categoria: Categoria | Id | string): string {
        return categoria instanceof Categoria ?
            categoria.id.valor :
            categoria instanceof Id ?
                categoria.valor :
                categoria
    }

    static IdItem(item: Item | Id | string): string {
        return item instanceof Item ?
            item.id.valor :
            item instanceof Id ?
                item.valor :
                item
    }
}