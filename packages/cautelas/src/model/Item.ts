import { Entidade, EntidadeProps, ErroDeDominio, TextoSimles } from "common";
import Categoria, { CategoriaProps } from "./Categoria";

export interface ItemProps extends EntidadeProps {
  numeroDeSerie?: string;
  categoria: CategoriaProps;
}

export default class Item extends Entidade<Item, ItemProps> {
  readonly numeroDeSerie?: TextoSimles;
  readonly categoria: Categoria;

  constructor(props: ItemProps) {
    super(props);
    this.categoria = new Categoria(props.categoria);
    if (this.categoria.temNumeroDeSerie){
      if(props.numeroDeSerie === undefined) {
        throw new ErroDeDominio(`${this.categoria.nome} deve possuir número de série`)
      } else {
        this.numeroDeSerie = new TextoSimles(props.numeroDeSerie, 3, 120, "nome", "Item")
      }
    } else {
      this.numeroDeSerie = undefined
    }
  }

  get nome(): string {
    const msg = this.categoria.nome.completo;
    const numSerie = this.numeroDeSerie?.completo
      ? `: ${this.numeroDeSerie.completo}`
      : "";
    return msg.concat(numSerie);
  }
}
