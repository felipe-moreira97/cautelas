export function Button({ children, funcao }: { children: React.ReactNode, funcao: () => any }) {
    return (
        <button onClick={funcao}>
            {children}
        </button>
    )
}