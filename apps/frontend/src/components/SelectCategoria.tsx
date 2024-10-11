import { Select, SelectItem } from "@nextui-org/react";
import {SelectCategoriaType} from "./IncluirMaterialModal"


export default function SelectCategoria({categorias,value,setValue}:{
    categorias:SelectCategoriaType[],
    value:SelectCategoriaType | undefined,
    setValue:(keys:SelectCategoriaType)=> void
}) {
  return (
      <Select 
        label="Selecione a categoria"
        isRequired
        variant="underlined"
        selectedKeys={value && [value.nome]}
        onChange={e => {
          const selecionado = categorias.find(c => c.nome === e.target.value)
          selecionado && setValue(selecionado)
        }}
      >
        {categorias.map((categoria) => (
          <SelectItem key={categoria.nome}>
            {categoria.nome}
          </SelectItem>
        ))}
      </Select>
  )
}