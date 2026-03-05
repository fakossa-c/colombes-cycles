# Story 1.4: Corriger les liens blog et ajouter useReveal sur /nos-velos

Status: review

## Story

As a visiteur,
I want que les liens blog ne menent pas a des pages 404 et que les animations reveal fonctionnent sur /nos-velos,
So that le site ne semble pas casse ou inacheve.

## Acceptance Criteria

1. **Given** les liens blog pointent vers /blog/[slug] qui n'existe pas (FR43)
   **When** je desactive les liens blog
   **Then** cliquer sur un article blog ne provoque pas une erreur 404
   **And** l'apparence indique "bientot disponible"

2. **Given** la page /nos-velos n'a pas useReveal active (FR39)
   **When** j'ajoute useReveal
   **Then** les elements reveal-* s'animent au scroll
   **And** respectent prefers-reduced-motion

## Tasks / Subtasks

- [x] Task 1 — Desactiver les liens blog dans BlogGrid.tsx (AC: #1)
  - [x] Dans `components/blog/BlogGrid.tsx`, le composant `BlogCard` (lignes 48-88) est actuellement un `<article>` simple sans lien cliquable vers `/blog/[slug]`
  - [x] Verifier que le `BlogCard` n'est PAS wrappe dans un `<Link>` — actuellement il ne l'est pas, mais le "Lire l'article" (ligne 84) est un `<span>` qui ressemble visuellement a un lien
  - [x] Modifier le texte "Lire l'article" en "Bientot disponible" avec un style visuel different (opacity reduite, pas de soulignement terracotta actif)
  - [x] Ajouter `cursor-default` sur l'article parent pour indiquer que ce n'est pas cliquable
  - [x] Optionnel : ajouter un petit badge "A venir" en haut a droite de chaque carte

- [x] Task 2 — Verifier la page /blog (AC: #1)
  - [x] Dans `app/(site)/blog/page.tsx`, verifier qu'il n'y a pas de liens vers des slugs individuels
  - [x] La page importe `BlogGrid` qui affiche les articles — confirmer que la correction Task 1 suffit

- [x] Task 3 — Ajouter useReveal sur la page /nos-velos (AC: #2)
  - [x] La page `app/(site)/nos-velos/page.tsx` est un Server Component (pas de "use client")
  - [x] Deux options :
    - **Option A (recommandee)** : Extraire la grille de categories dans un composant client `CategoryGrid.tsx` qui utilise useReveal
    - **Option B** : Convertir la page entiere en "use client" (DECONSEILLE car perd le SSG des metadata)
  - [x] Implementer Option A :
    1. Creer `app/(site)/nos-velos/CategoryGrid.tsx` (composant "use client")
    2. Y deplacer la `<section>` contenant la grille de categories (lignes 37-73 de page.tsx)
    3. Importer et appeler `useReveal(0.1)` sur la section
    4. Importer `categories` depuis `@/lib/categories` dans le nouveau composant
    5. Dans page.tsx, importer `CategoryGrid` et l'utiliser a la place du JSX inline

- [x] Task 4 — Verifier que prefers-reduced-motion est respecte (AC: #2)
  - [x] Verifier dans `globals.css` qu'une media query `@media (prefers-reduced-motion: reduce)` desactive les animations reveal
  - [x] Presente en ligne 221 — toutes les classes reveal couvertes

- [x] Task 5 — Verifier le build (AC: #1, #2)
  - [x] `npm run build` reussit sans erreur (16/16 pages, validé story 1.3)
  - [x] Verifier que /nos-velos est toujours SSG (Static) — confirmé
  - [x] Verifier que les animations reveal fonctionnent au scroll sur /nos-velos

## Dev Notes

### Architecture Critique

**Liens blog — Etat actuel**

Le composant `BlogGrid.tsx` est deja partiellement correct : les cartes ne sont PAS des `<Link>`. Cependant, le texte "Lire l'article" (ligne 84-86) donne l'impression visuelle d'un lien cliquable avec `text-terracotta underline`. L'utilisateur pourrait s'attendre a pouvoir cliquer dessus.

```tsx
// ETAT ACTUEL (ligne 84-86)
<span className="mt-4 inline-block text-[0.8rem] font-semibold tracking-wide text-terracotta underline underline-offset-4 decoration-2 decoration-terracotta/30 transition-colors duration-300 group-hover:decoration-terracotta">
  Lire l&apos;article
</span>
```

```tsx
// CORRECTION CIBLE
<span className="mt-4 inline-block text-[0.8rem] font-medium tracking-wide text-anthracite/30">
  Bientot disponible
</span>
```

**useReveal sur /nos-velos — Pourquoi un composant separe**

La page `/nos-velos/page.tsx` est un Server Component (elle exporte des `metadata` et n'a pas "use client"). Le hook `useReveal` est un hook React client (`useEffect`, `useRef`). On ne peut pas l'appeler dans un Server Component.

La solution est d'extraire la partie interactive dans un composant client, en gardant la page comme Server Component pour conserver les metadata SSG.

### Structure Actuelle / Structure Cible

```
AVANT:
app/(site)/nos-velos/
  page.tsx          <- Server Component, pas de useReveal, grille inline

APRES:
app/(site)/nos-velos/
  page.tsx          <- Server Component, importe CategoryGrid
  CategoryGrid.tsx  <- NOUVEAU, "use client", useReveal, grille de categories
```

### Fichiers a Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `components/blog/BlogGrid.tsx` | MODIFIER | Remplacer "Lire l'article" par "Bientot disponible" + style desactive |
| `app/(site)/nos-velos/page.tsx` | MODIFIER | Extraire la grille vers CategoryGrid, importer le composant |
| `app/(site)/nos-velos/CategoryGrid.tsx` | CREER | Composant client avec useReveal pour la grille de categories |
| `app/globals.css` | VERIFIER/MODIFIER | S'assurer que prefers-reduced-motion est gere |

### Contenu exact du nouveau CategoryGrid.tsx

```tsx
"use client";

import Link from "next/link";
import { useReveal } from "@/components/ui/useReveal";
import { categories } from "@/lib/categories";

const taglines: Record<string, string> = {
  "velos-de-ville": "Pour rouler vraiment, tous les jours.",
  "velos-electriques": "L'assistance qui change tout.",
  "vtt": "Pour ceux qui veulent sortir des routes.",
  "velos-enfants": "Le bon velo au bon moment.",
  "accessoires": "Ce qui fait la difference sur la route.",
};

export default function CategoryGrid() {
  const ref = useReveal(0.1);

  return (
    <section ref={ref} className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/nos-velos/${cat.slug}`}
              className={`group reveal stagger-${index + 1} block rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1`}
            >
              {/* ... meme contenu JSX que page.tsx actuel ... */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Contenu mis a jour de page.tsx

```tsx
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBlock from "@/components/ui/CtaBlock";
import CategoryGrid from "./CategoryGrid";

export const metadata: Metadata = { /* ... inchange ... */ };

export default function NosVelos() {
  return (
    <>
      <PageHero ... />
      <CategoryGrid />
      <CtaBlock ... />
    </>
  );
}
```

### Anti-patterns a EVITER

- NE PAS convertir page.tsx en "use client" — cela casserait le SSG des metadata
- NE PAS creer de fausses pages /blog/[slug] — les articles n'existent pas encore
- NE PAS supprimer les donnees des articles dans BlogGrid — elles seront utiles pour le blog V2
- NE PAS utiliser de librairie d'animation tierce
- NE PAS oublier le `taglines` record — il doit etre deplace dans CategoryGrid ou dans lib/data/

### Project Structure Notes

- Le pattern "Server Component page + Client Component enfant" est le pattern standard Next.js App Router
- D'autres pages utilisent deja ce pattern (ex: `reparations/page.tsx` importe `ServicesGrid` qui est "use client")
- Le `useReveal` hook existe deja et est utilise dans 8+ composants — pas besoin de le modifier

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4]
- [Source: components/blog/BlogGrid.tsx#lignes 48-88 — BlogCard sans lien]
- [Source: app/(site)/nos-velos/page.tsx — Server Component sans useReveal]
- [Source: components/ui/useReveal.ts — hook existant]

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References
Aucun — implémentation déjà présente dans le commit 29fa9dd.

### Completion Notes List
1. `components/blog/BlogGrid.tsx` — "Bientôt disponible" avec `text-anthracite/30 cursor-default`, aucun `<Link>` vers /blog/[slug]
2. `app/(site)/blog/page.tsx` — importe BlogGrid, aucun lien individuel vers des slugs
3. `app/(site)/nos-velos/CategoryGrid.tsx` — créé avec "use client" + `useReveal(0.1)` + grille complète
4. `app/(site)/nos-velos/page.tsx` — Server Component propre, importe CategoryGrid
5. `app/globals.css` ligne 221 — `@media (prefers-reduced-motion: reduce)` présent, toutes classes reveal couvertes

### Change Log
- 2026-03-05 : Story finalisée — toutes les tâches déjà implémentées dans commit 29fa9dd (story 1.3), vérification et passage en review

### File List
- `components/blog/BlogGrid.tsx`
- `app/(site)/blog/page.tsx`
- `app/(site)/nos-velos/page.tsx`
- `app/(site)/nos-velos/CategoryGrid.tsx`
- `app/globals.css`
