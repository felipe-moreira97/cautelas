import { Item } from "cautelas";
import { useElectron } from "../hooks/useElectron";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "./icons/EditIcon";
import { ErrosContext } from "../contexts/ErrosContext";

export default function EditarMaterialModal({ material }: { material: Item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { livro, setLivro } = useContext(LivroContext)
  const { addErro } = useContext(ErrosContext)
  const { editarItem } = useElectron()
  const [numeroDeSerie, setNumeroDeSerie] = useState<string>(material.numeroDeSerie!.completo)


  function handleEditar() {
    const itemProps = {
      ...material.props,
      numeroDeSerie
    }
    editarItem({
      livro,
      itemProps
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
              <ModalHeader className="flex flex-col gap-1">Editar Material</ModalHeader>
              <ModalBody>
                <Input type="text" variant="underlined" label="número de série" value={numeroDeSerie} onValueChange={setNumeroDeSerie} />
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