"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"
import { Prisma } from "@/generated/prisma"
import imgTest from "../../../../../../public/image.png"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppointmentForm } from "./schedule-form"

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true
    }
}>

interface ScheduleContentProps {
    clinic: UserWithServiceAndSubscription
}

export function ScheduleContent({ clinic }: ScheduleContentProps){

    const form = useAppointmentForm()

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500" />

            <section className="container mx-auto px-4 -mt-16">
                <div className="max-w-2xl mx-auto">
                    <article className="flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
                            <Image
                                fill
                                src={clinic.image ? clinic.image : imgTest}
                                alt="Foto da Clinica"
                                className="object-cover"
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">{clinic.name}</h1>

                        <div className="flex gap-1 items-center">
                            <MapPin className="w-5 h-5" />
                            <span>{clinic.address ? clinic.address : "Endereço não informado" }</span>
                        </div>
                    </article>
                </div>
            </section>


            {/* Form */}
            <Form {...form}>
                <form className="space-y-6 bg-white p-6 border rounded-md shadow-sm mx-2">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem className="my-2">
                            <FormLabel className="font-semibold">Nome Completo:</FormLabel>
                            <FormControl>
                                <Input
                                    id="name"
                                    placeholder="Digite seu Nome Completo..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

        </div>
    )
}