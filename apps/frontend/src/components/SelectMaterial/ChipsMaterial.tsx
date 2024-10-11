import { Chip } from "@nextui-org/react";
import { Item, Material } from "cautelas";
import { Dispatch, SetStateAction } from "react";

export default function ChipsMaterial({
  itens,
  setItens,
  setMateriais
}:{
  itens:(Item | Material)[],
  setItens:Dispatch<SetStateAction<Item[]>>,
  setMateriais:Dispatch<SetStateAction<Material[]>>
}) {
    const handleClose = (item:Item | Material) => {
        item instanceof Item ? 
        setItens(itens => itens.filter(i => item.nome !== i.nome)) :
        setMateriais(itens => itens.filter(i => item.nome !== i.nome))
    }
    
    return (
        !!itens.length && <div className="flex flex-wrap gap-2 px-1 py-2 my-1">
              {itens.map((item) => <Chip key={item.nome}onClose={() => handleClose(item)}>{item.nome}</Chip>)}
            </div>
    )
}