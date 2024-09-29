import { useContext } from "react";
import { LivroContext } from "../contexts/LivroContext";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

type TableData = {
    categoria:string,
    todos:number,
    disponiveis:number,
    cautelados:number
}    

export default function Tabela() {
    const { state } = useContext(LivroContext)
    const { livro } = state
    const cautelados = livro.itensCautelados.porCategorias
    const disponiveis = livro.itensDisponiveis.porCategorias
    const todos = livro.itens.porCategorias

    const data:TableData[] = todos.map((i) => ({
            categoria: i.categoria.nome.completo,
            todos:i.itens.length,
            cautelados:cautelados.find(j => j.categoria.igual(i.categoria))?.itens.length || 0,
            disponiveis:disponiveis.find(j => j.categoria.igual(i.categoria))?.itens.length || 0
        }))

    const columns = [
      {
        key:"categoria",
        label:"Categoria"
      },
      {
        key:"todos",
        label:"Existentes"
      },{
        key:"cautelados",
        label:"Cautelados"
      },{
        key:"disponiveis",
        label:"Disponiveis"
      },
    ]

  return (
    <Table className="grow" isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.categoria}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}