"use client"
import { Livro } from "cautelas"
import { useState } from "react"
import { LivroContext } from "./LivroContext"

const initialState: Livro = new Livro({
        cautelas:[],
        itens:[],
        militares:[]
       })

export default function LivroProvider({ children }: { children: React.ReactNode }) {
    const [livro, setLivro] = useState(initialState)
    return (
        <LivroContext.Provider value={{ livro, setLivro }}>
            {children}
        </LivroContext.Provider>
    )


}