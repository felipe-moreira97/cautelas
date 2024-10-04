import { Select, SelectItem, SharedSelection} from "@nextui-org/react";
import { Categoria } from "cautelas";



export default function SelectCategoria({categorias,value,setValue}:{
    categorias:Categoria[],
    value:Categoria | undefined,
    setValue:(keys:Categoria)=> void
}) {
  return (
      <Select 
        label="Selecione a categoria"
        isRequired
        variant="underlined"
        selectedKeys={value && [value.id.valor]}
        onChange={e => {
          const selecionado = categorias.find(c => c.id.valor === e.target.value)
          selecionado && setValue(selecionado)
        }}
      >
        {categorias.map((categoria) => (
          <SelectItem key={categoria.id.valor}>
            {categoria.nome.completo}
          </SelectItem>
        ))}
      </Select>
  )
}