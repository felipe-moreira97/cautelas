"use client"
import { useState } from "react"
import { ErrosContext } from "./ErrosContext"

export default function ErrosProvider({ children }: { children: React.ReactNode }) {
    const [erros, setErrosInit] = useState<Error[]>([])
    const setErros = (erro:Error) => {
            setErrosInit((listaDeErros:Error[]) => {
            const novaLista = [...listaDeErros]
            novaLista.push(erro)
            return novaLista
        })
    }   

    return (
        <ErrosContext.Provider value={{ erros, setErros }}>
            {children}
        </ErrosContext.Provider>
    )
}
