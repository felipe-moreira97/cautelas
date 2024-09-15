import { MilitarProps } from "common";

export interface RepositorioMilitar {
  obterMilitarPorCpf(cpf: string): Promise<MilitarProps>;
  obterMilitares(): Promise<MilitarProps[]>;
  cadastrarMilitar(militar: MilitarProps): Promise<MilitarProps>;
}
