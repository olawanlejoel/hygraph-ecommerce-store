import productsData from "@/data/woocommerce-products-export.json";
import { Product } from "@/types";

export function getAllProducts(): Product[] {
  return productsData.products as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.products.find((p) => p.slug === slug) as Product | undefined;
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  productsData.products.forEach((p) => {
    p.categories.forEach((c) => categories.add(c));
  });
  return Array.from(categories).sort();
}
