import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-anthracite text-white/40">
      {/* Top divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="h-[1px] bg-white/[0.06]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="font-syne font-800 text-xl text-white block mb-4 tracking-tight">
              COLOMBES<span className="text-terracotta">.</span>CYCLES
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Atelier et magasin de vélos à Colombes (92700).
              <br />
              Vente, réparation, conseil depuis 15 ans.
            </p>
            <p className="font-syne font-600 text-white/20 italic text-sm">
              Ici, on connaît votre vélo.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h3 className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/60 mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Nos Vélos", href: "/nos-velos" },
                { label: "Réparations", href: "/reparations" },
                { label: "À propos", href: "/a-propos" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-terracotta transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Horaires */}
          <div>
            <h3 className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/60 mb-5">
              Horaires
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-between gap-4">
                <span>Mardi – Samedi</span>
                <span className="text-white font-medium">9h – 19h</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Dimanche – Lundi</span>
                <span className="text-white/20">Fermé</span>
              </li>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/60 mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:0142426602" className="flex items-center gap-2 hover:text-terracotta transition-colors duration-300 font-medium text-white/60">
                  01 42 42 66 02
                </a>
              </li>
              <li className="text-white/30">
                Colombes (92700)
              </li>
            </ul>

            {/* Marques */}
            <div className="mt-8">
              <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/20 mb-2">Nos marques</p>
              <p className="text-xs text-white/25">
                Orbea · Peugeot Cycles · Gitane · Velodeville · Lombardo · Sparta
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 text-[0.7rem] text-white/20">
          <p>&copy; {new Date().getFullYear()} Colombes Cycles. Tous droits réservés.</p>
          <Link href="/mentions-legales" className="hover:text-white/40 transition-colors duration-300">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
