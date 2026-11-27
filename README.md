# Essência & Arte

Loja online. Frontend em `frontend/` (Next.js, React, TypeScript, Tailwind CSS). Backend em `backend/` (Express, Prisma, PostgreSQL).

## Rodando localmente

1. Backend: copie `backend/.env.example` para `backend/.env`, ajuste `DATABASE_URL` para um PostgreSQL local, depois:
   ```
   cd backend
   npm install
   npm run prisma:migrate
   npm run prisma:seed
   npm run dev
   ```
   API sobe em `http://localhost:3333`.

   > **Windows:** antes de rodar `npm run prisma:generate` (ou `prisma:migrate`, que também gera o client), pare o
   > servidor de desenvolvimento (`npm run dev`). No Windows o arquivo da query engine do Prisma fica aberto/travado
   > enquanto o servidor está rodando, e o `generate` falha com um erro `EPERM: operation not permitted, rename ...`.

2. Frontend: configure `NEXT_PUBLIC_API_URL` em `frontend/.env.local` apontando para a API (padrão `http://localhost:3333`), depois:
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Loja sobe em `http://localhost:3000`.
