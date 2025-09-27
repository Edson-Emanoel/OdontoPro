"use client"

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function DialogService(){
    return(
        <>
            <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
                <DialogDescription>
                    Adicione um Novo Serviço
                </DialogDescription>
            </DialogHeader>

            <div>
                <h1>
                    Conteudo Modal
                </h1>
            </div>
        </>
    )
}