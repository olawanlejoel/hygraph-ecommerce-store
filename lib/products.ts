import { Product } from "@/types";

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT!;

async function fetchHygraph<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`Hygraph request failed: ${res.statusText}`);

  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);

  return data;
}

const PRODUCT_FIELDS = `
  id
  name
  slug
  sku
  shortDescription
  description { html }
  price
  salePrice
  currency
  inStock
  stockQuantity
  tags
  imageUrl
  imageUrls
  categories {
    id
    name
    slug
  }
`;

export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchHygraph<{ products: Product[] }>(`
    query {
      products {
        ${PRODUCT_FIELDS}
      }
    }
  `);
  return data.products;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const data = await fetchHygraph<{ product: Product | null }>(
    `
    query GetProduct($slug: String!) {
      product(where: { slug: $slug }) {
        ${PRODUCT_FIELDS}
      }
    }
  `,
    { slug }
  );
  return data.product ?? undefined;
}

export async function getAllCategories(): Promise<string[]> {
  const data = await fetchHygraph<{ categories: { name: string }[] }>(`
    query {
      categories(orderBy: name_ASC) {
        name
      }
    }
  `);
  return data.categories.map((c) => c.name);
}
