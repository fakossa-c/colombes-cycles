# Colombes Cycles — Guide de développement

> Dernière mise à jour : 2026-03-03

## Prérequis

| Outil | Version requise |
|---|---|
| Node.js | ≥ 20 (recommandé : LTS) |
| npm | ≥ 9 (inclus avec Node.js) |

## Installation

```bash
# Cloner le repository
git clone <url-du-repo>
cd Colombes-cycles

# Installer les dépendances
npm install
```

## Variables d'environnement

Fichier `.env` à la racine :

```
CRM_PROJECT_API_KEY=<votre_cle_api_crm>
```

> **Note** : La clé API est actuellement commitée dans `.env`. Elle devrait être dans `.env.local` (gitignored).

## Commandes

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur de développement Next.js |
| `npm run build` | Build de production (SSG) |
| `npm run start` | Démarre le serveur de production |
| `npm run lint` | Exécute ESLint |

## Structure des routes (App Router)

```
app/
├── layout.tsx              → Layout racine (toutes les pages)
├── page.tsx                → /
├── nos-velos/
│   ├── page.tsx            → /nos-velos
│   └── [category]/
│       └── page.tsx        → /nos-velos/:category (5 slugs SSG)
├── reparations/page.tsx    → /reparations
├── a-propos/page.tsx       → /a-propos
├── contact/page.tsx        → /contact
├── blog/page.tsx           → /blog
└── mentions-legales/page.tsx → /mentions-legales
```

## Conventions de développement

### Créer un nouveau composant

1. **Composant partagé** → `components/<domaine>/MonComposant.tsx`
2. **Composant page-local** → `app/<route>/MonComposant.tsx`
3. **Hook custom** → `components/ui/useMonHook.ts`

### Server vs Client Component

- **Par défaut : Server Component** (pas de directive)
- Ajouter `"use client"` en ligne 1 si le composant utilise :
  - `useState`, `useEffect`, `useRef`, `useCallback`
  - Événements DOM (`onClick`, `onScroll`, `onTouchStart`, etc.)
  - API navigateur (`window`, `document`, `IntersectionObserver`)

### Ajouter des animations reveal

```tsx
"use client";
import { useReveal } from "@/components/ui/useReveal";

export function MonComposant() {
  const ref = useReveal(0.15); // seuil d'intersection

  return (
    <section ref={ref}>
      <div className="reveal">Fade in du bas</div>
      <div className="reveal-left stagger-1">Slide depuis la gauche</div>
      <div className="reveal-right stagger-2">Slide depuis la droite</div>
      <div className="reveal-scale stagger-3">Scale in</div>
    </section>
  );
}
```

Classes disponibles : `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.line-grow`
Stagger : `.stagger-1` (0.08s) à `.stagger-5` (0.4s)

### Ajouter du parallax

```tsx
"use client";
import { useParallax } from "@/components/ui/useParallax";

export function MonComposant() {
  const ref = useParallax();

  return (
    <section ref={ref}>
      <div data-speed="0.04">Parallax lent</div>
      <div data-speed="-0.02">Parallax inversé</div>
    </section>
  );
}
```

### Palette de couleurs (Tailwind v4)

| Classe Tailwind | Couleur | Usage |
|---|---|---|
| `bg-anthracite` / `text-anthracite` | #1C1C1E | Fond sombre, texte principal |
| `bg-ivory` / `text-ivory` | #F5F0E8 | Fond chaud alternatif |
| `bg-terracotta` / `text-terracotta` | #C4622D | Accent, CTAs, badges |
| `bg-cream` / `text-cream` | #FAFAF7 | Fond clair principal |
| `bg-terracotta-dark` | #A8511F | Hover sur terracotta |
| `bg-terracotta-light` | #D4784A | Accent secondaire |

### Typographie

| Usage | Classe |
|---|---|
| Titres | `font-syne font-[800]` |
| Corps | `font-inter` (défaut dans body) |
| Taille titre section | `text-[2rem] md:text-[2.8rem] lg:text-[3.5rem]` |

### Imports

Utiliser l'alias `@/` pour tous les imports :

```tsx
import { Button } from "@/components/ui/Button";
import { categories } from "@/lib/categories";
```

## Ajout de données

Actuellement, toutes les données sont statiques et hardcodées dans les composants. Pour ajouter du contenu :

1. **Nouvelle catégorie vélo** → Modifier `lib/categories.ts`
2. **Nouveau membre d'équipe** → Modifier le tableau dans `components/home/Team.tsx`
3. **Nouvel avis client** → Modifier le tableau dans `components/home/Reviews.tsx`
4. **Nouveau tarif** → Modifier `pricingData` dans `app/reparations/page.tsx`
5. **Nouvel article blog** → Modifier le tableau dans `components/blog/BlogGrid.tsx`
6. **Nouvelle marque** → Modifier les tableaux dans `a-propos/page.tsx` et `layout.tsx` (JSON-LD)

## SEO — Ajouter une page

Pour chaque nouvelle page :

1. Exporter `metadata` depuis le `page.tsx` :
```tsx
export const metadata: Metadata = {
  title: "Titre de la page",
  alternates: { canonical: "https://www.colombes-cycles.fr/ma-page" },
};
```

2. Ajouter la route dans `app/sitemap.ts`
3. Utiliser `PageHero` avec des breadcrumbs pour le JSON-LD `BreadcrumbList`

## Tests

Aucun framework de test n'est installé. Pour ajouter des tests :

```bash
# Option recommandée : Vitest + Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

## Déploiement

Aucune configuration de déploiement n'existe. Le site mentionne Vercel dans les mentions légales. Pour déployer :

```bash
# Via Vercel CLI
npx vercel

# Ou connecter le repo GitHub à Vercel pour le déploiement automatique
```

## Problèmes connus à corriger

| Priorité | Problème | Fichier |
|---|---|---|
| Haute | Clé API dans `.env` (pas `.env.local`) | `.env` |
| Haute | Mentions légales incomplètes (SIRET, forme juridique) | `app/mentions-legales/page.tsx` |
| Moyenne | Template literal cassé dans les classes CSS | `app/nos-velos/[category]/page.tsx` |
| Moyenne | Classes `.reveal` sans `useReveal` (server component) | `app/nos-velos/page.tsx` |
| Moyenne | ContactForm non utilisé | `app/contact/page.tsx` |
| Moyenne | ContactForm sans soumission réelle | `components/contact/ContactForm.tsx` |
| Basse | Liens blog morts (pas de route `/blog/[slug]`) | `components/blog/BlogGrid.tsx` |
| Basse | `/mentions-legales` absent du sitemap | `app/sitemap.ts` |
| Basse | Arrow SVG sans `group` class | `components/ui/Button.tsx` |
| Basse | Animation menu mobile non connectée | `components/layout/Navbar.tsx` |
