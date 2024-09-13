import Cpf from "./Cpf";
import Entidade, { EntidadeProps } from "./Entidade";
import SenhaHash from "./SenhaHash";
import TextoSimles from "./TextoSimples";

export interface MilitarProps extends EntidadeProps {
  nome: string;
  cpf: string;
  senha?: string;
}

export default class Militar extends Entidade<Militar, MilitarProps> {
  readonly nome: TextoSimles;
  readonly cpf: Cpf;
  readonly senha: SenhaHash | null;

  constructor(props: MilitarProps) {
    super(props);
    this.nome = new TextoSimles(props.nome, 3, 120, "nome", "Militar");
    this.cpf = new Cpf(props.cpf);
    this.senha = props.senha
      ? new SenhaHash(props.senha, "senha", "Militar")
      : null;
  }

  semSenha(): Militar {
    return this.clone({
      ...this.props,
      senha: undefined,
    });
  }
}
