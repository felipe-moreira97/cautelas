"use client"

import { useContext, useEffect } from "react"
import { LivroContext } from "../../../contexts/LivroContext"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react"
import { DeleteIcon } from "../../../components/icons/DeleteIcon"
import EditarMilitarModal from "../../../components/EditarMilitarModal"
import { useElectron } from "../../../hooks/useElectron"
import { Militar } from "common"
import { ErrosContext } from "../../../contexts/ErrosContext"

export default function militares() {
  const { livro, setLivro } = useContext(LivroContext)
  const { addErro } = useContext(ErrosContext)
  const { excluirMilitar } = useElectron()
  const columns = [{
    key: "cpf",
    label: "CPF"
  }, {
    key: "nome",
    label: "NOME"
  }, {
    key: "acoes",
    label: "AÇÕES"
  }]

  const handleDelete = (militar: Militar) => {
    excluirMilitar({
      livro,
      militar
    }).then(setLivro)
      .catch(addErro)
  }

  return (
    <Table className="grow" classNames={{ th: "text-center", td: "text-center" }}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={livro.militares.todos}>
        {(militar) => (
          <TableRow key={militar.id.valor}>
            {(columnKey) => columnKey === "acoes" ?
              <TableCell>
                <div className="flex justify-center gap-2">
                  <EditarMilitarModal militar={militar} />
                  <Button isIconOnly onPress={() => handleDelete(militar)} color="danger" size="sm">
                    <DeleteIcon />
                  </Button>
                </div>
              </TableCell> :
              columnKey === "cpf" ?
                <TableCell>{militar.cpf.valor}</TableCell> :
                <TableCell>{militar.nome.completo}</TableCell>
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}