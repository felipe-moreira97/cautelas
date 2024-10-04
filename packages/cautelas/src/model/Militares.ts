import { Cpf, ErroDeDominio, Militar, MilitarProps } from "common";

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
        const militares = [...this.props];
        militares.push(militar.props);
        return new Militares(militares);
    }

    excluir(militar: Militar | Cpf | string): Militares {
        const militarCpf = Militares.cpfMilitar(militar);
        return new Militares(this.props.filter((m) => m.cpf !== militarCpf));
    }

    contem(militar: Militar | Cpf | string): boolean {
        const militarCpf = Militares.cpfMilitar(militar);
        return this.todos.some((m) => m.cpf.valor === militarCpf);
    }

    obterMilitarPorCpf(cpf: Cpf | string): Militar {
        const militarCpf = Militares.cpfMilitar(cpf);
        const militar = this.todos.find(m => m.cpf.valor === militarCpf)
        if (!militar) throw new ErroDeDominio("Militar não encontrado")
        return militar
    }

    static cpfMilitar(militar: Militar | Cpf | string): string {
        return militar instanceof Militar ?
            militar.cpf.valor :
            militar instanceof Cpf ?
                militar.valor :
                militar
    }
}