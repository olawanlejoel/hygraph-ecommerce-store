import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";
import { Product } from "@/types";

export default function Home({ featured }: { featured: Product[] }) {
  const heroProduct = featured[0];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                Free shipping on orders over $99
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
                Premium tech,
                <br />
                curated for you.
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
                Discover the latest laptops, smartphones, audio gear, and
                accessories — all in one place.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Browse all products
                <span>→</span>
              </Link>
            </div>

            {/* Featured image */}
            {heroProduct?.images[0] && (
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={heroProduct.images[0].src}
                    alt={heroProduct.images[0].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-xs text-gray-400 leading-none mb-0.5">
                      Featured
                    </p>
                    <p className="text-sm font-semibold text-gray-900 leading-none">
                      {heroProduct.name.split(" ").slice(0, 4).join(" ")}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 ml-2">
                    ${heroProduct.sale_price || heroProduct.regular_price}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Hand-picked just for you
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gray-900 rounded-2xl px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Explore the full catalogue
          </h2>
          <p className="text-gray-400 mb-6">
            10 premium products across 5 categories
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Shop now →
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const featured = getAllProducts().slice(0, 4);
  return { props: { featured } };
};
