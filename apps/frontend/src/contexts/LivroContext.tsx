"use client"
import { Livro } from "cautelas";
import { Militar } from "common";
import { createContext, Dispatch } from "react";

type TypeLivroContext = {
    state: {
        livro: Livro,
        militares: Militar[]
    },
    dispatch: Dispatch<any>
}


export const LivroContext = createContext<TypeLivroContext>(
    {
        state: {
            livro: null,
            militares: [],
        },
        dispatch: null
    }
);
