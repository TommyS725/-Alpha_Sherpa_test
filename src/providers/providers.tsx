'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes"
import { DelayContextProvider } from "@/contexts/delayContext";



export function Providers(props: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <DelayContextProvider>
                    {props.children}
                </DelayContextProvider>
            </NextThemesProvider>
        </QueryClientProvider>
    )
}