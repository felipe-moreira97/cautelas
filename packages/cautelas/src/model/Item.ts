import { Entidade, EntidadeProps, TextoSimles } from "common";
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
    this.numeroDeSerie = props.numeroDeSerie
      ? new TextoSimles(props?.numeroDeSerie, 3, 120, "nome", "Item")
      : undefined;
    this.categoria = new Categoria(props.categoria);
  }

  get nome(): string {
    const msg = this.categoria.nome.completo;
    const numSerie = this.numeroDeSerie?.completo
      ? `: ${this.numeroDeSerie.completo}`
      : "";
    return msg.concat(numSerie);
  }
}
