import { Item, Livro, Militar } from "./model";
import RepoLivroMemoria from "./RepoLivroMemoria";
import { NovaCautela } from "./useCases";
import IncluirItem from "./useCases/IncluirItem";

const repo = new RepoLivroMemoria()

const novaCautela = new NovaCautela(repo)
const incluirItem = new IncluirItem(repo)
async function teste() {
    let livro = await incluirItem.executar({
        item: {
            categoria: RepoLivroMemoria.livro.itens[0]!.categoria,
            numeroDeSerie: '123123'
        },
        livro: new Livro(RepoLivroMemoria.livro)
    })
    livro = await novaCautela.executar({
        itens: [new Item(RepoLivroMemoria.livro.itens[0]!)],
        livro
    },
        new Militar({
            nome: "João"
        })
    )
    console.log(livro)
}

teste()