# TechHaven — Hygraph E-Commerce Demo

A Next.js e-commerce storefront built as a companion to the article **"Migrating WooCommerce Data to Hygraph with the MCP"**.

This `starter` branch is the **starting point** — the store runs entirely off a local WooCommerce-style JSON export. By the end of the article you will have migrated all that data into Hygraph and switched the data layer to fetch from the API.

## What's inside

```
├── data/
│   └── woocommerce-products-export.json  # Local product data (WooCommerce export format)
├── lib/
│   └── products.ts       # Data helpers — getAllProducts, getProductBySlug, getAllCategories
├── types/
│   └── index.ts          # Product & ProductImage TypeScript types
├── components/
│   ├── Layout.tsx         # Page wrapper (Navbar + Footer)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx    # Reusable product card
└── pages/
    ├── index.tsx                  # Home — hero + featured products
    ├── products/index.tsx         # All products + category filter
    └── products/[slug].tsx        # Product detail with image gallery
```

## Pages

| Route | Description |
|---|---|
| `/` | Hero section + 4 featured products + CTA banner |
| `/products` | Full product grid with category filter pills |
| `/products/[slug]` | Product detail — images, price, stock, tags, description |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the store.

No environment variables needed for this branch — data is read directly from the local JSON file.

## Stack

- [Next.js 16](https://nextjs.org) (Pages Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript

## What comes next

The `main` branch continues from here and connects the store to [Hygraph](https://hygraph.com) — replacing `lib/products.ts` with GraphQL queries against the Hygraph Content API.
