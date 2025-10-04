"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

// interface useAppointmentFormProps {
//     name: string | null;
//     address: string | null;
//     phone: string | null;
//     status: boolean;
//     timeZone: string | null;
// }

const appointmentSchema = z.object({
    name: z.string().min(1, { message: "O Nome é Obrigatório" }),
    email: z.string().email("O Email é Obrigatório"),
    phone: z.string().min(1, { message: "O Telefone é Obrigatório" }),
    date: z.date(),
    serviceId: z.string().min(1, { message: "O Id do Serviço é Obrigatório" })
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

export function useAppointmentForm(){
    return useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            date: new Date()
        }
    })
}