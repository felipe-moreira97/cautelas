import { Popover, PopoverTrigger, Button, PopoverContent, Input, Switch } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { PlusIcon } from "./icons/PlusIcon";
import { Categoria } from "cautelas";

export default function NovaCategoriaPopover({setCategorias}:{
  setCategorias:Dispatch<SetStateAction<Categoria[]>>,

}) {
    const [temNumeroDeSerie,setTemNumeroDeSerie] = useState<boolean>(false)
    const [nome,setNome] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      const categoria = new Categoria({
        nome,
        temNumeroDeSerie
      })
      setCategorias(categorias => {
        const novaLista = [...categorias]
        novaLista.push(categoria)
        return novaLista
      })
      setNome("")
      setTemNumeroDeSerie(false)
      setIsOpen(false)
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
                  <Switch isSelected={temNumeroDeSerie} onValueChange={setTemNumeroDeSerie} size="sm"><p className="text-xs text-default-800">Possui número de série?</p></Switch>
                  <Button color="primary" className="mt-2" size="sm" onPress={handleClick}>Adicionar</Button>
                </div>
            )}
          </PopoverContent>
        </Popover>
      );
}