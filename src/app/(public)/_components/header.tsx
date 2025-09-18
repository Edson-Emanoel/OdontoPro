"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Logo from "/public/logo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";

export function Header (){
    const [isOpen, setIsOpen] = useState(false)

    const session = null;

    const navItems = [
        { href: "#profissionais", label: "Profissionais" }
    ]

    const NavLinks = () => (
        <>
            {navItems.map((item) => (
                <Button
                    asChild
                    key={item.href}
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-transparent text-black shadow-none"
                >
                    <Link href={item.href} className="text-base">{item.label}</Link>
                </Button>
            ))}

            {session ? (
                <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2"
                >
                    Acessar Clínica
                </Link>
            ) : (
                <Button className="cursor-pointer flex gap-2 items-center">
                    <LogIn />
                    Portal da Clínica
                </Button>
            )}
        </>
    )

    return(
        <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white">
            <div className="container mx-auto flex items-center justify-between">
                <Link
                    href="/"
                >
                    <Image
                        src={Logo}
                        alt="Logo"
                    />
                </Link>

                <nav className="hidden md:flex items-center space-x-4">
                    <NavLinks />
                </nav>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="flex items-center md:hidden">
                        <Button
                            className="text-black hover:bg-transparent"
                            variant="ghost"
                            size="icon"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-[240px sm:w-[300px] z-[9999]">
                        
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>

                            <SheetDescription>
                                Veja nosso Links
                            </SheetDescription>
                        </SheetHeader>

                        <nav className="flex flex-col space-y-4 mt-6">
                            <NavLinks />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}