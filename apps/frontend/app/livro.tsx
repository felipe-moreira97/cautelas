"use client"
import { useState } from "react";
import { Button } from "../src/components/Button";
import NovoItem from "../src/components/NovoItem";
import Tabela from "../src/components/Tabela";


export default function Livro() {
    const [visivel,setVisivel] = useState(false)

    return (
            <header>
                <Button funcao={()=> setVisivel(true)}>Incluir Item</Button>
                <Button funcao={()=> {throw new Error('click')}}>Fechar Livro</Button>
                <NovoItem visivel={visivel} setVisivel={setVisivel}/>
                <Tabela />
            </header>
    )
}