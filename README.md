```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## GitHub Pages

Generate static output for GitHub Pages:

```txt
npm run build:github-pages
```

This creates `docs/index.html`.  
Push to `main` and GitHub Actions (`.github/workflows/deploy-pages.yml`) deploys it to GitHub Pages.
