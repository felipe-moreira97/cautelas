import dynamic from 'next/dynamic'


const LivroProvider = dynamic(() => import('../contexts/LivroProvider'), { ssr: false })

export function ClientOnly({children}:{
    children:React.ReactNode
}) {
    return (
    <LivroProvider>
        {children}
    </LivroProvider>
    )
}