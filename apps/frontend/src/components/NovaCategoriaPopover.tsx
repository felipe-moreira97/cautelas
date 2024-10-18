import { Popover, PopoverTrigger, Button, PopoverContent, Input, Switch } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState, useContext } from "react";
import { PlusIcon } from "./icons/PlusIcon";
import { SelectCategoriaType } from "./IncluirMaterialModal";
import { ErrosContext } from "../contexts/ErrosContext";

export default function NovaCategoriaPopover({setCategorias}:{
  setCategorias:Dispatch<SetStateAction<SelectCategoriaType[]>>,

}) {
    const [item,setItem] = useState<boolean>(false)
    const [nome,setNome] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false)
    const {addErro} = useContext(ErrosContext)

    const handleClick = () => {
       let flag = false 
      const categoria = {
        nome,
        item
      }
      setCategorias(categorias => {
        const novaLista = [...categorias]
        if (!novaLista.map(c => c.nome).includes(nome) && nome.length >= 3) {
          novaLista.push(categoria)
        } 
        else {
          flag = true
        }
        return novaLista
      })
      if (!flag){
        setNome("")
        setItem(false)
        setIsOpen(false) 
      } else {
        addErro(new Error("Categoria já incluída"))
      }
      
    }

    return (
        <Popover placement="right" showArrow offset={10} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <PopoverTrigger>
          <Button isIconOnly color="primary"><PlusIcon/></Button>     
          </PopoverTrigger>
          <PopoverContent>
            {(titleProps) => (
                <div className="px-1 py-2 mb-1 flex flex-col gap-1 w-full">
                  <h3 className="text-small font-bold" {...titleProps}>
                    Nova Categoria
                  </h3>
                  <Input  label="Nome" size="sm" type="text" variant="underlined" value={nome} onValueChange={setNome} />
                  <Switch isSelected={item} onValueChange={setItem} size="sm"><p className="text-xs text-default-800">Possui número de série?</p></Switch>
                  <Button color="primary" className="mt-2" size="sm" onPress={handleClick}>Adicionar</Button>
                </div>
            )}
          </PopoverContent>
        </Popover>
      );
}