export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: { html: string };
  price: number;
  salePrice: number | null;
  currency: string;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  imageUrl: string;
  imageUrls: string[];
  categories: ProductCategory[];
}
