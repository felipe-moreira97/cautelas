import { Select, SelectItem, SharedSelection} from "@nextui-org/react";
import { Militar } from "common";



export default function SelectMilitar({militares,value,setValue}:{
    militares:Militar[],
    value:Militar | undefined,
    setValue:(keys:Militar)=> void
}) {
  return (
      <Select 
        label="Selecione o militar"
        isRequired
        variant="underlined"
        selectedKeys={value && [value.id.valor]}
        onChange={e => {
            const militar = militares.find(m => m.id.valor === e.target.value) as Militar
            setValue(militar)
        }}
      >
        {militares.map((militar) => (
          <SelectItem key={militar.id.valor}>
            {militar.nome.completo}
          </SelectItem>
        ))}
      </Select>
  )
}