import { Select, SelectItem, Selection} from "@nextui-org/react";
import {Item, Itens} from "cautelas";



export default function SelectMaterial({materiais,value,setValues}:{
    materiais:Itens,
    value:Item[],
    setValues:(keys:any)=> void
}) {
  return (
      <Select 
        label="Selecione os materiais"
        isRequired
        variant="underlined"
        selectedKeys={value.map(m => m.id.valor)}
        onChange={e => {
          const selecionados = materiais.todos.filter(m => e.target.value.split(",").includes(m.id.valor))
          setValues(selecionados)
        }}
        selectionMode="multiple"
      >
        {materiais.todos.map((item) => (
          <SelectItem key={item.id.valor}>
            {item.nome}
          </SelectItem>
        ))}
      </Select>
  )
}