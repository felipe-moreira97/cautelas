"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { Militar } from "common";
import SelectMilitar from "./SelectMilitar";
import { Item, Material } from "cautelas";
import { useElectron } from "../hooks/useElectron";
import { ErrosContext } from "../contexts/ErrosContext";
import ListBoxMaterial from "./SelectMaterial/ListBoxMaterial";


export default function NovaCautelaModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { livro, setLivro } = useContext(LivroContext)
  const { addErro } = useContext(ErrosContext)
  const { novaCautela } = useElectron()
  const [itens, setItens] = useState<Item[]>([])
  const [materiais,setMateriais] = useState<Material[]>([])
  const [militar, setMilitar] = useState<Militar | undefined>()

  function handleIncluir(close: () => void) {
    if (militar) {
      novaCautela({ livro, itens, militar, materiais })
        .then(novoLivro => {
          setLivro(novoLivro)
          setItens([])
          setMateriais([])
          setMilitar(undefined)
          close()
        }).catch(addErro)
    } else {
      addErro(new Error("Sem Militar"))
    }

  }

  return (
    <>
      <Button size="md" color="success" variant="light" onPress={onOpen}>Nova Cautela</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nova Cautela</ModalHeader>
              <ModalBody>
                <SelectMilitar
                  militares={livro.militares.todos}
                  value={militar}
                  setValue={setMilitar}
                />
                <ListBoxMaterial 
                itens={livro.itensDisponiveis}
                materiais={livro.materiaisDisponiveis}
                itensSelecionados={itens}
                materiaisSelecionados={materiais}
                setItens={setItens}
                setMateriais={setMateriais}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                  setItens([])
                  setMilitar(undefined)
                }}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={e => handleIncluir(onClose)}>
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