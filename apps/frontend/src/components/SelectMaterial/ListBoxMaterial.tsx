import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Item, Itens, Materiais, Material } from "cautelas";
import ChipsMaterial from "./ChipsMaterial";

const filtro = (textValue: string, inputValue: string) => {
    if (!inputValue) return true;
    if (inputValue.length === 0) {
      return true;
    }
    textValue = textValue.normalize("NFC").toLocaleLowerCase();
    inputValue = inputValue.normalize("NFC").toLocaleLowerCase();
    return textValue.match(inputValue);
  };


export default function ListBoxMaterial({
    itens,
    materiais,
    itensSelecionados,
    setItens,
    materiaisSelecionados,
    setMateriais
    }:{
      itens:Itens,
      materiais:Materiais,
      itensSelecionados:Item[],
      setItens:Dispatch<SetStateAction<Item[]>>,
      materiaisSelecionados:Material[],
      setMateriais:Dispatch<SetStateAction<Material[]>>
  }) {
    const [inputValue,setInputValue] = useState("");
    const todos:(Item | Material)[] = [...itens.todos,...materiais.todos].filter(m => filtro(m.nome,inputValue))

    const handleSelect = keys => {
        const item = itens.todos.filter(i =>  keys.has(i.id.valor))
        const material = materiais.todos.filter(i => keys.has(i.id.valor))[0]
        if (material) handleSetMaterial(material)
        if(item) setItens(item)
    }

    const handleSetMaterial = (material:Material) => {
        if (materiaisSelecionados.map(m => m.nomeCategoria.completo).includes(material.nomeCategoria.completo)) {
            const mat = materiaisSelecionados.filter(m => m.nomeCategoria.completo === material.nomeCategoria.completo)[0]
            const matArr = materiaisSelecionados.filter(m => m.nomeCategoria.completo !== material.nomeCategoria.completo)
            setMateriais([...matArr,mat.clone({...mat.props,quantidade:mat.quantidade.valor + 1})])
        } else {
            setMateriais([...materiaisSelecionados,material.clone({...material.props,quantidade:1})])
        }
    }
  return ( 
    <div className="flex flex-col gap-1">
                    <Input
                label="Materiais"
                variant="underlined"
                value={inputValue}
                onValueChange={setInputValue}
                isClearable
                />
           <ChipsMaterial itens={[...itensSelecionados,...materiaisSelecionados]} setItens={setItens} setMateriais={setMateriais} />
        <div 
        className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                    <Listbox
                        classNames={{
                            list: "h-[200px] overflow-y-scroll",
                        }}
                        variant="flat"
                        selectionMode="multiple"
                        selectedKeys={new Set([...itensSelecionados.map(i => i.id.valor)])}
                        onSelectionChange={handleSelect}
                        items={todos}
                        emptyContent={<div className="text-lg text-default-300 font-medium">Nenhum material.</div>}
                        >
                        {(item) => (
                            <ListboxItem key={item.id.valor}
                                classNames={{base:"max-h-[32px]"}}
                            >
                                    {
                                        item instanceof Item ?
                                            item.nome :
                                            item.nomeCategoria.completo
                                    }
                                </ListboxItem>
                            )}
                    </Listbox>
                    </div>
    </div>
  )
}