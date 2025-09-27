import prisma from "./prisma"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [GitHub],
  adapter: PrismaAdapter(prisma) as Adapter
})