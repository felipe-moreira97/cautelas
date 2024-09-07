import { Item, Livro, Militar } from "./model";
import RepoLivroArquivo from "./repositorios/RepoLivroArquivo";
import RepoLivroMemoria from "./repositorios/RepoLivroMemoria";
import { ExcluirItem, FecharCautela, NovaCautela, IncluirItem, NovoLivro } from "./useCases";
import SalvarLivro from "./useCases/SalvarLivro";


// const repo = new RepoLivroMemoria()
const caminho = ''
const repo = new RepoLivroArquivo(caminho)

const novaCautela = new NovaCautela()
const incluirItem = new IncluirItem()
const excluirItem = new ExcluirItem()
const fecharCautela = new FecharCautela()
const novoLivro = new NovoLivro()
const salvarLivro = new SalvarLivro(repo)

const item = new Item({
    categoria: {
        nome: "fuzil",
        id: '8f7a898c-3ad8-49ce-8b41-af499fe68be0'
    },
    numeroDeSerie: '123456',
    id: 'cbd59000-409b-4d1a-a953-703a3a34915b'
})

const item2 = new Item({
    categoria: {
        nome: "fuzil",
        id: '8f7a898c-3ad8-49ce-8b41-af499fe68be0'
    },
    numeroDeSerie: '123123',
    id: '8327bbcf-35e9-40c7-9e30-500658894581'
})

const militar = new Militar({
    nome: "João"
})

async function teste() {
    async function salvar(l: Livro) {
        return salvarLivro.executar(l)
    }
    try {
        let livro = await novoLivro.executar().then(salvar)


        // livro = await novaCautela.executar({
        //     itens: [item,item2],
        //     livro
        // },militar
        // )
        livro = await incluirItem.executar({
            item,
            livro
        }).then(salvar)

        livro = await incluirItem.executar({
            item: item2,
            livro
        }).then(salvar)

        livro = await novaCautela.executar({
            itens: [item2],
            livro
        }, militar
        ).then(salvar)

        console.log("cautelados: ", livro.itensCautelados.length)
        console.log("disponiveis: ", livro.itensDisponiveis.length)
        console.log("todos: ", livro.itens.length)
    } catch (e: any) {
        console.log(e.stack)
    }

}

teste()
