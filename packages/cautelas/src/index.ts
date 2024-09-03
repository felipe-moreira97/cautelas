import Categoria from "./Categoria"
import Cautela from "./Cautela"
import Item from "./Item"
import Livro from "./Livro"
import Militar from "./Militar"


const cat1 = new Categoria({
    nome: "fuzil"
})
const fz1 = new Item({
    categoria: cat1.props
})
const fz2 = new Item({
    categoria: cat1.props
})
const fz3 = new Item({
    categoria: cat1.props
})
const fz4 = new Item({
    categoria: cat1.props
})

const militar = new Militar({
    nome: "João"
})

let livro = new Livro({
    cautelas: [],
    itens: [fz1.props, fz2.props],
})
livro = livro.novaCautela(militar, fz1, fz2)
livro = livro.inserirItem(fz3)
livro = livro.inserirItem(fz4)
livro = livro.novaCautela(militar, fz3)
let idCautela = livro.cautelas[1] as Cautela
livro = livro.fecharCautela(idCautela)
livro = livro.removerItem(fz4.id.valor)
console.log(livro.cautelas.map(c => c.props))
