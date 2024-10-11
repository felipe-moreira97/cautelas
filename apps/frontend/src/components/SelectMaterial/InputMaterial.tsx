import {Input} from "@nextui-org/react";

export default function InputMaterial({value,setValue}) {
  return (
      <Input
        label="Materiais"
        variant="underlined"
        value={value}
        onValueChange={setValue}
        isClearable
      />
  );
}