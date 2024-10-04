"use client"
import { useContext } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { LivroContext } from "../../../contexts/LivroContext";

export default function page() {
    const { livro } = useContext(LivroContext)
    const data = livro.itensTabeladosPorCategoria

    const columns = [
      {
        key:"categoria",
        label:"CATEGORIA"
      },
      {
        key:"todos",
        label:"EXISTENTES"
      },{
        key:"cautelados",
        label:"CAUTELADOS"
      },{
        key:"disponiveis",
        label:"DISPONÍVEIS"
      },
    ]

  return (
    <Table className="grow" classNames={{th:"text-center",td:"text-center"}}>
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