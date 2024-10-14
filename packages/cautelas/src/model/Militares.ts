import { Cpf, ErroDeDominio, Id, Militar, MilitarProps } from "common";

export class Militares {
    readonly todos: Militar[]
    constructor(militares: MilitarProps[]) {
        this.todos = militares.map(m => new Militar(m))
    }

    get props(): MilitarProps[] {
        return this.todos.map((i) => i.props);
    }

    get length(): number {
        return this.todos.length;
    }

    incluir(militar: Militar): Militares {
        if (this.contem(militar)) throw new ErroDeDominio("Militar já cadastrado")
        if (this.contemCpf(militar)) throw new ErroDeDominio("CPF já cadastrado")
        const militares = [...this.props];
        militares.push(militar.props);
        return new Militares(militares);
    }

    excluir(militar: Militar | Id | string): Militares {
        const militarId = Militares.idMilitar(militar);
        return new Militares(this.props.filter((m) => m.id !== militarId));
    }

    contem(militar: Militar | Id | string): boolean {
        const militarId = Militares.idMilitar(militar);
        return this.todos.some((m) => m.id.valor === militarId);
    }

    obterMilitarPorCpf(cpf: Cpf | string): Militar {
        const militarCpf = Militares.cpfMilitar(cpf);
        const militar = this.todos.find(m => m.cpf.valor === militarCpf)
        if (!militar) throw new ErroDeDominio("Militar não encontrado")
        return militar
    }

    contemCpf(militar: Militar | Cpf | string): boolean {
        const militarCpf = Militares.cpfMilitar(militar);
        return this.todos.some((m) => m.cpf.valor === militarCpf);
    }

    static cpfMilitar(militar: Militar | Cpf | string): string {
        return militar instanceof Militar ?
            militar.cpf.valor :
            militar instanceof Cpf ?
                militar.valor :
                militar
    }
    static idMilitar(militar: Militar | Id | string): string {
        return militar instanceof Militar ?
            militar.id.valor :
            militar instanceof Id ?
                militar.valor :
                militar
    }
}