import { Entidade, EntidadeProps, ErroDeDominio, Id } from "common";
import Item, { ItemProps } from "./Item";
import Itens from "./Itens";
import Cautela, { CautelaProps } from "./Cautela";
import Militar from "./Militar";

export interface LivroProps extends EntidadeProps {
    itens: ItemProps[],
    cautelas: CautelaProps[],
}

export default class Livro extends Entidade<Livro, LivroProps> {
    readonly itens: Itens
    readonly cautelas: Cautela[]

    constructor(props: LivroProps) {
        super(props)
        this.itens = new Itens(props.itens)
        this.cautelas = props.cautelas.map(c => new Cautela(c))
    }

    get cautelados() {
        throw new Error('metodo nao implementado')
    }

    get disponiveis() {
        throw new Error('metodo nao implementado')
    }

    novaCautela(militar: Militar, ...itens: Item[]): Livro {
        const IdItens = itens.map(Itens.IdItem)
        const contidos = this.itens.todos.filter(i => IdItens.includes(i.id.valor))
        if (contidos.length === IdItens.length) {
            const TodosItensCautelados = this.cautelas
                .filter(c => c.cautelado)
                .flatMap(c => c.itens)
            const itensCautelados = TodosItensCautelados.filter(i => IdItens.includes(i.id.valor))
            if (itensCautelados.length === 0) {
                return this.clone({
                    ...this.props,
                    cautelas: [
                        ...this.cautelas.map(c => c.props),
                        new Cautela({
                            itens: itens.map(i => i.props),
                            militar: militar.props
                        }).props
                    ]
                })
            }
            const msg = itensCautelados.map(i => i.categoria.nome.completo).join(", ")
            throw new ErroDeDominio(`Item já cautelado ${msg}`)
        }
        const naoContidos = itens.filter(i => !contidos.map(Itens.IdItem).includes(i.id.valor))
        const msg = naoContidos.map(i => i.categoria.nome.completo).join(", ")
        throw new ErroDeDominio(`Item não existente ${msg}`)
    }

    fecharCautela(cautela: Cautela | Id | string): Livro {
        const IdCautela = this.IdCautela(cautela)
        const caut = this.cautelas.find(c => c.id.valor === IdCautela)
        if (caut) {
            const cautelas = this.cautelas.filter(c => c.id.valor !== IdCautela).map(c => c.props)
            return this.clone({ ...this.props, cautelas: [...cautelas, caut.descautelar().props] })
        }
        throw new ErroDeDominio('Cautela inexistente')
    }

    inserirItem(item: Item): Livro {
        if (!this.itens.contem(item)) {
            return this.clone({
                ...this.props,
                itens: this.itens.incluir(item.props).props
            })
        }
        throw new ErroDeDominio('Item já incluído')
    }

    removerItem(item: Item | Id | string): Livro {
        if (this.itens.contem(item)) {
            const todosItensCautelados = this.cautelas
                .filter(c => c.cautelado)
                .flatMap(c => c.itens)
            if (!todosItensCautelados.map(Itens.IdItem).includes(Itens.IdItem(item))) {
                return this.clone({
                    ...this.props,
                    itens: this.itens.excluir(item).props
                })
            }
            throw new ErroDeDominio('O item está cautelado')
        }
        return this
    }

    private IdCautela(cautela: Cautela | Id | string): string {
        return cautela instanceof Cautela ?
            cautela.id.valor :
            cautela instanceof Id ?
                cautela.valor :
                cautela
    }

}