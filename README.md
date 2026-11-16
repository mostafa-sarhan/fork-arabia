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

## Launch checklist

> **Before launch the site is hidden from search engines. On launch day,
> this MUST be undone, or Google will never index the site.**

- [x] **Remove the `X-Robots-Tag: noindex, nofollow` header** (done 2026-11-16) from
      `vercel.json` (the `"source": "/(.*)"` block). It is sent with every
      page and file, so while it is there no search engine indexes or
      follows anything on the site. After deploying, check that it is gone:
      `curl -sI https://forkarabia.sa | grep -i x-robots-tag` should print
      nothing.
