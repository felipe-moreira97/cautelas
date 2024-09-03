import { Id } from "common";
import Categoria from "./Categoria";
import Item, { ItemProps } from "./Item";




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

    incluir(item: ItemProps): Itens {
        const itens = [...this.props]
        itens.push(item)
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