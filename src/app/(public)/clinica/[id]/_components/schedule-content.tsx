"use client"

import Image from "next/image"
import imgTest from "../../../../../../public/image.png"
import { MapPin } from "lucide-react"

export function ScheduleContent(){
    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500" />

            <section className="container mx-auto px-4 -mt-16">
                <div className="max-w-2xl mx-auto">
                    <article className="flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
                            <Image
                                fill
                                src={imgTest}
                                alt="Foto da Clinica"
                                className="object-cover"
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">Clinica Teste</h1>

                        <div className="flex gap-1 items-center">
                            <MapPin className="w-5 h-5" />
                            <span>Endereço não Informado</span>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    )
}