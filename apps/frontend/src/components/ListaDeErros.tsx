"use client"
import { useContext } from "react"
import { ErrosContext } from "../contexts/ErrosContext"
import CardErro from "./CardErro"

export default function ListaDeErros() {
    const { erros, setErros } = useContext(ErrosContext)
    return (
        <div className="fixed bottom-0 right-0 p-5 flex flex-col-reverse gap-2">
            {erros.map(erro => (
                <CardErro erro={erro} setErros={setErros} key={erro.message} />
            ))}
        </div>
    )
}