"use client"
import { createContext } from "react";

type TypeErroContext = {
    erros: Error[],
    setErros: (erro:Error) => void
}
export const ErrosContext = createContext<TypeErroContext>(
    {
        erros: [],
        setErros:() => null
    }
);