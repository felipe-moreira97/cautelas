"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { setLivro } from "../contexts/LivroProvider";
import { Militar } from "common";
import SelectMaterial from "./SelectMaterial";
import SelectMilitar from "./SelectMilitar";
import { Item } from "cautelas";


export default function NovaCautelaModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { state:{livro,militares}, dispatch } = useContext(LivroContext)
  const[itens,setItens] = useState<Item[]>([])
  const[militar,setMilitar] = useState<Militar>()
  
    function handleIncluir() {
        if(militar) {
            const novoLivro = livro.novaCautela(
                militar,
                ...itens
            )
            setLivro({dispatch, livro:novoLivro})
        } else {

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
                    <SelectMaterial materiais={livro.itensDisponiveis} value={itens} setValues={setItens} />
                    <SelectMilitar militares={militares} value={militar} setValue={setMilitar} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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