import { useContext } from "react";
import { LivroContext } from "../src/contexts/LivroContext";
import { useReactTable } from "@tanstack/react-table";

export default function Livro() {
    const { state, dispatch } = useContext(LivroContext)

    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })
    return (
        <p>{JSON.stringify(state.livro.itensDisponiveis.porCategorias)}</p>
    )
}