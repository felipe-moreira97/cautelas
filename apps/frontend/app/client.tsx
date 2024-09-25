import dynamic from 'next/dynamic'


const App = dynamic(() => import('./Provider'), { ssr: false })

export function ClientOnly() {
    return <App />
}