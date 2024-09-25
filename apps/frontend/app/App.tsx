"use client"
import { useContext } from "react";
import { LivroContext } from "../src/contexts/LivroContext";
import InitialPage from "./InitialPage";

export default function App() {
    const { state } = useContext(LivroContext)

    return (
        state.livro ?
            <div>{JSON.stringify(state.livro)}</div> :
            <InitialPage />

    )
}