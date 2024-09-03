import { Entidade, EntidadeProps, ErroDeDominio } from "common";
import Item, { ItemProps } from "./Item";
import Militar, { MilitarProps } from "./Militar";

export interface CautelaProps extends EntidadeProps {
    timestamp?: string,
    itens: ItemProps[],
    militar: MilitarProps,
    cautelado?: boolean
}

export default class Cautela extends Entidade<Cautela, CautelaProps> {
    readonly timestamp: string
    readonly itens: Item[]
    readonly militar: Militar
    readonly cautelado: boolean = true

    constructor(props: CautelaProps) {
        super(props)
        if (props.itens.length <= 0) throw new ErroDeDominio('Cautela sem Itens')
        this.itens = props.itens.map(i => new Item(i))
        this.timestamp = props.timestamp ?? Date.now().toString()
        this.militar = new Militar(props.militar)
        this.cautelado = props.cautelado ?? true
    }
    descautelar(): Cautela {
        return this.clone({ ...this.props, cautelado: false })
    }
}