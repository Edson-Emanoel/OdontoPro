"use server"

import z from "zod"
import prisma from "@/lib/prisma"
import getSession from "@/lib/getSession"
import { revalidatePath } from "next/cache"

const formSchema = z.object({
    name: z.string().min(1, { message: "O Nome é Obrigatório" }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.boolean(),
    timeZone: z.string(),
    times: z.array(z.string()),
})

type FormSchema = z.infer<typeof formSchema>

export async function updateProfile(formData: FormSchema){

    const session = await getSession()
    
    if(!session?.user.id){
        return {
            error: "Usuário não Encontrado!"
        }
    }

    const schema = formSchema.safeParse(formData)

    if(!schema.success){
        return {
            error: "Preencha todos os Campos"
        }
    }

    try {
        
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                status: formData.status,
                timeZone: formData.timeZone,
                times: formData.times || []
            }
        })

        revalidatePath("/dashboard/profile")

        return {
            success: "Clinica Atualizada com Sucesso!"
        }

    } catch (err) {
        console.log(err);
        return {
            error: "Falha ao atualizar a clinica"
        }
    }
}