"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mb-8">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-terracotta"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-syne font-700 text-[1.8rem] md:text-[2.5rem] text-anthracite">
          Quelque chose s&apos;est mal passé.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-anthracite/50 text-[0.95rem] leading-relaxed max-w-sm mx-auto">
          Une erreur inattendue est survenue. On s&apos;en occupe.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={reset}
            className="px-7 py-4 text-[0.8rem] font-semibold tracking-[0.15em] uppercase rounded-full bg-terracotta text-white hover:bg-terracotta/80 transition-all duration-300"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-7 py-4 text-[0.8rem] font-semibold tracking-[0.15em] uppercase rounded-full border-2 border-anthracite/10 text-anthracite hover:bg-anthracite hover:text-cream transition-all duration-300"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* Branding */}
        <p className="mt-16 font-syne font-800 text-sm text-anthracite/20 tracking-tight">
          COLOMBES<span className="text-terracotta/40">.</span>CYCLES
        </p>
      </div>
    </div>
  );
}
