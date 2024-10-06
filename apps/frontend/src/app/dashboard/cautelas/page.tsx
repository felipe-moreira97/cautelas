"use client"
import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useContext } from "react";
import { LivroContext } from "../../../contexts/LivroContext";
import { DescautelarIcon } from "../../../components/icons/DescautelarIcon";
import { Cautela } from "cautelas";
import { useElectron } from "../../../hooks/useElectron";
import { ErrosContext } from "../../../contexts/ErrosContext";

export default function page() {
  const { livro, setLivro } = useContext(LivroContext)
  const { addErro } = useContext(ErrosContext)
  const { fecharCautela } = useElectron()
  const handleDescautelar = (cautela: Cautela) => {
    fecharCautela({ livro, cautela })
      .then(setLivro)
      .catch(addErro)
  }

  const columns = [
    {
      key: "itens",
      label: "MATERIAIS"
    },
    {
      key: "militar",
      label: "MILITAR"
    },
    {
      key: "timestamp",
      label: "DATA"
    },
    {
      key: "descautelar",
      label: "DESCAUTELAR"
    },


  ]
  return (
    <Table className="grow" classNames={{ th: "text-center", td: "text-center" }}>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={livro.cautelas.todas}>
        {(cautela) => (
          <TableRow key={cautela.id.valor}>
            {(columnKey) => columnKey === "itens" ?
              <TableCell>{
                <div className="flex flex-row flex-wrap justify-center gap-1">
                  {cautela.itens.todos.map(i => <Chip color="default" size="sm" variant="flat">{i.nome}</Chip>)}
                </div>
              }</TableCell> :
              columnKey === "militar" ?
                <TableCell>{cautela.militar.nome.completo}</TableCell> :
                columnKey === "descautelar" ?
                  <TableCell>
                    <Button isIconOnly color="danger" variant="ghost" className="text-lg text-red-600" onPress={() => handleDescautelar(cautela)}>
                      <DescautelarIcon />
                    </Button>
                  </TableCell> :
                  <TableCell>{new Date(Number(cautela.timestamp)).toLocaleDateString()}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}