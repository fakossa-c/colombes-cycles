"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Accueil", href: "/" },
  {
    label: "Nos Vélos",
    href: "/nos-velos",
    children: [
      { label: "Vélos de ville", href: "/nos-velos/velos-de-ville" },
      { label: "Vélos électriques", href: "/nos-velos/velos-electriques" },
      { label: "VTT", href: "/nos-velos/vtt" },
      { label: "Vélos enfants", href: "/nos-velos/velos-enfants" },
      { label: "Accessoires", href: "/nos-velos/accessoires" },
    ],
  },
  { label: "Réparations", href: "/reparations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <nav className="bg-cream/80 backdrop-blur-xl border-b border-anthracite/[0.05] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-[4.5rem]">
        {/* Logo */}
        <Link href="/" className="font-syne font-800 text-lg md:text-xl text-anthracite tracking-tight">
          COLOMBES<span className="text-terracotta">.</span>CYCLES
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  href={link.href}
                  className="text-anthracite/50 hover:text-anthracite text-sm font-medium transition-colors duration-300 flex items-center gap-1"
                >
                  {link.label}
                  <svg className={`w-3 h-3 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </Link>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 pt-3">
                    <div className="bg-white/95 backdrop-blur-xl rounded-md shadow-xl border border-anthracite/[0.06] py-2 min-w-[220px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-anthracite/50 hover:text-terracotta hover:bg-ivory/50 transition-all duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-anthracite/50 hover:text-anthracite text-sm font-medium transition-colors duration-300"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://www.velodeville.fr/configurateur/?h_ident=10144"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-anthracite text-cream px-5 py-2.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-terracotta transition-colors duration-300 whitespace-nowrap"
          >
            Configurer votre vélo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-anthracite p-2"
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-[5px]">
            <span className={`h-[2px] bg-anthracite transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`h-[2px] bg-anthracite transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`h-[2px] bg-anthracite transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-cream border-t border-anthracite/[0.05] px-6 pb-8">
          {links.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3.5 text-anthracite font-syne font-600 border-b border-anthracite/[0.04]"
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 pl-4 text-sm text-anthracite/40 hover:text-terracotta transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <a
            href="https://www.velodeville.fr/configurateur/?h_ident=10144"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block mt-6 bg-anthracite text-cream px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase rounded-full text-center hover:bg-terracotta transition-colors"
          >
            Configurer votre vélo
          </a>
        </div>
      </div>
    </nav>
  );
}
