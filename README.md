- Usa o NextJS(Framework)
- Usa o Shadcn/Ui(Componentes Visuais)
- Usa o TailwindCss(Estilização)
- Usa o AuthJS(Autenticação)
- Usa o Prisma(ORM)
- Usa o NeonDB(Banco de Dados, ou seja, postgresql)

npx create-next-app@latest

npx shadcn@latest init

npm install lucide-react

npx shadcn@latest add sheet
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add collapsible

npm install prisma --save-dev
npx prisma init
npm install @prisma/client
npx prisma generate
npx prisma format(opcional, serve para formatar o 'schema.prisma')
npx prisma migrate dev(obrigatório após alguma alteração no 'schema.prisa')

npm install next-auth@beta
npx auth secret(gera uma senha, no '.env.local', e pode ser gerada varias vezes)
npm install @auth/prisma-adapter