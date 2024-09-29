"use client"

import { useContext } from "react"
import { LivroContext } from "../../../contexts/LivroContext"
import { MilitarProps } from "common"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react"

export default function militares() {
    const {state} = useContext(LivroContext)
    const militares = state.militares.map(m => m.props)
    const columns = [{
        key:"cpf",
        label:"CPF"
    },{
        key:"nome",
        label:"Nome"
    }]
    return (
        <Table className="grow" isStriped>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={militares}>
          {(militar) => (
            <TableRow key={militar.id}>
              {(columnKey) => <TableCell>{getKeyValue(militar, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
}