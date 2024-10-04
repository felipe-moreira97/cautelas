import { Chip, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import {Item, Itens} from "cautelas";
import { Dispatch, SetStateAction } from "react";

export default function SelectMaterial({materiais,value,setValues,erro}:{
    materiais:Itens,
    value:Item[],
    setValues:Dispatch<SetStateAction<Item[]>>,
    erro?:boolean
}) {
  return (
      <Select 
        label="Selecione os materiais"
        isRequired
        items={materiais.todos}
        isMultiline={true}
        variant="underlined"
        errorMessage={erro ? "Você deve selecionar ao menos um material" : ""}
        isInvalid={erro}
        selectedKeys={value.map(m => m.id.valor)}
        onChange={e => {
          const selecionados = materiais.todos.filter(m => e.target.value.split(",").includes(m.id.valor))
          setValues(selecionados)
        }}
        selectionMode="multiple"
        renderValue={(items: SelectedItems<Item>) => {
          return (
            <div className="flex flex-wrap gap-2 mb-1">
              {items.map((item) => (
                <Chip key={item.key}onClose={() => setValues(selecionados => selecionados.filter(i => i.id.valor !== item.data?.id.valor))}>{item.data?.nome}</Chip>
              ))}
            </div>
          );
        }}
      >
        {(item) => (
          <SelectItem key={item.id.valor}>
            {item.nome}
          </SelectItem>
        )}
      </Select>
  )
}
