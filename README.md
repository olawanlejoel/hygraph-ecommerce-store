# Hygraph E-commerce Store Demo

A Next.js e-commerce store demo built to accompany an article on migrating WooCommerce data to [Hygraph](https://hygraph.com) using the Hygraph MCP.

## Branches

| Branch | Description |
|--------|-------------|
| `starter` | Store running on a local WooCommerce-style JSON export — no Hygraph account needed |
| `main` | Same store after migrating all data to Hygraph and switching the data layer to GraphQL |

The `starter` branch is the starting point. The `main` branch shows the end result after migration.

## Pages

- `/` — Home page with hero section and featured products
- `/products` — All products with category filter
- `/products/[slug]` — Product detail with image gallery, stock status, and tags

## Tech Stack

- [Next.js](https://nextjs.org) (Pages Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Hygraph](https://hygraph.com) — Headless CMS (Content API via GraphQL)

## Getting Started (main branch)

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add your Hygraph Content API endpoint:

```bash
cp .env.example .env.local
```

```env
HYGRAPH_ENDPOINT=https://your-region.hygraph.com/v2/your-project-id/master
```

You can find this in your Hygraph project under **Settings → API Access → Content API**.

3. Make sure Public API read access is enabled for `Product` and `Category` models on the `PUBLISHED` stage in your Hygraph project settings.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the store.

## Getting Started (starter branch)

Switch to the `starter` branch — no environment variables needed. The store reads from a local JSON file at `data/woocommerce-products-export.json`.

```bash
git checkout starter
npm install
npm run dev
```
