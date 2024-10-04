"use client"
import { Livro } from "cautelas";
import { createContext, Dispatch, SetStateAction } from "react";

type TypeLivroContext = {
    livro: Livro,
    setLivro: Dispatch<SetStateAction<Livro>>
}


export const LivroContext = createContext<TypeLivroContext>(
    {
        livro: new Livro({
                cautelas:[],
                itens:[],
                militares:[]
            }),
        setLivro:() => null
    }
);
