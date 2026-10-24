import { defineConfig } from 'astro/config'

// Na Vercel, aponta pro domínio de produção (o próprio, se houver; senão o .vercel.app).
// Localmente fica vazio e as meta tags de preview (og:image) não são geradas.
const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL

export default defineConfig({
  site: domain ? `https://${domain}` : undefined,
})
