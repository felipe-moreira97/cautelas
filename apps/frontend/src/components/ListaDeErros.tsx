"use client"
import { useContext } from "react"
import { ErrosContext } from "../contexts/ErrosContext"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { CloseIcon } from "./icons/CloseIcon"
import CardErro from "./CardErro"

export default function ListaDeErros() {
    const { erros, setErros } = useContext(ErrosContext)
    return (
        <div className="absolute bottom-0 right-0 m-5 flex flex-col-reverse gap-2">
            {erros.map(erro => (
                <CardErro erro={erro} setErros={setErros} key={erro.message} />
            ))}
        </div>
    )
}