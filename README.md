# OdontoPro

**Sistema completo para gestão de clínicas odontológicas**  
_Aula atual: 54 (início do projeto)_

<div align="center">

<img src="./public/assets/prints/home.png" alt="Home" />
<img src="./public/assets/prints/dashboard.png" alt="Dashboard" />
<img src="./public/assets/prints/services.png" alt="Serviços" />
<img src="./public/assets/prints/profile.png" alt="Perfil do Paciente" />
<img src="./public/assets/prints/plans.png" alt="Planos e Convênios" />

</div>

---

# Tecnologias

<div align="center">

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?style=flat-square&logo=shadcnui)](https://ui.shadcn.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![NextAuth v5](https://img.shields.io/badge/NextAuth-v5_beta-000000?style=flat-square&logo=nextdotjs)](https://authjs.dev/)

</div>

---

# Como rodar

```bash
git clone https://github.com/seu-usuario/odontopro.git
cd odontopro
npm install
cp .env.example .env.local   # configure DATABASE_URL e NEXTAUTH_SECRET
npx prisma migrate dev
npm run dev
```
