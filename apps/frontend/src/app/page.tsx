"use client"

import { Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { useElectron } from "../hooks/useElectron";
import { useRouter } from "next/navigation";
import { ErrosContext } from "../contexts/ErrosContext";

export default function page() {
    const { abrirLivro, novoLivro } = useElectron()

    const router = useRouter()
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const { setLivro } = useContext(LivroContext)
    const { addErro } = useContext(ErrosContext)

    const handleLivro = async (isNew: boolean) => {
        setIsDisabled(true)
        const resp = isNew ? await novoLivro.executar().catch(addErro) : await abrirLivro.executar().catch(addErro)
        if (resp) {
            setLivro(resp)
            router.push("/dashboard/livro/")
            setIsDisabled(false)
        } else setIsDisabled(false)
    }

    return (
        <div className="flex gap-4 justify-center h-screen items-center">
            <Button
                color="primary"
                size="lg"
                isDisabled={isDisabled}
                onPress={() => handleLivro(false)}>
                Abrir Livro
            </Button>
            <Button
                color="secondary"
                size="lg"
                isDisabled={isDisabled}
                onPress={() => handleLivro(true)}>
                Novo Livro
            </Button>
        </div>
    )
}