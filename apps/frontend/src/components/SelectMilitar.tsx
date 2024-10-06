import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Militar } from "common";



export default function SelectMilitar({ militares, value, setValue }: {
  militares: Militar[],
  value: Militar | undefined,
  setValue: (keys: Militar) => void
}) {
  return (
    <Autocomplete
      allowsCustomValue
      label="Selecione o militar"
      variant="underlined"
      defaultItems={militares}
      selectedKey={value && value.id.valor}
      onSelectionChange={key => {
        const militar = militares.find(m => m.id.valor === key) as Militar
        setValue(militar)
      }}
    >
      {(militar) => <AutocompleteItem key={militar.id.valor}>{militar.nome.completo}</AutocompleteItem>}
    </Autocomplete>
  )
}