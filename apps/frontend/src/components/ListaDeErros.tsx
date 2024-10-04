"use client"
import { useContext } from "react"
import { ErrosContext } from "../contexts/ErrosContext"

export default function ListaDeErros() {
    const {erros} = useContext(ErrosContext)
    return (
        <div className="absolute bottom-0 right-0 m-5">
                {erros.map(erro => (
                    <p>
                        {erro.message}
                    </p>
                ))}
            </div>
    )
}