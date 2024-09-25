"use client"
import { useContext } from "react";
import { Button } from "../src/components/Button";
import { useElectron } from "../src/hooks/useElectron";
import { LivroContext } from "../src/contexts/LivroContext";
import { Livro } from "cautelas";
import { Militar } from "common";
import { setLivroMilitares } from "../src/contexts/LivroProvider";

export default function InitialPage() {
    const { abrirLivro, novoLivro } = useElectron()
    const { dispatch } = useContext(LivroContext)
    const handleLivro = async (isNew: boolean) => {
        const resp = isNew ? await novoLivro() : await abrirLivro()
        if (resp) {
            const data = {
                livro: new Livro(resp.livro),
                militares: resp.militares.map(m => new Militar(m))
            }
            setLivroMilitares({ dispatch, data })
        }
    }

    return (
        <div>
            <Button funcao={() => handleLivro(false)}>Abrir Livro</Button>
            <Button funcao={() => handleLivro(true)}>Novo Livro</Button>

        </div>
    )
}