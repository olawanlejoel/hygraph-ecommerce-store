import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg tracking-tight text-gray-900">
          TechHaven
        </Link>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} TechHaven. All rights reserved.
        </p>
        <p className="text-sm text-gray-400">
          Powered by{" "}
          <span className="font-medium text-gray-500">Hygraph</span>
        </p>
      </div>
    </footer>
  );
}
