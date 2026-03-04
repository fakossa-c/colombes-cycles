# Story 1.6: Creer les pages error.tsx et not-found.tsx

Status: ready-for-dev

## Story

As a visiteur,
I want voir une page 404 personnalisee,
So that je puisse facilement revenir vers le contenu du site.

## Acceptance Criteria

1. **Given** un visiteur accede a une URL qui n'existe pas
   **When** la page 404 s'affiche
   **Then** elle est dans le design system (anthracite/ivoire/terracotta, Syne/Inter)
   **And** elle affiche un message clair "Page introuvable"
   **And** elle propose des liens vers Accueil, Nos Velos, Reparations, Contact

2. **Given** une erreur runtime survient
   **When** la page error.tsx s'affiche
   **Then** elle affiche un message d'erreur generique
   **And** elle propose un bouton "Retour a l'accueil"
   **And** elle propose un bouton "Reessayer" qui appelle `reset()`

3. **Given** les pages d'erreur sont creees
   **When** je lance `npm run build`
   **Then** le build reussit sans erreur

## Tasks / Subtasks

- [ ] Task 1 — Creer app/not-found.tsx (AC: #1)
  - [ ] Creer `app/not-found.tsx` a la RACINE de app/ (pas dans (site)/)
  - [ ] Design : fond cream, texte anthracite, accents terracotta
  - [ ] Typo : Syne pour les titres, Inter pour le corps
  - [ ] Contenu :
    - Grand "404" decoratif en Syne font-800 tres grande taille, opacity faible
    - Titre : "Page introuvable" en Syne font-700
    - Sous-titre : "L'adresse que vous avez suivie ne mene nulle part. Ca arrive."
    - 4 liens de navigation : Accueil (/), Nos Velos (/nos-velos), Reparations (/reparations), Contact (/contact)
    - Les liens utilisent le composant Button existant ou un style similaire
  - [ ] NE PAS inclure Topbar/Navbar/Footer — ils sont dans le layout (site) qui sera rendu autour
  - [ ] ATTENTION : `not-found.tsx` a la racine de app/ est utilise comme fallback global par Next.js
  - [ ] Verifier si le layout (site) est applique quand on accede a une URL sous (site)/ — si oui, Navbar sera presente

- [ ] Task 2 — Creer app/error.tsx (AC: #2)
  - [ ] Creer `app/error.tsx` a la RACINE de app/
  - [ ] DOIT etre "use client" — c'est une exigence Next.js pour error.tsx
  - [ ] Props : `{ error: Error & { digest?: string }; reset: () => void }`
  - [ ] Design : meme charte que not-found (cream/anthracite/terracotta)
  - [ ] Contenu :
    - Titre : "Quelque chose s'est mal passe." en Syne font-700
    - Sous-titre : "Une erreur inattendue est survenue. On s'en occupe."
    - Bouton "Reessayer" qui appelle `reset()`
    - Bouton "Retour a l'accueil" qui utilise `<Link href="/">`
  - [ ] NE PAS afficher le message d'erreur technique au visiteur (securite)
  - [ ] Logger l'erreur en console pour le debug (`console.error(error)` dans un useEffect)

- [ ] Task 3 — Creer app/(site)/not-found.tsx optionnel (AC: #1)
  - [ ] Si le layout (site) n'est PAS applique au not-found.tsx global, creer un not-found specifique dans (site)/
  - [ ] Alternative : tester d'abord avec le global. Next.js App Router applique le layout parent le plus proche.
  - [ ] Pour les URLs sous (site)/ (ex: /une-page-inexistante), le layout (site) avec Navbar/Footer SERA applique automatiquement par Next.js si not-found.tsx est dans app/

- [ ] Task 4 — Verifier le build et les pages (AC: #3)
  - [ ] `npm run build` reussit
  - [ ] Tester en dev : naviguer vers une URL inexistante, verifier que not-found s'affiche
  - [ ] Tester error.tsx est plus difficile — on peut temporairement throw une erreur dans un composant

## Dev Notes

### Architecture Critique

**Placement des fichiers d'erreur dans Next.js App Router :**

- `app/not-found.tsx` : catch-all pour TOUTES les 404 du site. C'est un Server Component par defaut.
- `app/error.tsx` : catch-all pour les erreurs runtime. DOIT etre "use client".
- `app/(site)/not-found.tsx` : specifique au route group (site). S'affiche quand `notFound()` est appele depuis une page du groupe.

**Important** : Le `not-found.tsx` a la racine app/ est rendu DANS le root layout (`app/layout.tsx`) mais PAS dans le layout (site). Cela signifie que la page 404 pour des URLs hors (site)/ n'aura PAS la Navbar/Footer. Pour les URLs sous (site)/ qui appellent `notFound()` (ex: `[category]/page.tsx` ligne 62), Next.js utilisera le not-found le plus proche dans la hierarchie.

**Recommandation** : Creer les deux :
1. `app/not-found.tsx` — page autonome avec sa propre navigation (liens directs)
2. Optionnel : `app/(site)/not-found.tsx` — utilise la Navbar/Footer du layout site

**Design System References** :
- Anthracite : `#1C1C1E` (classe `text-anthracite`)
- Ivoire : `#F5F0E8` (classe `bg-ivory`)
- Terracotta : `#C4622D` (classe `text-terracotta`)
- Creme : `#FAFAF7` (classe `bg-cream`)
- Syne titres : `font-syne font-700` ou `font-800`
- Inter corps : `font-inter` (defaut)

### Fichiers a Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `app/not-found.tsx` | CREER | Page 404 globale, design system, liens navigation |
| `app/error.tsx` | CREER | Page erreur runtime, "use client", boutons reset/accueil |

### Contenu exact de app/not-found.tsx

```tsx
import Link from "next/link";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Nos Velos", href: "/nos-velos" },
  { label: "Reparations", href: "/reparations" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
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
          L&apos;adresse que vous avez suivie ne mene nulle part. Ca arrive.
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
```

### Contenu exact de app/error.tsx

```tsx
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
          Quelque chose s&apos;est mal passe.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-anthracite/50 text-[0.95rem] leading-relaxed max-w-sm mx-auto">
          Une erreur inattendue est survenue. On s&apos;en occupe.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={reset}
            className="px-7 py-4 text-[0.8rem] font-semibold tracking-[0.15em] uppercase rounded-full bg-terracotta text-white hover:bg-terracotta-dark transition-all duration-300"
          >
            Reessayer
          </button>
          <Link
            href="/"
            className="px-7 py-4 text-[0.8rem] font-semibold tracking-[0.15em] uppercase rounded-full border-2 border-anthracite/10 text-anthracite hover:bg-anthracite hover:text-cream transition-all duration-300"
          >
            Retour a l&apos;accueil
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
```

### Anti-patterns a EVITER

- NE PAS afficher le message d'erreur technique (`error.message`) au visiteur — risque de securite (fuite d'info)
- NE PAS oublier "use client" sur error.tsx — Next.js l'exige
- NE PAS mettre not-found.tsx dans (site)/ uniquement — il faut un global dans app/
- NE PAS utiliser le composant Button pour les liens dans not-found — il depend de `group` et de styles qui pourraient ne pas etre disponibles hors du layout site. Utiliser des classes inline.
- NE PAS importer Navbar/Footer dans les pages d'erreur — c'est le role du layout
- NE PAS ajouter de dependances tierces

### Project Structure Notes

- Les fichiers d'erreur sont a la racine de app/ pour une couverture globale
- Ils sont rendus dans le root layout (html/body/fonts) mais PAS dans le layout (site)
- C'est pourquoi ils doivent etre autonomes visuellement (pas dependre de Navbar/Footer)
- Le branding COLOMBES.CYCLES en bas sert de point de repere pour l'utilisateur

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.6]
- [Source: _bmad-output/planning-artifacts/architecture.md#Error Handling]
- [Source: app/layout.tsx — root layout qui wrap les pages d'erreur]
- [Source: Next.js docs — Error Handling: https://nextjs.org/docs/app/building-your-application/routing/error-handling]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List
