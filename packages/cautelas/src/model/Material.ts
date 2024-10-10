import { Entidade, EntidadeProps, Quantidade, TextoSimles } from "common";

export interface MaterialProps extends EntidadeProps {
    nome: string,
    quantidade: number
}

export default class Material extends Entidade<Material, MaterialProps> {
    readonly nomeCategoria: TextoSimles;
    readonly quantidade: Quantidade;
    constructor(props: MaterialProps) {
        super(props)
        this.nomeCategoria = new TextoSimles(props.nome, 3, 120, "nome", "Material")
        this.quantidade = new Quantidade(props.quantidade, "quantidade", "Material")
    }

    get nome(): string {
        const msg = this.nomeCategoria.completo;
        const quantidade = ` x ${this.quantidade.valor}`
        return msg.concat(quantidade);
    }
}