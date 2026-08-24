import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-6xl font-bold text-[#FF052B]">404</p>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-[#FF052B] px-6 py-3 text-sm font-semibold text-white"
            >
              Go Home
            </Link>
            <Link
              href="/properties/"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
