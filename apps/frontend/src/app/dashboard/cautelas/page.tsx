"use client"
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useContext } from "react";
import { LivroContext } from "../../../contexts/LivroContext";
import { Item } from "cautelas";

export default function page() {
    const {state} = useContext(LivroContext)
    const {livro} = state
    const columns =[
        {
            key:"itens",
            label:"Itens"
    },
        {
            key:"militar",
            label:"Militar"
    },
        {
            key:"timestamp",
            label:"Data"
    },


]
    return (
        <Table className="grow" isStriped>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={livro.cautelas.todas}>
          {(cautela) => (
            <TableRow key={cautela.id.valor}>
              {(columnKey) => columnKey === "itens" ?
              <TableCell>{cautela.itens.map(i => i.nome).join(", ")}</TableCell> :
              columnKey === "militar" ?
              <TableCell>{cautela.militar.nome.completo}</TableCell> :
              <TableCell>{new Date(Number(cautela.timestamp)).toLocaleDateString()}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
}