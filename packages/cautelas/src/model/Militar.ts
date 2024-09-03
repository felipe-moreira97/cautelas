import { Entidade, EntidadeProps, TextoSimles } from "common";

export interface MilitarProps extends EntidadeProps {
    nome: string,

}

export default class Militar extends Entidade<Militar, MilitarProps> {
    readonly nome: TextoSimles

    constructor(props: MilitarProps) {
        super(props)
        this.nome = new TextoSimles(props.nome, 3, 120, 'nome', 'Militar')
    }
}