"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import SelectCategoria from "./SelectCategoria";
import NovaCategoriaPopover from "./NovaCategoriaPopover";
import { useElectron } from "../hooks/useElectron";
import { ErrosContext } from "../contexts/ErrosContext";
import { Categoria } from "cautelas";

export type SelectCategoriaType = {
  nome: string,
  item: boolean
}

export default function IncluirMaterialModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { livro, setLivro } = useContext(LivroContext)
  const { addErro } = useContext(ErrosContext)
  const { novoItem, novoMaterial } = useElectron()

  const [categoria, setCategoria] = useState<SelectCategoriaType | undefined>();
  const [categorias, setCategorias] = useState<SelectCategoriaType[]>(livro.itens.categorias
    .map(c => ({ nome: c.nome.completo, item: true }))
    .concat(livro.materiais.categorias.map(c => ({ nome: c, item: false }))));
  const [numeroDeSerie, setNumeroDeSerie] = useState<string>("");
  const [quantidade, setQuantidade] = useState<number>(1);

  function handleIncluir() {
    if (!categoria) throw new Error("sem categoria")
    categoria.item ?
      novoItem({
        itemProps: {
          categoria: livro.itens.categorias.find(c => c.nome.completo === categoria.nome)?.props || new Categoria({ nome: categoria.nome }).props,
          numeroDeSerie
        },
        livro
      })
        .then(novoLivro => {
          setLivro(novoLivro)
          setCategoria(undefined)
          setNumeroDeSerie("")
          setQuantidade(1)
        }).catch(addErro) :
      novoMaterial({
        materialProps: {
          nomeCategoria: categoria.nome,
          quantidade
        },
        livro
      })
        .then(novoLivro => setLivro(novoLivro))
        .catch(addErro)
        .finally(() => {
          setCategoria(undefined)
          setNumeroDeSerie("")
          setQuantidade(1)
        })
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
                {categoria?.item ?
                  <Input type="text" variant="underlined" label="número de série" value={numeroDeSerie} onValueChange={setNumeroDeSerie} /> :
                  <Input type="number" variant="underlined" label="quantidade" step={1} min={1} value={quantidade.toString()} onValueChange={e => setQuantidade(parseInt(e))} />
                }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                  setCategoria(undefined)
                  setNumeroDeSerie("")
                  setQuantidade(1)
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