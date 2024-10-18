import { Card, CardHeader, CardBody, Button, CircularProgress } from "@nextui-org/react";
import { CloseIcon } from "./icons/CloseIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function CardErro({ erro, setErros, key }: {
    erro: Error,
    setErros: Dispatch<SetStateAction<Error[]>>,
    key?: string | number
}) {
    const [value, setValue] = useState(0);

    const fechaCard = () => setErros(erros => erros.filter(e => !(e === erro)))

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(v => {
                v >= 100 && fechaCard()
                return v + 1
            })
        }, 50)
        return () => clearInterval(interval)
    }, []);
    return (
        <Card className="w-[300px] p-1 bg-red-500" key={key}>
            <CardHeader className="flex  justify-end p-0 px-1 pt-1 text-default-800">
                <CircularProgress 
                    size="sm"
                    strokeWidth={1.5}
                    classNames={{ indicator: "stroke-red-500", track:"stroke-default-500" }}
                    disableAnimation
                    isIndeterminate
                    value={value}
                    valueLabel={
                    <Button 
                        isIconOnly 
                        onPress={fechaCard} 
                        size="sm" 
                        radius="full" 
                        className="bg-transparent text-deault-800 hover:bg-default-800/[0.15]">
                        <CloseIcon height={24} width={24} />
                    </Button>
                    }
                    showValueLabel
                />
            </CardHeader>
            <CardBody className="p-0 px-3 pb-3 text-small text-default-800">
                <p className="p-0 m-0">
                    {erro.message}
                </p>
            </CardBody>
        </Card>
    )
}