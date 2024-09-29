import { Select, SelectItem, SharedSelection} from "@nextui-org/react";
import { Categoria } from "cautelas";



export default function SelectCategoria({categorias,value,setValue}:{
    categorias:Categoria[],
    value:string,
    setValue:(keys:string)=> void
}) {
  return (
      <Select 
        label="Selecione a categoria"
        isRequired
        variant="underlined"
        selectedKeys={[value]}
        onChange={e => setValue(e.target.value)}
      >
        {categorias.map((categoria) => (
          <SelectItem key={categoria.id.valor}>
            {categoria.nome.completo}
          </SelectItem>
        ))}
      </Select>
  )
}