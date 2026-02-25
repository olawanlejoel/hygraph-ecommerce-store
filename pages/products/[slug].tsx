import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Layout from "@/components/Layout";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { Product } from "@/types";

export default function ProductPage({ product }: { product: Product }) {
  const isOnSale = product.salePrice != null;
  const isOutOfStock = !product.inStock;
  const displayPrice = isOnSale ? product.salePrice : product.price;
  const [activeImage, setActiveImage] = useState(0);

  const images = product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>
          Back to products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              {images[activeImage] && (
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-200"
                  priority
                />
              )}
              {isOnSale && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                  Sale
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border-2 transition-colors cursor-pointer ${
                      activeImage === i
                        ? "border-gray-900"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs text-gray-600 font-medium bg-gray-100 px-2.5 py-1 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-gray-400 mb-4">SKU: {product.sku}</p>
            <p className="text-gray-500 leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                ${displayPrice}
              </span>
              {isOnSale && (
                <span className="text-xl text-gray-300 line-through">
                  ${product.price}
                </span>
              )}
              {isOnSale && (
                <span className="text-sm font-semibold text-orange-500">
                  Save ${(product.price - product.salePrice!).toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="mb-6">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-2 text-sm text-red-500 font-medium">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  Out of stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-green-600 font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  In stock &mdash; {product.stockQuantity} available
                </span>
              )}
            </div>

            {/* CTA */}
            <button
              disabled={isOutOfStock}
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-8 cursor-pointer"
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full description */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            About this product
          </h2>
          <div
            className="product-description max-w-2xl"
            dangerouslySetInnerHTML={{ __html: product.description.html }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await getProductBySlug(params?.slug as string);
  if (!product) return { notFound: true };
  return { props: { product } };
};
