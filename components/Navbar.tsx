import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const isActive = (path: string) =>
    router.pathname === path || router.pathname.startsWith(path + "/");

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl tracking-tight text-gray-900">
            TechHaven
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                router.pathname === "/"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors ${
                isActive("/products")
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
