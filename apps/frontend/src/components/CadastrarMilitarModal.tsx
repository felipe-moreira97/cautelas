"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { useElectron } from "../hooks/useElectron";
import { ErrosContext } from "../contexts/ErrosContext";


export default function CadastrarMilitarModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { livro, setLivro } = useContext(LivroContext)
  const { addErro } = useContext(ErrosContext)
  const { novoMilitar } = useElectron()

  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");

  function handleIncluir() {
    const militarProps = {
      cpf,
      nome
    }
    novoMilitar({
      livro,
      militarProps,
    }).then(novoLivro => {
      setNome("")
      setCpf("")
      setLivro(novoLivro)
    }).catch(addErro)
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
                <Input type="text" variant="underlined" label="CPF" value={cpf} onValueChange={setCpf} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                  setNome("")
                  setCpf("")
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