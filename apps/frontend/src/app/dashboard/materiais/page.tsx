"use client"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button, Chip } from "@nextui-org/react";
import { useContext } from "react";
import { LivroContext } from "../../../contexts/LivroContext";
import { Item } from "cautelas";
import EditarMaterialModal from "../../../components/EditarMaterialModal";
import { DeleteIcon } from "../../../components/icons/DeleteIcon";
import { useElectron } from "../../../hooks/useElectron";
import { ErrosContext } from "../../../contexts/ErrosContext";

export default function page() {
    const {livro,setLivro} = useContext(LivroContext)
    const { setErros } = useContext(ErrosContext)
    const {excluirItem} = useElectron()
    const itens:Item[] = livro.itens.todos
    const cautelados = livro.itensCautelados.todos.map(i => i.id.valor)

    const handleDelete = (item:Item) => {
      excluirItem.executar({
        item,
        livro
      }).then(setLivro)
      .catch(setErros)
    }

    const columns = [
        {
            key:"nome",
            label:"MATERIAL"
        },
        {
            key:"acao",
            label:"AÇÃO"
        }
    ]
    return (
        <Table className="grow"classNames={{th:"text-center",td:"text-center"}}>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={itens}>
          {(item) => (
            <TableRow key={item.id.valor}>
              {(columnKey) => ( columnKey === "acao" ?
              <TableCell>
              <div className="flex justify-center gap-2">
                {item.categoria.temNumeroDeSerie && <EditarMaterialModal material={item}  />}
                  <Button isIconOnly onPress={() => handleDelete(item)} color="danger" size="sm">
                    <DeleteIcon />
                    </Button>
              </div>
            </TableCell>
              :
              <TableCell>
                <div className={"flex justify-center gap-1"}>
                <Chip 
                color={cautelados.includes(item.id.valor) ? "danger" : "success"}
                size="sm"
                variant="flat"
                >
                {getKeyValue(item, columnKey)}
                </Chip>
                </div>
                </TableCell>)}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
}