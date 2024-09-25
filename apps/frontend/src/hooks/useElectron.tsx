"use client"
import { LivroProps } from "cautelas"
import { MilitarProps } from "common"

export interface electronAPI {
    abrirLivro(): Promise<Data | undefined>,
    novoLivro(): Promise<Data | undefined>,
    salvarLivro(livro: Data): Promise<Data>
}

type Data = {
    livro: LivroProps,
    militares: MilitarProps[]
}

export function useElectron() {
    const { abrirLivro, novoLivro, salvarLivro } = (window as any).electronAPI as electronAPI
    return { abrirLivro, novoLivro, salvarLivro }
}