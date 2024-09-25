import { LivroProvider } from "../src/contexts/LivroProvider"
import App from "./App"

export default function Provider() {
    return (
        <LivroProvider>
            <App />
        </LivroProvider>
    )
}