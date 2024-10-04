"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { Militar } from "common";
import { EditIcon } from "./icons/EditIcon";
import { useElectron } from "../hooks/useElectron";
import { ErrosContext } from "../contexts/ErrosContext";


export default function EditarMilitarModal({militar}:{militar:Militar}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { livro, setLivro } = useContext(LivroContext)
  const { setErros } = useContext(ErrosContext)
  const {editarMilitar} =useElectron()
  const[nome,setNome] = useState<string>(militar.nome.completo)
  const[cpf,setCpf] = useState<string>(militar.cpf.valor)


    function handleEditar() {
      editarMilitar.executar({
        livro,
        militar: new Militar({
          ...militar.props,
          cpf,
          nome
        })
      }).then(setLivro)
      .catch(setErros)
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
              <ModalHeader className="flex flex-col gap-1">Editar Militar</ModalHeader>
              <ModalBody>
                    <Input type="text" variant="underlined" label="nome" value={nome} onValueChange={setNome} />
                    <Input type="text" variant="underlined" label="CPF" value={cpf} onValueChange={setCpf} />
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