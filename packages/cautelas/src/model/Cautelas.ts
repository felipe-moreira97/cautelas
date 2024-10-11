import { ErroDeDominio, Id } from "common";
import Cautela, { CautelaProps } from "./Cautela";
import Itens from "./Itens";
import { Militares } from "./Militares";
import Materiais from "./Materiais";
import { MaterialProps } from "./Material";

export default class Cautelas {
  readonly todas: Cautela[];

  constructor(props: CautelaProps[]) {
    this.todas = props.map((c) => new Cautela(c));
  }

  get props(): CautelaProps[] {
    return this.todas.map((i) => i.props);
  }

  get length(): number {
    return this.todas.length;
  }

  get todosItens(): Itens {
    return new Itens(this.todas.flatMap((c) => c.itens.props));
  }

  get todosMateriais():Materiais {
    return new Materiais(this.todas
        .flatMap(c => c.materiais.props).reduce((materiaisCautelados,material,j,arr) => {
          const materialExistente = materiaisCautelados.find(m => m.nomeCategoria === material.nomeCategoria)
          const index = materiaisCautelados.findIndex(m => m.nomeCategoria === material.nomeCategoria)
          if (materialExistente) {
            const quantidade = materialExistente.quantidade + material.quantidade
            materiaisCautelados.splice(index,1,{
              ...materialExistente,
              quantidade
            })
          } else {
            materiaisCautelados.push(material)
          }
          return materiaisCautelados
        },[] as MaterialProps[]))
  }

  get todosMilitares(): Militares {
    return new Militares(this.todas.map(c => c.militar.props))
  }

  incluir(cautela: CautelaProps): Cautelas {
    const cautelas = [...this.props];
    cautelas.push(cautela);
    return new Cautelas(cautelas);
  }

  excluir(cautela: Cautela | Id | string): Cautelas {
    const CautelaId = Cautelas.IdCautela(cautela);
    return new Cautelas(this.props.filter((c) => c.id !== CautelaId));
  }

  contem(cautela: Cautela | Id | string): boolean {
    const CautelaId = Cautelas.IdCautela(cautela);
    return this.todas.some((c) => c.id.valor === CautelaId);
  }

  descautelar(cautela: Cautela | Id | string): Cautelas {
    if (this.contem(cautela)) {
      const IdCautela = Cautelas.IdCautela(cautela);
      return new Cautelas(this.props.filter((c) => c.id !== IdCautela));
    }
    throw new ErroDeDominio("Cautela inexistente");
  }

  static IdCautela(cautela: Cautela | Id | string): string {
    return cautela instanceof Cautela
      ? cautela.id.valor
      : cautela instanceof Id
        ? cautela.valor
        : cautela;
  }
}
