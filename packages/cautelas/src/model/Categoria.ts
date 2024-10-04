import { Entidade, Id, EntidadeProps, TextoSimles } from "common";

export interface CategoriaProps extends EntidadeProps {
  nome: string;
  temNumeroDeSerie?:boolean;
}

export default class Categoria extends Entidade<Categoria, CategoriaProps> {
  readonly nome: TextoSimles;
  readonly temNumeroDeSerie: boolean;

  constructor(props: CategoriaProps) {
    super(props);
    this.nome = new TextoSimles(props.nome, 3, 120, "nome", "categoria");
    this.temNumeroDeSerie = props.temNumeroDeSerie ? true : false
  }
}
