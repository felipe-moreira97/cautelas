"use client"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { useContext } from "react";
import { LivroContext } from "../../../contexts/LivroContext";
import { CategoriaProps } from "cautelas";

export default function page() {
    const {state} = useContext(LivroContext)
    const categorias:CategoriaProps[] = state.livro.itens.categorias.map(c => c.props)
    const columns = [
        {
            key:"nome",
            label:"Categoria"
        },
        {
            key:"id",
            label:"Ação"
        }
    ]
    return (
        <Table className="grow" isStriped>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={categorias}>
          {(categoria) => (
            <TableRow key={categoria.id}>
              {(columnKey) => <TableCell>{getKeyValue(categoria, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
}