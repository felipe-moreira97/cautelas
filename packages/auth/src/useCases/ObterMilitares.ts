import { CasoDeUso } from "common";
import { RepositorioMilitar } from "../provider";
import { Militares } from "../model";

export default class ObterMilitares implements CasoDeUso<null, Militares> {
  constructor(private repo: RepositorioMilitar) { }
  async executar(): Promise<Militares> {
    const militares = await this.repo.obterMilitares();
    return new Militares(militares);
  }
}
