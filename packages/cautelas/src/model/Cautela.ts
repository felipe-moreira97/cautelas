import {
  Entidade,
  EntidadeProps,
  ErroDeDominio,
  MilitarProps,
  Militar,
} from "common";
import { ItemProps } from "./Item";
import Itens from "./Itens";
import { MaterialProps } from "./Material";

export interface CautelaProps extends EntidadeProps {
  timestamp?: string;
  itens: ItemProps[];
  materiais: MaterialProps[];
  militar: MilitarProps;
}

export default class Cautela extends Entidade<Cautela, CautelaProps> {
  readonly timestamp: string;
  readonly itens: Itens;
  readonly materiais: Materiais;
  readonly militar: Militar;

  constructor(props: CautelaProps) {
    super(props);
    if (props.itens.length <= 0) throw new ErroDeDominio("Cautela sem Materiais");
    this.itens = new Itens(props.itens)
    this.timestamp = props.timestamp ?? Date.now().toString();
    this.militar = new Militar(props.militar);
  }
}
