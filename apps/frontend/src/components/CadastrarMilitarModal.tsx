"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { setMilitares } from "../contexts/LivroProvider";
import { Militar } from "common";


export default function CadastrarMilitarModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { state:{militares},dispatch } = useContext(LivroContext)
  const[nome,setNome] = useState<string>("");
  const[cpf,setCpf] = useState<string>("");
  const[senha,setSenha] = useState<string>("");
  const [isInvalid,setIsInvalid] = useState<boolean>(false)



    function handleIncluir() {
        if(!militares.map(m => m.cpf.valor).includes(cpf)) {
            militares.push(new Militar({
                nome,
                cpf
            }))
            setMilitares({dispatch,militares})
            setNome("")
            setCpf("")
        } else {
            setIsInvalid(true)
        }

  }

  return (
    <>
      <Button size="md" color="default" variant="light" onPress={onOpen}>Cadastrar Militar</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cadastrar Militar</ModalHeader>
              <ModalBody>
                    <Input type="text" variant="underlined" label="nome" value={nome} onValueChange={setNome} />
                    <Input type="text" variant="underlined" isInvalid={isInvalid}
      errorMessage="Cpf já cadastrado" label="CPF" value={cpf} onValueChange={setCpf} />
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