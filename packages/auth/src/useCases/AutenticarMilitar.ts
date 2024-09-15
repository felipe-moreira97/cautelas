import { CasoDeUso, Cpf, ErroDeDominio, Militar } from "common";
import { RepositorioMilitar } from "../provider";
import { ProvedorCripto } from "../provider";

type Entrada = {
  cpf: string;
  senha: string;
};

export default class AutenticarMilitar implements CasoDeUso<Entrada, Militar> {
  constructor(
    private repo: RepositorioMilitar,
    private criptoRepo: ProvedorCripto,
  ) { }
  async executar(entrada: Entrada): Promise<Militar> {
    const cpf = new Cpf(entrada.cpf);
    const militar = await this.repo.obterMilitarPorCpf(cpf.valor);
    if (!militar) throw new ErroDeDominio("Militar inexistente");

    const validar = await this.criptoRepo.comparar(
      entrada.senha,
      militar.senha!,
    );
    if (!validar) throw new ErroDeDominio("a senha não confere");

    return new Militar(militar).semSenha();
  }
}
