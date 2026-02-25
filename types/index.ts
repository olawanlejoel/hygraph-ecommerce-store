export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
  position: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  type: string;
  status: string;
  short_description: string;
  description: string;
  regular_price: string;
  sale_price: string;
  currency: string;
  stock_status: string;
  stock_quantity: number;
  categories: string[];
  tags: string[];
  images: ProductImage[];
}
