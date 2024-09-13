import { LivroProps, RepositorioLivro } from "cautelas";

export default class RepoLivroMemoria implements RepositorioLivro {
  obter(): Promise<LivroProps> {
    throw new Error("Method not implemented.");
  }
  async salvar(livro: LivroProps): Promise<LivroProps> {
    const livroExistente = RepoLivroMemoria.livros.findIndex(
      (l) => l.id === livro.id,
    );
    livroExistente >= 0
      ? (RepoLivroMemoria.livros[livroExistente] = livro)
      : RepoLivroMemoria.livros.push(livro);
    return livro;
  }
  static livros: LivroProps[] = [
    {
      id: "0847b41c-18e3-45c6-90ef-39ff6cdfb1c2",
      itens: [
        {
          categoria: {
            nome: "fuzil",
            id: "8f7a898c-3ad8-49ce-8b41-af499fe68be0",
          },
          id: "e95d4198-09ec-4dcd-b35b-5e7598d215f1",
          numeroDeSerie: "123412",
        },
      ],
      cautelas: [],
    },
  ];
}
