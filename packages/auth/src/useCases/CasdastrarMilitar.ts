import {
  CasoDeUso,
  ErroDeDominio,
  Militar,
  MilitarProps,
  SenhaForte,
} from "common";
import { ProvedorCripto, RepositorioMilitar } from "../provider";

type Entrada = {
  militar: MilitarProps;
  senha: string;
};

export default class CadastrarMilitar implements CasoDeUso<Entrada, Militar> {
  constructor(
    private repo: RepositorioMilitar,
    private criptoRepo: ProvedorCripto,
  ) {}
  async executar(entrada: Entrada): Promise<Militar> {
    const usuarioExistente = await this.repo.obterMilitarPorCpf(
      entrada.militar.cpf,
    );
    if (usuarioExistente) throw new ErroDeDominio("Usuário jáexistente");

    const senhaHash = await this.criptoRepo.criptografar(
      new SenhaForte(entrada.senha).valor,
    );
    const militar = new Militar({ ...entrada.militar, senha: senhaHash });
    return this.repo.cadastrarMilitar(militar);
  }
}
