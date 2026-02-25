import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const isOnSale = product.sale_price !== "";
  const isOutOfStock = product.stock_status === "outofstock";
  const displayPrice = isOnSale ? product.sale_price : product.regular_price;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200">
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          {product.images[0] && (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                isOutOfStock ? "opacity-50" : ""
              }`}
            />
          )}
          {isOnSale && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
          {isOutOfStock && (
            <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400 font-medium mb-1">
            {product.categories[0]}
          </p>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 mb-3">
            {product.short_description}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">${displayPrice}</span>
            {isOnSale && (
              <span className="text-sm text-gray-400 line-through">
                ${product.regular_price}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
