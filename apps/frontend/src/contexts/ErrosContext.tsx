"use client"
import { createContext, Dispatch, SetStateAction } from "react";

type TypeErroContext = {
    erros: Error[],
    setErros: Dispatch<SetStateAction<Error[]>>,
    addErro: (erro: Error) => void
}
export const ErrosContext = createContext<TypeErroContext>(
    {
        erros: [],
        addErro: () => null,
        setErros: e => null
    }
);