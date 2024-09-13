import { CasoDeUso, Cpf, ErroDeDominio, Militar } from "common";
import { RepositorioMilitar } from "../provider";

export default class ObterMilitarPorCpf implements CasoDeUso<string, Militar> {
  constructor(private repo: RepositorioMilitar) {}
  async executar(cpf: string): Promise<Militar> {
    const cpfValido = new Cpf(cpf);
    const militar = await this.repo.obterMilitarPorCpf(cpfValido.valor);
    if (!militar) throw new ErroDeDominio("Cpf não cadastrado");
    return militar;
  }
}
