"use client"
import { useState } from "react"
import { ErrosContext } from "./ErrosContext"

export default function ErrosProvider({ children }: { children: React.ReactNode }) {
    const [erros, setErros] = useState<Error[]>([])
    const addErro = (erro: Error) => {
        setErros((listaDeErros: Error[]) => {
            const novaLista = [...listaDeErros]
            novaLista.push(erro)
            return novaLista
        })
    }

    return (
        <ErrosContext.Provider value={{ erros, setErros, addErro }}>
            {children}
        </ErrosContext.Provider>
    )
}
