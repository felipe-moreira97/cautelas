"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { Militar } from "common";
import SelectMaterial from "./SelectMaterial";
import SelectMilitar from "./SelectMilitar";
import { Item } from "cautelas";
import { useElectron } from "../hooks/useElectron";
import { ErrosContext } from "../contexts/ErrosContext";


export default function NovaCautelaModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const { livro,setLivro } = useContext(LivroContext)
  const { setErros } = useContext(ErrosContext)
  const {novaCautela} = useElectron()
  const[itens,setItens] = useState<Item[]>([])
  const[militar,setMilitar] = useState<Militar | undefined>()
  
    function handleIncluir(close:() => void) {
        if(militar && (itens.length > 0)) {
          novaCautela.executar({livro,itens}, militar)
          .then(novoLivro => {
            setLivro(novoLivro)
            setItens([])
            setMilitar(undefined)
            close()
          }).catch(setErros)
        } else {
            setErros(new Error("Sem Militar ou Material"))
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
                    <SelectMaterial 
                      materiais={livro.itensDisponiveis} 
                      value={itens} 
                      setValues={setItens}
                    />
                    <SelectMilitar 
                      militares={livro.militares.todos} 
                      value={militar} 
                      setValue={setMilitar} 
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