import {
  Entidade,
  EntidadeProps,
  ErroDeDominio,
  MilitarProps,
  Militar,
} from "common";
import Item, { ItemProps } from "./Item";
import Itens from "./Itens";

export interface CautelaProps extends EntidadeProps {
  timestamp?: string;
  itens: ItemProps[];
  militar: MilitarProps;
}

export default class Cautela extends Entidade<Cautela, CautelaProps> {
  readonly timestamp: string;
  readonly itens: Itens;
  readonly militar: Militar;

  constructor(props: CautelaProps) {
    super(props);
    if (props.itens.length <= 0) throw new ErroDeDominio("Cautela sem Itens");
    this.itens = new Itens(props.itens)
    this.timestamp = props.timestamp ?? Date.now().toString();
    this.militar = new Militar(props.militar);
  }
}
