import { useContext } from "react";
import { LivroContext } from "../contexts/LivroContext";
import { useReactTable, getCoreRowModel,flexRender } from "@tanstack/react-table";

type TableData = {
    categoria:string,
    todos:number,
    disponiveis:number,
    cautelados:number
}

export default function Tabela() {
    const { state } = useContext(LivroContext)
    const { livro } = state
    const cautelados = livro.itensCautelados.porCategorias
    const disponiveis = livro.itensDisponiveis.porCategorias
    const todos = livro.itens.porCategorias

    const data:TableData[] = todos.map((i,j) => ({
            categoria: i.categoria.nome.completo,
            todos:i.itens.length,
            cautelados:cautelados[j].itens.length,
            disponiveis:disponiveis[j].itens.length
        }))

    const columns = [
        {
            header:'Cateogria',
            accessorKey:'categoria'
        },
        {
        header: 'Todos',
        accessorKey: 'todos'
        },
        {
        header: 'Cautelados',
        accessorKey: 'cautelados'
        },
        {
        header: 'Disponíveis',
        accessorKey: 'disponiveis'
        },
    ]
    
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

    return (
            <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
            </table>
    )
}