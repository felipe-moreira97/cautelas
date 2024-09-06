import { Entidade, EntidadeProps, ErroDeDominio, Id } from "common";
import Item, { ItemProps } from "./Item";
import Itens from "./Itens";
import Cautela, { CautelaProps } from "./Cautela";
import Militar from "./Militar";
import Cautelas from "./Cautelas";

export interface LivroProps extends EntidadeProps {
    itens: ItemProps[],
    cautelas: CautelaProps[],
}

export default class Livro extends Entidade<Livro, LivroProps> {
    readonly itens: Itens
    readonly cautelas: Cautelas

    constructor(props: LivroProps) {
        super(props)
        this.itens = new Itens(props.itens)
        this.cautelas = new Cautelas(props.cautelas)
    }

    get itensCautelados(): Itens {
        return this.cautelas.todosItens
    }

    get itensDisponiveis(): Itens {
        return new Itens(this.itens.todos
            .filter(i => !this.itensCautelados.todos
                .map(Itens.IdItem)
                .includes(i.id.valor))
            .map(i => i.props)
        )
    }

    novaCautela(militar: Militar, ...itens: Item[]): Livro {
        const contidos = this.itens.intersecaoCom(itens)
        if (contidos.length === itens.length) {
            const itensCautelados = this.itensCautelados.intersecaoCom(itens)
            if (itensCautelados.length === 0) {
                const novaCautela = new Cautela({
                    itens: itens.map(i => i.props),
                    militar: militar.props
                })
                return this.clone({
                    ...this.props,
                    cautelas: [
                        ...this.cautelas.props,
                        novaCautela.props
                    ]
                })
            }
            const msg = itensCautelados.todos.map(i => i.nome).join(", ")
            throw new ErroDeDominio(`Item já cautelado ${msg}`)
        }
        const naoContidos = itens.filter(i => !contidos.todos.map(Itens.IdItem).includes(i.id.valor))
        const msg = naoContidos.map(i => i.nome).join(", ")
        throw new ErroDeDominio(`Item não existente ${msg}`)
    }

    fecharCautela(cautela: Cautela | Id | string): Livro {
        return new Livro({
            ...this.props,
            cautelas: this.cautelas.descautelar(cautela).props
        })
    }

    inserirItem(item: Item): Livro {
        if (!this.itens.contem(item)) {
            return this.clone({
                ...this.props,
                itens: this.itens.incluir(item).props
            })
        }
        throw new ErroDeDominio('Item já incluído')
    }

    removerItem(item: Item | Id | string): Livro {
        if (this.itens.contem(item)) {
            if (!this.itensCautelados.contem(item)) {
                return this.clone({
                    ...this.props,
                    itens: this.itens.excluir(item).props
                })
            }
            throw new ErroDeDominio('O item está cautelado')
        }
        return this
    }
}