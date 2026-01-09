This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on GitHub Pages

Este projeto está configurado para ser automaticamente implantado no GitHub Pages.

### Configuração Inicial

1. No repositório do GitHub, vá em **Settings** > **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. O workflow já está configurado em `.github/workflows/deploy.yml`

### Deploy Manual

Se quiser fazer o build e testar localmente:

```bash
# Build para produção
npm run build

# O site será gerado na pasta /out
```

### Deploy Automático

Cada push na branch `main` irá automaticamente:
1. Fazer o build do projeto
2. Fazer deploy para o GitHub Pages
3. O site estará disponível em: https://verronebrunaa.github.io/solar-power/

### Notas Importantes

- As imagens estão configuradas com `unoptimized: true` para funcionar no GitHub Pages
- O `basePath` está configurado como `/solar-power` em produção
- O arquivo `.nojekyll` garante que o GitHub Pages não processe o site como Jekyll

