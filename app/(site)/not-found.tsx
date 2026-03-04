import Link from "next/link";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Nos Vélos", href: "/nos-velos" },
  { label: "Réparations", href: "/reparations" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-cream flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg">
        {/* Decorative 404 */}
        <p className="font-syne font-800 text-[8rem] md:text-[12rem] leading-none text-anthracite/[0.06] select-none">
          404
        </p>

        {/* Title */}
        <h1 className="font-syne font-700 text-[1.8rem] md:text-[2.5rem] text-anthracite -mt-8 md:-mt-12">
          Page introuvable
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-anthracite/50 text-[0.95rem] leading-relaxed max-w-sm mx-auto">
          L&apos;adresse que vous avez suivie ne mène nulle part. Ça arrive.
        </p>

        {/* Navigation links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-6 py-3 text-[0.8rem] font-semibold tracking-[0.1em] uppercase rounded-full border-2 border-anthracite/10 text-anthracite hover:bg-anthracite hover:text-cream transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Branding */}
        <p className="mt-16 font-syne font-800 text-sm text-anthracite/20 tracking-tight">
          COLOMBES<span className="text-terracotta/40">.</span>CYCLES
        </p>
      </div>
    </div>
  );
}
