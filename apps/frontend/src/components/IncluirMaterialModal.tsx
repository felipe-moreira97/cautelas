"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import SelectCategoria from "./SelectCategoria";
import { Categoria, Item } from "cautelas";
import { setLivro } from "../contexts/LivroProvider";


export default function IncluirMaterialModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { state:{livro},dispatch } = useContext(LivroContext)
  const[categoriaId,setCategoriaId] = useState<string>("");
  const[numSerie,setNumSerie] = useState<string>("");
  const[categoriaNome,setCategoriaNome] = useState<string>("");



    function handleIncluir() {
    const categoria = livro.itens.categorias.find(c => c.id.valor === categoriaId) || new Categoria({nome:categoriaNome})
    const novoLivro = livro.inserirItem(new Item({
        categoria:categoria.props,
        numeroDeSerie: numSerie
    }))
    setLivro({dispatch,livro:novoLivro})
    setCategoriaId("")
    setNumSerie("")
    setCategoriaNome("")
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
                    <SelectCategoria categorias={livro.itens.categorias} value={categoriaId} setValue={setCategoriaId} />
                    <Input type="text" variant="underlined" label="nova categoria" value={categoriaNome} onValueChange={setCategoriaNome} />
                    <Input type="text" variant="underlined" label="número de série" value={numSerie} onValueChange={setNumSerie} />
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