'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes"



export function Provider(props: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {props.children}
            </NextThemesProvider>
        </QueryClientProvider>
    )
}