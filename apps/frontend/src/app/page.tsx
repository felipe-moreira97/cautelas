"use client"

import { Button } from "@nextui-org/react";
import { Livro } from "cautelas";
import { Militar } from "common";
import { useContext } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { setLivroMilitares } from "../contexts/LivroProvider";
import { useElectron } from "../hooks/useElectron";
import { useRouter } from "next/navigation";


export default function page() {
    const { abrirLivro, novoLivro } = useElectron()
    const router = useRouter()

    const { dispatch } = useContext(LivroContext)
    const handleLivro = async (isNew: boolean) => {
        const resp = isNew ? await novoLivro() : await abrirLivro()
        if (resp) {
            const data = {
                livro: new Livro(resp.livro),
                militares: resp.militares.map(m => new Militar(m))
            }
            setLivroMilitares({ dispatch, data })
            router.push("/dashboard/livro")
        }
    }

    return (
        <div className="flex gap-4 justify-center">
            <Button color="primary" onPress={() => handleLivro(false)}>Abrir Livro</Button>
            <Button color="secondary" onPress={() => handleLivro(true)}>Novo Livro</Button>
        </div>
    )
}