"use client"

import { QueryClient,QueryClientProvider} from "@tanstack/react-query"

const newClient=new QueryClient()

export  const ReactQueryProvider=({children})=>{

    return (
        <QueryClientProvider client={newClient}>
            {children}
        </QueryClientProvider>
    )

}