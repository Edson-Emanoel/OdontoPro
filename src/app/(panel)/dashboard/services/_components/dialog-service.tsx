"use client"

import { Input } from "@/components/ui/input"
import { UseDialogServiceForm } from "./dialog-service-form"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

export function DialogService(){

    const form = UseDialogServiceForm()

    return(
        <>
            <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
                <DialogDescription>
                    Adicione um Novo Serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form>
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">
                                        Nome do Serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite o nome do serviço" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Valor do Serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Ex: 120,00"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p className="font-semibold">Tempo de Duração do Serviço:</p>

                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="hours"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">
                                            Horas:
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="1 h"
                                                min="0"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">
                                            Minutos:
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="20 min"
                                                min="0"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full font-semibold text-white">
                        Adicionar Serviço
                    </Button>

                </form>
            </Form>
        </>
    )
}