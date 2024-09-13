import { Militar } from "common";

export interface RepositorioMilitar {
  obterMilitarPorCpf(cpf: string): Promise<Militar>;
  cadastrarMilitar(militar: Militar): Promise<Militar>;
}
