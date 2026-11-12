# fork-arabia

## Deployment

The site is a static Vite build hosted on Vercel.

- Framework preset: **Vite**. Build output: **`dist/`**.
- The whole deployment contract lives in `vercel.json` at the repository
  root — install and build commands, output directory, the SPA rewrite,
  cache and security headers — so it moves with the repository and does not
  depend on one Vercel account's dashboard settings.
- `package.json` sets `engines.node`, which is the Node version Vercel
  builds with.
- Branch `dev` deploys as a **preview**, branch `main` as **production**.

Run the same build locally:

```sh
npm ci
npm run build
npm run preview
```
