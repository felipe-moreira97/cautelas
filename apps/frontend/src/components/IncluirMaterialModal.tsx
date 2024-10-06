"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import SelectCategoria from "./SelectCategoria";
import { Categoria } from "cautelas";
import NovaCategoriaPopover from "./NovaCategoriaPopover";
import { useElectron } from "../hooks/useElectron";
import { ErrosContext } from "../contexts/ErrosContext";


export default function IncluirMaterialModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { livro, setLivro } = useContext(LivroContext)
  const { addErro } = useContext(ErrosContext)
  const { novoItem } = useElectron()

  const [categoria, setCategoria] = useState<Categoria | undefined>();
  const [categorias, setCategorias] = useState<Categoria[]>(livro.itens.categorias);
  const [numeroDeSerie, setNumeroDeSerie] = useState<string>("");

  function handleIncluir() {
    novoItem({
      itemProps: {
        categoria: categoria!.props,
        numeroDeSerie
      },
      livro
    }).then(novoLivro => {
      setLivro(novoLivro)
      setCategoria(undefined)
      setNumeroDeSerie("")
    }).catch(addErro)
  }

  return (
    <>
      <Button size="md" color="default" variant="light" onPress={onOpen}>Incluir Material</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Incluir Material</ModalHeader>
              <ModalBody>
                <div className="flex items-end gap-2 flex-row">
                  <SelectCategoria categorias={categorias} value={categoria} setValue={setCategoria} />
                  <NovaCategoriaPopover setCategorias={setCategorias} />
                </div>
                {categoria?.temNumeroDeSerie && <Input type="text" variant="underlined" label="número de série" value={numeroDeSerie} onValueChange={setNumeroDeSerie} />}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                  setCategoria(undefined)
                  setNumeroDeSerie("")
                }}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={e => {
                  handleIncluir()
                  onClose()
                }}>
                  Incluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}