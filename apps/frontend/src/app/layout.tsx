"use client"
import { ClientOnly } from "../components/ClientOnly"
import {NextUIProvider} from "@nextui-org/react";
import "./global.css"
import { useRouter } from "next/navigation";
import ErrosProvider from "../contexts/ErroProvider";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    return (
        <html lang="en">
            <body className="bg-black">
                        <ClientOnly>
                            <NextUIProvider navigate={router.push}>
                                <ErrosProvider>
                                    <main className="dark text-foreground bg-background min-h-screen">
                                        {children}
                                    </main>
                                </ErrosProvider>
                            </NextUIProvider>
                        </ClientOnly>
            </body>
        </html>
    )
}