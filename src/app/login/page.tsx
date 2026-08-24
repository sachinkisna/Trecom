"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";

function LoginForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || undefined);
    setSubmitted(true);
    setTimeout(() => router.push(redirect), 1500);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <div className="flex rounded-xl bg-slate-100 p-1">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
              mode === m ? "bg-white text-[#064b35] shadow-sm" : "text-slate-500"
            }`}
          >
            {m === "login" ? "Login" : "Register"}
          </button>
        ))}
      </div>

      {submitted ? (
        <div className="py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef7f2] text-2xl text-[#064b35]">
            ✓
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800">
            {mode === "login" ? "Welcome back!" : "Account created!"}
          </p>
          <p className="mt-1 text-sm text-slate-500">Redirecting…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-xs font-semibold text-slate-600">Full Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-slate-600">Phone or Email</label>
            <input
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
              placeholder="+91 or you@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Password</label>
            <input
              type="password"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-[#064b35] py-3.5 text-sm font-bold text-white transition hover:bg-[#043c2b]"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
          <p className="text-center text-xs text-slate-400">
            By continuing you agree to our{" "}
            <Link href="/terms/" className="text-[#FF052B]">Terms & Conditions</Link> and{" "}
            <Link href="/privacy/" className="text-[#FF052B]">Privacy Policy</Link>.
          </p>
        </form>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
            <div className="hidden lg:block">
              <div className="rounded-3xl bg-[#064b35] p-10 text-white">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-extrabold text-[#064b35]">
                  T
                </div>
                <h2 className="mt-6 text-3xl font-bold leading-tight">
                  Your property journey begins with trust.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  Sign in to save properties, track enquiries and get personalised recommendations.
                </p>
              </div>
            </div>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-white" />}>
              <LoginForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
