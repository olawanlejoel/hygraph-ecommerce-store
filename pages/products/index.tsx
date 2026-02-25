import { GetStaticProps } from "next";
import { useState } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, getAllCategories } from "@/lib/products";
import { Product } from "@/types";

export default function ProductsPage({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCategory, setVisibleCategory] = useState("All");
  const [fading, setFading] = useState(false);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    setFading(true);
    setTimeout(() => {
      setVisibleCategory(cat);
      setFading(false);
    }, 150);
  };

  const filtered =
    visibleCategory === "All"
      ? products
      : products.filter((p) =>
          p.categories.some((c) => c.name === visibleCategory)
        );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            All Products
          </h1>
          <p className="text-gray-400 text-sm">
            {filtered.length} of {products.length} products
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className={`transition-opacity duration-150 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return { props: { products, categories } };
};
