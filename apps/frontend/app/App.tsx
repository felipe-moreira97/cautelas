"use client"
import { useContext } from "react";
import { LivroContext } from "../src/contexts/LivroContext";
import InitialPage from "./InitialPage";
import Livro from "./Livro";

export default function App() {
    const { state } = useContext(LivroContext)

    return (
        state.livro ?
            <Livro/> :
            <InitialPage />

    )
}