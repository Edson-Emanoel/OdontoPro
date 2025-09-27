"use client"

import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPhone } from "@/utils/formatPhone";
import { Prisma } from "@/generated/prisma/client";
import imgTest from "../../../../../../public/image.png";
import { updateProfile } from "../_actions/update-profile";
import { ProfileFormData, useProfileForm } from "./profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
    }
}>

interface ProfileContentProps {
    user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps){    
    const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? []);
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone
    });


    function generateTimeSlots(): string[] {
        const hours: string[] = [];

        for(let i = 8; i <= 23; i++){
            for (let j = 0; j < 2; j++){
                const hour = i.toString().padStart(2, "0");
                const minute = (j * 30).toString().padStart(2, "0")

                hours.push(`${hour}:${minute}`)
            }
        }

        return hours
    }

    const hours = generateTimeSlots();

    function toggleHour(hour: string){
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort())
    }

    const timeZones = Intl.supportedValuesOf("timeZone").filter((zone) => 
        zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife") ||
        zone.startsWith("America/Bahia") ||
        zone.startsWith("America/Belem") ||
        zone.startsWith("America/Manaus") ||
        zone.startsWith("America/Cuiaba") ||
        zone.startsWith("America/Boa_Vista")
    )

    async function onSubmit(values: ProfileFormData) {
        const response = await updateProfile({
            name: values.name,
            address: values.address,
            status: values.status === "active" ? true : false,
            phone: values.phone,
            timeZone: values.timeZone,
            times: selectedHours || []
        })

        if(response.error){
            toast.error(response.error)
            return;
        }
        
        toast.success("Clinica Atualizada com Sucesso")
    }

    return(
        <div className="mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Meu Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center">
                                <div className="bg-gray-200 relative w-40 h-40 rounded-full overflow-hidden">
                                    <Image
                                        src={user.image ? user.image : imgTest}
                                        alt="Foto de Perfil"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">Nome Completo:</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Digite seu Nome Completo" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">Endereço Completo:</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Digite seu Endereço" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">Telefone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Ex: (62) 99334-5475"
                                                    onChange={(e) => {
                                                        const formattedValue = formatPhone(e.target.value)
                                                        field.onChange(formattedValue)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Status da Clinica
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value ? "active" : "inactive"}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione seu Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">ATIVO (Clinica Aberta)</SelectItem>
                                                        <SelectItem value="inactive">INATIVO (Clinica Fechada)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <div className="space-y-2">
                                    <Label>Configurar horários da clinica</Label>

                                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between">
                                                Clique aqui para selecionar horários
                                                <ArrowRight className="w-5 h-5"/>
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Horários da Clinica</DialogTitle>
                                                <DialogDescription>
                                                    Selecione abaixo os horários de funcionamento da clinica
                                                </DialogDescription>
                                            </DialogHeader>

                                            <section className="py-4">
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Clique nos horários para marcar ou desmacar:
                                                </p>

                                                <div className="grid grid-cols-5 gap-2">
                                                    {hours.map((hour) => (
                                                        <Button 
                                                            key={hour}
                                                            variant="outline"
                                                            className={cn('h-10', selectedHours.includes(hour) && 'border-2 border-emerald-400')}
                                                            onClick={() => toggleHour(hour)}
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>

                                            <Button className="w-full bg-emerald-400" onClick={() => setDialogIsOpen(false)}>
                                                Salvar Horários
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                

                                <FormField
                                    control={form.control}
                                    name="timeZone"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Selecione o Fuso Horário
                                            </FormLabel>
                                            <FormControl>

                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o seu fuso horário" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZones.map((zone) => (
                                                            <SelectItem key={zone} value={zone}>
                                                                {zone}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-emerald-500 hover:bg-emerald-400 transition-colors"
                                >
                                    Salvar Alterações
                                </Button>

                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}