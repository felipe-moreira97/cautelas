import { CasoDeUso, Militar } from "common";
import { Livro } from "../model";
import { RepositorioLivro } from "../provider";

export default class NovoLivro implements CasoDeUso<any, Livro | undefined, Militar> {
  constructor(private repo: RepositorioLivro) {}
  async executar(): Promise<Livro | undefined> {
    return this.repo
    .novo(new Livro({
      cautelas: [],
      itens: [],
      materiais:[],
      militares:[]
    }).props)
    .then((l) => l && new Livro(l));
    ;
  }
}
