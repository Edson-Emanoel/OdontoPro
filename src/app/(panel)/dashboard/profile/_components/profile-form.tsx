import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

interface useProfileFormProps {
    name: string | null;
    address: string | null;
    phone: string | null;
    status: boolean;
    timeZone: string | null;
}

const profileSchema = z.object({
    name: z.string().min(1, { message: "O Nome é Obrigatório" }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(),
    timeZone: z.string().min(1, { message: "O Fuso Horário é Obrigatório" }),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export function useProfileForm({ name, address, phone, status, timeZone }: useProfileFormProps){
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: name         || "",
            address: address   || "",
            phone: phone       || "",
            status: status     ? "active" : "inactive",
            timeZone: timeZone || ""
        }
    })
}