import { Item, Material } from "cautelas";
import { useElectron } from "../hooks/useElectron";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "./icons/EditIcon";
import { ErrosContext } from "../contexts/ErrosContext";

export default function EditarMaterialModal({ material }: { material: Item | Material }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { livro, setLivro } = useContext(LivroContext)
  const { addErro } = useContext(ErrosContext)
  const { editarItem, editarMaterial } = useElectron()
  const eItem = material instanceof Item
  const [numeroDeSerie, setNumeroDeSerie] = useState<string>(eItem ? material.numeroDeSerie.completo : "")
  const [quantidade, setQuantidade] = useState<number>(!eItem ? material.quantidade.valor : 0)


  function handleEditar() {
    eItem ? editarItem({
      livro,
      itemProps:{
      ...material.props,
      numeroDeSerie
    }
  })
  .then(setLivro)
  .catch(addErro) : editarMaterial({
      livro,
      materialProps:{
        ...material.props,
        quantidade
      }
    })
      .then(setLivro)
      .catch(addErro)
  }

  return (
    <>
      <Button size="sm" color="warning" variant="ghost" isIconOnly onPress={onOpen}>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar Material {material.nome}</ModalHeader>
              <ModalBody>
                {
                  eItem ? 
                  <Input 
                  type="text" 
                  variant="underlined" 
                  label="número de série" 
                  value={numeroDeSerie} 
                  onValueChange={setNumeroDeSerie} /> :
                  <Input 
                  type="number" 
                  variant="underlined" 
                  label="quantidade" 
                  value={quantidade.toString()} 
                  onValueChange={e => setQuantidade(parseInt(e))} /> 
                }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={e => {
                  handleEditar()
                  onClose()
                }}>
                  Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}