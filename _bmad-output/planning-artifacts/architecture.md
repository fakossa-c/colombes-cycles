---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-Colombes-cycles-2026-03-03.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/component-inventory.md
  - docs/development-guide.md
  - docs/source-tree-analysis.md
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-04'
project_name: 'Colombes-cycles'
user_name: 'Fakos'
date: '2026-03-04'
---

# Architecture Decision Document — Colombes-cycles

**Author:** Fakos
**Date:** 2026-03-04

_Ce document est la source de vérité unique pour toutes les décisions architecturales. Tout agent IA implémentant ce projet DOIT le respecter intégralement._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements (46 FR) :**

| Catégorie | FRs | Implications architecturales |
|---|---|---|
| Navigation & Structure (FR1–FR5) | Topbar sticky, navbar dropdown, hamburger mobile, scroll progress | Layout persistant avec composants mixtes Server/Client, scroll listeners RAF-throttled |
| Découverte & Contenu (FR6–FR13) | 8 sections accueil, 5 catégories vélos, équipe/avis swipe, marques | Pages SSG avec `generateStaticParams`, données inline → migration future vers BDD |
| Réparations (FR14–FR18) | SVG interactif 6 hotspots, carrousel services, grille tarifaire | Composants page-locaux complexes, CSS scoped dans SVG, keyboard navigation |
| Conversion (FR19–FR22) | CTA tel:, RDV, configurateur Velodeville externe | Liens externes `target="_blank" rel="noopener"`, event tracking GA4 (V1.1) |
| Animations (FR23–FR28) | 6 couches custom, `prefers-reduced-motion` | Architecture hooks (useReveal, useParallax), CSS-first, fallbacks accessibilité |
| SEO & Accessibilité (FR29–FR37) | JSON-LD, sitemap, canonical, 301 redirects, WCAG 2.1 AA | Metadata Next.js, `sitemap.ts`, `robots.ts`, structure headings, focus management |
| Bugs brownfield (FR38–FR46) | 10 corrections identifiées dans le code existant | Fixes ciblés sans refactoring global — template literals, useReveal manquant, .env.local |

**Non-Functional Requirements (28 NFR) :**

| Domaine | NFRs | Contrainte architecturale clé |
|---|---|---|
| Performance (NFR1–NFR9) | Lighthouse ≥ 95, LCP < 2.5s, CLS < 0.1, INP < 200ms, bundle < 150 KB gzip | SSG pur, zéro librairie animation tierce, code-splitting par route, rAF-throttled |
| Sécurité & RGPD (NFR10–NFR15) | Pas de secrets dans Git, RGPD article 13, HTTPS, auth admin V2 | `.env.local` gitignored, mentions légales complètes, auth middleware sur `/admin/*` |
| Accessibilité (NFR16–NFR21) | WCAG 2.1 AA, contraste ≥ 4.5:1, `prefers-reduced-motion`, keyboard nav | Audit axe-core, heading hierarchy, alt text systématique, animations conditionnelles |
| Intégration (NFR22–NFR24) | Velodeville externe, Google Maps lazy, JSON-LD validé | iframe lazy-loaded, Rich Results Test validé, `rel="noopener noreferrer"` |
| SEO Technique (NFR25–NFR28) | Lighthouse SEO ≥ 95, robots.txt bloque `/admin`, sitemap complet, canonicals | `Disallow: /admin` dans robots.ts, toutes routes dans sitemap.ts, canonical absolues |

### Scale & Complexity

- **Domaine primaire :** Frontend web SSG (Next.js App Router) avec trajectoire monolithe full-stack
- **Niveau de complexité :** Moyen — domaine métier simple (commerce local), complexité technique réelle (animations custom, brownfield, SSG évolutif)
- **Composants architecturaux estimés :** ~35 composants React (31 existants + ajustements), 8 routes, 2 hooks custom, 1 module données, 1 fichier CSS global avec 15+ classes d'animation

### Technical Constraints & Dependencies

| Contrainte | Source | Impact |
|---|---|---|
| Next.js 16 App Router | Stack existante | File-system routing, Server/Client components, `generateStaticParams` pour SSG |
| React 19 | Stack existante | Concurrent features disponibles, Server Components natifs |
| TypeScript strict | Stack existante | Typage fort obligatoire, imports avec alias `@/*` |
| Tailwind CSS v4 | Stack existante | Tokens design via CSS custom properties, pas de `tailwind.config.js` |
| Zéro librairie animation | Décision architecturale PRD | useReveal, useParallax, CSS keyframes — tout est custom |
| SSG complet (MVP) | Performance NFR | `output: 'export'` possible, toutes les pages statiquement générées |
| Vercel (déploiement cible) | Infrastructure prévue | SSG + serverless pour API routes admin (V2) |
| Brownfield 31 composants | Code existant | Conventions établies à respecter, 10 bugs à corriger |

### Cross-Cutting Concerns Identified

| Préoccupation | Composants affectés | Stratégie |
|---|---|---|
| **Performance** | Tous | SSG, rAF-throttled, code-splitting, bundle < 150 KB, `next/font` swap |
| **Accessibilité** | Tous les client components | WCAG 2.1 AA, `prefers-reduced-motion`, keyboard nav, heading hierarchy |
| **SEO** | Toutes les pages | Metadata, JSON-LD, canonical, sitemap, robots, 301 redirects |
| **Animations** | 18 client components | Système 6 couches cohérent, hooks réutilisables, CSS classes conventionnées |
| **Isolation bundles** | Route groups (site)/(admin) | Le code admin ne doit jamais contaminer le bundle SSG public |
| **Migration données** | Tous les composants avec données inline | Préparer l'extraction vers `lib/` ou API routes pour la V2 BDD |
| **Responsive mobile-first** | Layout + tous composants | Breakpoints 640/1024px, swipe tactile, stack verticale mobile |

---

## Starter Template Evaluation

### Primary Technology Domain

**Frontend web SSG (Next.js App Router)** — projet brownfield avec code existant fonctionnel.

### Starter Options Considered

| Option | Verdict | Justification |
|---|---|---|
| `create-next-app` | Non applicable | Le projet existe déjà avec 31 composants, 8 routes, système d'animations, conventions établies |
| T3 Stack (`create-t3-app`) | Non pertinent | Inclut tRPC, Prisma, NextAuth — overhead massif pour un site vitrine SSG |
| Starter custom | Pas nécessaire | Le code existant EST le starter |
| **Conserver le code existant** | **Recommandé** | Le brownfield fournit une base solide à corriger et enrichir |

### Selected Starter: Code existant (Brownfield)

**Rationale :** Le projet possède déjà une fondation Next.js 16 App Router complète avec 31 composants, 8 routes, système d'animations 6 couches, tokens design Tailwind v4, SEO technique et conventions documentées. La stratégie est de corriger, consolider et enrichir l'existant.

**Commande d'initialisation :** N/A (projet existant)

**Décisions architecturales déjà établies par le code existant :**

| Décision | Choix | Version | État |
|---|---|---|---|
| Langage & Runtime | TypeScript strict, React, Next.js App Router | TS ^5, React 19.2.4, Next.js 16.1.x | En place |
| Styling | Tailwind CSS v4 + tokens custom + CSS animations globals | Tailwind 4.2.0 | En place |
| Build | Next.js built-in (Turbopack dev, Webpack prod), SSG | — | En place |
| Tests | Aucun — prévu Vitest + Testing Library en V2 | Vitest 4.0.x | À ajouter |
| Organisation code | App Router file-system, composants par domaine | — | En place |
| Dev Experience | Hot reload Next.js, ESLint ^9, alias `@/*` | — | En place |

**Actions requises sur la fondation existante :**

1. Mise à jour mineure React 19.2.3 → 19.2.4
2. Mise à jour Tailwind CSS → 4.2.0
3. Correction des 10 bugs identifiés (FR38–FR46)
4. Migration `.env` → `.env.local`
5. Préparation route groups `(site)` pour isoler le futur `(admin)`

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Bloquent l'implémentation) :**

| # | Décision | Choix | Rationale |
|---|---|---|---|
| AD-1 | Architecture applicative | Monolithe Next.js App Router avec route groups `(site)` et `(admin)` | Isolation bundles sans overhead micro-services. Le site public ne charge jamais de code admin. |
| AD-2 | Stratégie de rendu | SSG complet pour `(site)`, SSR pour `(admin)` V2 | Performance maximale pour le site public (Lighthouse > 95), flexibilité pour le dashboard. |
| AD-3 | Gestion des données MVP | Données statiques inline + `lib/data/` | Aucune BDD au MVP. Données centralisées dans `lib/data/` pour préparer la migration V2. |
| AD-4 | Système d'animations | 100% custom — CSS keyframes + hooks React (useReveal, useParallax) | Zéro dépendance tierce. Bundle minimal. Contrôle total sur performance et accessibilité. |
| AD-5 | Stratégie SEO | Metadata Next.js + JSON-LD inline + `sitemap.ts` + `robots.ts` | SSG = HTML statique indexable. Données structurées générées au build. |

**Important Decisions (Façonnent l'architecture) :**

| # | Décision | Choix | Rationale |
|---|---|---|---|
| AD-6 | Formulaire contact MVP | Server Action Next.js + Resend (email API) | Pas besoin de BDD pour un formulaire de contact. Resend = API simple, 100 emails/jour gratuits. |
| AD-7 | Gestion des images | `next/image` avec WebP automatique, lazy loading par défaut, `priority` sur hero | Optimisation automatique Vercel. `sizes` et `srcSet` générés. |
| AD-8 | 301 Redirects WordPress | `next.config.ts` → `redirects()` | Redirections au build, pas de runtime. Mapping ancien WordPress → nouveau Next.js. |
| AD-9 | Google Maps | iframe lazy-loaded avec `loading="lazy"` | Pas d'API key nécessaire, pas de bundle JS Google Maps, pas de CLS. |
| AD-10 | Velodeville configurateur | Lien externe `target="_blank"` dans le design system | MVP = CTA externe. Investigation iframe V2 (risque : X-Frame-Options du fournisseur). |

**Deferred Decisions (Post-MVP) :**

| # | Décision | Phase | Choix prévu | Rationale |
|---|---|---|---|---|
| AD-11 | Base de données | V2 | PostgreSQL + Drizzle ORM | Drizzle = TypeScript-first, léger, migrations SQL lisibles. PostgreSQL = standard robuste. |
| AD-12 | Authentification admin | V2 | Auth.js v5 (ex-NextAuth) | First-class App Router support, Edge Runtime compatible, session-based. |
| AD-13 | Tests automatisés | V2 | Vitest 4.x + Testing Library | Browser Mode stable dans Vitest 4, compatible React 19, rapide. |
| AD-14 | CI/CD | V1.1 | Vercel Git Integration + GitHub Actions | Déploiement auto sur push, preview branches, zéro config. |
| AD-15 | Analytics | V1.1 | GA4 + Google Search Console | Event tracking CTA, mesure conversions, suivi SEO. |
| AD-16 | PWA admin | V3 | Service Worker scopé `/admin/` | iPad atelier, cache-first interface, network-first données. |

### Data Architecture

**MVP — Données statiques centralisées :**

```
lib/data/
├── categories.ts      ← 5 catégories vélos (existant dans lib/categories.ts → déplacer ici)
├── team.ts            ← 4 membres équipe (extraire de Team.tsx)
├── reviews.ts         ← 6 avis clients (extraire de Reviews.tsx)
├── services.ts        ← 6 services réparation (extraire de ServicesGrid.tsx)
├── pricing.ts         ← 14 lignes tarifaires (extraire de reparations/page.tsx)
├── brands.ts          ← marques partenaires (extraire de a-propos/page.tsx)
├── trust-items.ts     ← 6 items preuve sociale (extraire de TrustBand.tsx)
├── blog-posts.ts      ← 4 articles placeholder (extraire de BlogGrid.tsx)
└── site-config.ts     ← horaires, téléphone, adresse, coordonnées GPS
```

**Rationale :** Centraliser les données dans `lib/data/` permet :
1. Un point unique de modification du contenu (plus besoin de chercher dans les composants)
2. Le typage TypeScript strict de toutes les données
3. Une migration transparente vers une BDD V2 (remplacer les imports statiques par des fetch)
4. Aucun impact sur les performances SSG (import au build)

**V2 — PostgreSQL + Drizzle ORM :**

```
lib/
├── db/
│   ├── index.ts          ← Connection pool (drizzle-orm/postgres-js)
│   ├── schema.ts         ← Schéma Drizzle (tables, relations)
│   └── migrations/       ← Migrations SQL versionnées
├── data/                 ← Couche d'accès données
│   ├── categories.ts     ← Requêtes BDD au lieu d'export statique
│   ├── team.ts
│   └── ...
```

### Authentication & Security

**MVP :**
- Pas d'authentification (site public uniquement)
- `.env.local` pour les secrets (gitignored)
- Headers de sécurité via `next.config.ts` : `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- Formulaire contact : validation côté client + server action avec rate limiting basique

**V2 — Auth.js v5 :**
- Session-based authentication (pas JWT)
- Middleware Next.js sur `/admin/*` → redirect `/login` si non authentifié
- Provider credentials (email/password) — un seul admin (David)
- CSRF protection intégrée Auth.js
- Session storage : BDD PostgreSQL (adapter Drizzle)

### API & Communication Patterns

**MVP :**
- Aucune API. Zéro `fetch`, zéro server actions (sauf formulaire contact V1.1)
- Toutes les données sont importées statiquement depuis `lib/data/`
- Communication inter-composants : props React uniquement (pas de state global)

**V1.1 — Server Action formulaire :**

```typescript
// app/(site)/contact/actions.ts
"use server"

import { Resend } from 'resend'

export async function sendContactForm(formData: FormData) {
  // Validation Zod
  // Rate limiting basique (IP-based)
  // Envoi via Resend API
  // Return { success: boolean, error?: string }
}
```

**V2 — API Routes admin :**
- Server Actions Next.js pour les mutations CRUD
- Pas de REST API classique — les Server Actions suffisent pour un seul utilisateur admin
- Revalidation du site public via `revalidatePath()` ou `revalidateTag()`

### Frontend Architecture

**State Management :**
- **Pas de store global** (Redux, Zustand, etc.) — inutile pour un site vitrine
- State local `useState` uniquement dans les client components
- Props drilling acceptable (profondeur max 2-3 niveaux)
- Si un état doit traverser plus de 3 niveaux : extraire dans un composant wrapper

**Component Architecture :**
- Server Components par défaut (pas de `"use client"`)
- Client Components uniquement si : `useState`, `useEffect`, événements DOM, API navigateur
- Composition over inheritance : les pages composent des sections, pas d'héritage de composants
- Chaque page est un Server Component qui importe des Client Components pour l'interactivité

**Routing :**
- File-system routing Next.js App Router
- Route group `(site)` pour tout le contenu public
- Route group `(admin)` pour le dashboard (V2)
- `generateStaticParams` pour les routes dynamiques (`/nos-velos/[category]`)
- Pas de routing client-side custom — `<Link>` Next.js avec prefetching

**Performance :**
- Code-splitting automatique par route (Next.js)
- `next/font` avec `display: swap` pour Syne et Inter
- Images `next/image` avec `priority` sur le hero, lazy loading par défaut ailleurs
- Animations throttlées via `requestAnimationFrame` avec `ticking` flag
- `prefers-reduced-motion` : désactive toutes les animations CSS et JS
- Bundle cible < 150 KB gzip total site public

### Infrastructure & Deployment

**Hébergement :** Vercel

| Aspect | Décision |
|---|---|
| **Plan** | Hobby (gratuit) pour le MVP, Pro si trafic > seuil |
| **Build** | `next build` → SSG automatique |
| **CDN** | Edge Network Vercel (automatique) |
| **Domaine** | `colombes-cycles.fr` (V1.1) |
| **SSL** | Automatique via Vercel |
| **Preview** | Branch preview automatique sur chaque PR |
| **Env vars** | Dashboard Vercel pour production, `.env.local` pour dev |

**CI/CD (V1.1) :**
- Vercel Git Integration : déploiement automatique sur push `main`
- GitHub Actions (optionnel) : lint + type-check + build avant merge
- Pas de tests automatisés au MVP

**Monitoring (V1.1) :**
- Vercel Analytics (Core Web Vitals en production)
- Google Search Console (indexation, positionnement)
- GA4 (comportement utilisateur, conversions CTA)

### Decision Impact Analysis

**Séquence d'implémentation :**

1. Réorganisation en route group `(site)` (AD-1)
2. Centralisation données dans `lib/data/` (AD-3)
3. Correction des 10 bugs brownfield (FR38–FR46)
4. Polish animations et accessibilité (AD-4, FR28)
5. SEO technique complet (AD-5, FR29–FR34)
6. Formulaire contact avec Server Action (AD-6)
7. Déploiement Vercel (AD-14)

**Dépendances entre décisions :**

```
AD-1 (Route groups) ──→ AD-2 (SSG/SSR split)
                    └──→ AD-12 (Auth middleware V2)

AD-3 (Données lib/data/) ──→ AD-11 (Migration BDD V2)

AD-4 (Animations custom) ──→ Indépendant (déjà en place)

AD-6 (Formulaire contact) ──→ AD-14 (Vercel pour server actions)
```

---

## Implementation Patterns & Consistency Rules

### Conflict Points identifiés : 18 zones de divergence potentielle

### Naming Patterns

**Fichiers et dossiers :**

| Élément | Convention | Exemple |
|---|---|---|
| Composants React | PascalCase `.tsx` | `ServicesGrid.tsx`, `BikeWheel.tsx` |
| Hooks custom | camelCase préfixe `use` `.ts` | `useReveal.ts`, `useParallax.ts` |
| Pages Next.js | `page.tsx` dans le dossier route | `app/(site)/reparations/page.tsx` |
| Layouts | `layout.tsx` | `app/(site)/layout.tsx` |
| Modules données | camelCase `.ts` | `lib/data/categories.ts` |
| Server Actions | camelCase `.ts` dans `actions.ts` | `app/(site)/contact/actions.ts` |
| CSS global | `globals.css` unique | `app/globals.css` |
| Config | kebab-case ou convention outil | `next.config.ts`, `tsconfig.json` |

**Code TypeScript :**

| Élément | Convention | Exemple |
|---|---|---|
| Composants | PascalCase (export named) | `export function ServicesGrid()` |
| Hooks | camelCase préfixe `use` | `export function useReveal()` |
| Fonctions utilitaires | camelCase | `getCategoryBySlug()` |
| Types / Interfaces | PascalCase | `type Category`, `interface TeamMember` |
| Constantes module | camelCase | `export const categories = [...]` |
| Variables locales | camelCase | `const isVisible = true` |
| Props interfaces | PascalCase suffixe `Props` | `interface PageHeroProps` |
| Enums | PascalCase (valeurs PascalCase) | `enum ServiceKey { Revision, Roues }` |

**CSS / Tailwind :**

| Élément | Convention | Exemple |
|---|---|---|
| Classes d'animation | kebab-case préfixe domaine | `.reveal`, `.reveal-left`, `.marquee-track` |
| Stagger classes | `.stagger-N` (1 à 5) | `.stagger-1`, `.stagger-3` |
| Tokens design | `--color-*`, `--font-*` | `--color-terracotta`, `--font-syne` |
| Classes utilitaires custom | kebab-case | `.magnetic-btn`, `.cursor-wrench` |

**BDD (V2) :**

| Élément | Convention | Exemple |
|---|---|---|
| Tables | snake_case pluriel | `team_members`, `blog_posts` |
| Colonnes | snake_case | `created_at`, `bike_category_id` |
| Foreign keys | `{table_singulier}_id` | `category_id` |
| Indexes | `idx_{table}_{colonnes}` | `idx_blog_posts_slug` |

### Structure Patterns

**Organisation des composants :**

```
Règle : Composant utilisé sur 1 seule page → page-local (dans le dossier route)
Règle : Composant utilisé sur 2+ pages → partagé (dans components/)
Règle : Composant partagé organisé par domaine : layout/, home/, ui/, blog/, contact/
```

**Server vs Client Component :**

```
Règle : Server Component par défaut (pas de directive)
Règle : "use client" en ligne 1 UNIQUEMENT si le composant utilise :
  - useState, useEffect, useRef, useCallback
  - Événements DOM (onClick, onScroll, onTouchStart, etc.)
  - API navigateur (window, document, IntersectionObserver)
Règle : Un Server Component PEUT importer un Client Component
Règle : Un Client Component NE PEUT PAS importer un Server Component
  (mais peut recevoir des Server Components en props/children)
```

**Imports :**

```typescript
// Ordre des imports (séparés par une ligne vide) :
// 1. Modules React/Next.js
import { Metadata } from "next";

// 2. Composants (alias @/)
import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "./ServicesGrid";

// 3. Données
import { services } from "@/lib/data/services";

// 4. Types (si séparés)
import type { ServiceKey } from "@/lib/data/services";
```

### Format Patterns

**Metadata Next.js :**

```typescript
// Chaque page DOIT exporter metadata
export const metadata: Metadata = {
  title: "Titre de la page",  // Template : "%s | Colombes Cycles" (défini dans layout)
  description: "Meta description unique de 150-160 caractères",
  alternates: {
    canonical: "https://www.colombes-cycles.fr/ma-route",
  },
};
```

**JSON-LD :**

```typescript
// JSON-LD injecté via <script type="application/ld+json"> dans le composant page
// LocalBusiness + BikeStore → layout.tsx (site-wide)
// Service → reparations/page.tsx (page-level)
// BreadcrumbList → Breadcrumb.tsx (par page via PageHero)
```

**Types de données :**

```typescript
// Toujours typer les tableaux de données avec une interface/type exporté
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  speciality: string;
}

export const teamMembers: TeamMember[] = [
  // ...
];
```

### Communication Patterns

**Props React (pas de state global) :**

```
Règle : Les données passent de parent à enfant via props
Règle : Profondeur max de props drilling : 3 niveaux
Règle : Au-delà de 3 niveaux, refactorer en composant wrapper
Règle : PAS de Context API pour les données — uniquement pour le thème ou l'accessibilité si nécessaire
Règle : PAS de store global (Redux, Zustand, Jotai, etc.)
```

**Événements et callbacks :**

```typescript
// Convention : préfixe on pour les props callback
interface Props {
  onServiceSelect: (key: ServiceKey) => void;  // ✅
  serviceSelectHandler: (key: ServiceKey) => void;  // ❌
}
```

### Process Patterns

**Error Handling :**

```
Règle : Les erreurs build-time (SSG) doivent casser le build (fail fast)
Règle : Les erreurs runtime (client) → error.tsx par route group
Règle : Le formulaire contact retourne { success: boolean, error?: string }
Règle : Pas de try/catch silencieux — toujours logger ou remonter l'erreur
Règle : Page 404 custom via not-found.tsx dans le design system
```

**Animations :**

```
Règle : Toute animation de révélation au scroll → useReveal(threshold)
Règle : Tout effet parallax → useParallax() + data-speed="N"
Règle : Animations d'entrée page → CSS keyframes dans globals.css
Règle : Swipe tactile → pattern Team.tsx/Reviews.tsx (seuil 50px, translateX + rotate)
Règle : Toute animation DOIT être désactivée par prefers-reduced-motion
Règle : Pas de setTimeout/setInterval pour les animations — toujours rAF
```

**Loading States :**

```
Règle MVP : Pas de loading states (SSG = HTML statique immédiat)
Règle V2 : Skeleton loading pour les données dynamiques admin
Règle : Le Google Maps iframe utilise loading="lazy" natif
```

### Enforcement Guidelines

**Tout agent IA DOIT :**

1. Respecter la répartition Server/Client Components telle que documentée
2. Utiliser les hooks `useReveal` et `useParallax` existants (pas en recréer)
3. Placer les données dans `lib/data/` et non inline dans les composants
4. Utiliser l'alias `@/` pour tous les imports
5. Respecter le système de tokens Tailwind v4 (pas de couleurs hex en dur)
6. Ajouter `prefers-reduced-motion` pour toute nouvelle animation
7. Exporter `metadata` avec canonical URL pour toute nouvelle page
8. Ne JAMAIS installer de librairie d'animation tierce (Framer Motion, GSAP, Lenis, etc.)
9. Ne JAMAIS utiliser de store global de state management
10. Tester sur mobile (iOS Safari + Android Chrome) toute interaction tactile

**Anti-patterns à éviter :**

```typescript
// ❌ Couleur en dur
<div className="bg-[#C4622D]">

// ✅ Token Tailwind
<div className="bg-terracotta">

// ❌ Animation via librairie tierce
import { motion } from "framer-motion";

// ✅ Animation via hook custom
const ref = useReveal(0.15);

// ❌ Données inline dans le composant
const team = [{ name: "David", ... }];

// ✅ Données importées depuis lib/data/
import { teamMembers } from "@/lib/data/team";

// ❌ Store global
import { useStore } from "zustand";

// ✅ Props locales
function TeamCard({ member }: { member: TeamMember }) {}
```

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
Colombes-cycles/
│
├── app/                                  # Next.js App Router
│   ├── globals.css                       # Tokens Tailwind v4 + animations CSS custom
│   ├── sitemap.ts                        # Générateur sitemap dynamique
│   ├── robots.ts                         # Générateur robots.txt
│   │
│   ├── (site)/                           # ← ROUTE GROUP : site public (SSG)
│   │   ├── layout.tsx                    # Layout site : Topbar, Navbar, Footer, JSON-LD, fonts
│   │   ├── page.tsx                      # Homepage — compose 8 sections
│   │   ├── not-found.tsx                 # Page 404 custom dans le design system
│   │   ├── error.tsx                     # Error boundary site public
│   │   │
│   │   ├── nos-velos/
│   │   │   ├── page.tsx                  # Grille 5 catégories
│   │   │   └── [category]/
│   │   │       └── page.tsx              # Page catégorie (SSG, generateStaticParams)
│   │   │
│   │   ├── reparations/
│   │   │   ├── page.tsx                  # Tarifs + JSON-LD Service
│   │   │   ├── ServicesGrid.tsx          # Carrousel services + SVG interactif (Client)
│   │   │   ├── WhyUsGrid.tsx            # Grille avantages (Client)
│   │   │   ├── BikeInteractiveSvg.tsx   # Vélo SVG avec hotspots
│   │   │   └── BlueprintBg.tsx          # Fond technique SVG (Client)
│   │   │
│   │   ├── a-propos/
│   │   │   ├── page.tsx                  # Histoire + certif BOSCH + marques
│   │   │   ├── StorySection.tsx         # Narration histoire David (Client)
│   │   │   └── ValuesGrid.tsx           # Grille 5 valeurs (Client)
│   │   │
│   │   ├── contact/
│   │   │   ├── page.tsx                  # Tél + horaires + Maps + formulaire
│   │   │   └── actions.ts               # Server Action formulaire (V1.1)
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx                  # Grille articles
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Article individuel (V1.1)
│   │   │
│   │   └── mentions-legales/
│   │       └── page.tsx                  # Mentions obligatoires
│   │
│   └── (admin)/                          # ← ROUTE GROUP : dashboard admin (V2 — SSR)
│       ├── layout.tsx                    # Layout admin : sidebar, auth check
│       ├── login/
│       │   └── page.tsx                  # Page de connexion
│       └── admin/
│           ├── page.tsx                  # Dashboard home
│           ├── contenu/
│           │   └── page.tsx              # CRUD contenu
│           └── media/
│               └── page.tsx              # Gestion images
│
├── components/                           # Composants partagés
│   ├── layout/
│   │   ├── Topbar.tsx                    # Barre utilitaire (Server)
│   │   ├── Navbar.tsx                    # Navigation sticky (Client)
│   │   └── Footer.tsx                    # Pied de page (Server)
│   │
│   ├── home/
│   │   ├── Hero.tsx                      # Hero parallax (Client)
│   │   ├── TrustBand.tsx                # Marquee preuve sociale (Server)
│   │   ├── Services.tsx                 # 3 services + parallax (Client)
│   │   ├── RepairProcess.tsx            # 4 étapes réparation (Client)
│   │   ├── Boutique.tsx                 # Section boutique (Client)
│   │   ├── Team.tsx                     # Équipe — Tinder swipe mobile (Client)
│   │   ├── Reviews.tsx                  # Avis Google — Tinder swipe (Client)
│   │   └── CtaFinal.tsx                 # CTA final (Client)
│   │
│   ├── ui/
│   │   ├── BikeWheel.tsx                # Scroll progress roue vélo (Client)
│   │   ├── Button.tsx                   # Bouton Link 4 variantes (Server)
│   │   ├── Breadcrumb.tsx               # Fil d'Ariane + JSON-LD (Server)
│   │   ├── CtaBlock.tsx                 # Bloc CTA réutilisable (Client)
│   │   ├── PageHero.tsx                 # Hero pages intérieures (Server)
│   │   ├── SectionTitle.tsx             # Titre section h2 (Server)
│   │   ├── useReveal.ts                # Hook IntersectionObserver (Client)
│   │   └── useParallax.ts             # Hook parallax rAF (Client)
│   │
│   ├── blog/
│   │   └── BlogGrid.tsx                 # Grille articles (Client)
│   │
│   └── contact/
│       └── ContactForm.tsx              # Formulaire contact (Client)
│
├── lib/                                  # Couche données et utilitaires
│   ├── data/
│   │   ├── categories.ts               # 5 catégories vélos
│   │   ├── team.ts                      # 4 membres équipe
│   │   ├── reviews.ts                   # 6 avis clients
│   │   ├── services.ts                 # 6 services réparation
│   │   ├── pricing.ts                  # Grille tarifaire
│   │   ├── brands.ts                   # Marques partenaires
│   │   ├── trust-items.ts             # Items preuve sociale
│   │   ├── blog-posts.ts             # Articles blog
│   │   └── site-config.ts            # Horaires, tél, adresse, GPS
│   └── utils/
│       └── cn.ts                        # Utilitaire className conditionnel (si nécessaire)
│
├── public/
│   ├── images/                          # Photos réelles (V1.1 — actuellement vide)
│   └── fonts/                           # Si self-hosted (actuellement next/font Google)
│
├── docs/                                # Documentation projet
│   ├── index.md
│   ├── project-overview.md
│   ├── architecture.md
│   ├── component-inventory.md
│   ├── development-guide.md
│   └── source-tree-analysis.md
│
├── prototypes/                          # Expérimentations HTML statiques
│
├── next.config.ts                       # Config Next.js (redirects 301, headers sécurité)
├── tsconfig.json                        # TypeScript strict, alias @/*
├── eslint.config.mjs                    # ESLint v9
├── postcss.config.mjs                   # PostCSS Tailwind v4
├── package.json
├── .env.local                           # Secrets (gitignored)
├── .env.example                         # Template variables d'environnement
└── .gitignore
```

### Architectural Boundaries

**Boundary 1 — Route Group Isolation `(site)` / `(admin)` :**

```
(site)/                          (admin)/
├── SSG complet                  ├── SSR dynamique (V2)
├── Zéro JS admin dans bundle    ├── Auth.js middleware
├── Components: layout/, home/,  ├── Components admin-only
│   ui/, blog/, contact/         ├── Drizzle ORM queries
├── Données: lib/data/ (static)  ├── Server Actions mutations
└── Public, aucune auth          └── Protégé, session requise
```

**Règle critique :** Aucun import de `(admin)/` ne doit apparaître dans un composant utilisé par `(site)/`. Cette isolation est vérifiable via le bundle analysis (`next build`).

**Boundary 2 — Données statiques / Données dynamiques :**

```
MVP :  lib/data/*.ts ──import──→ Server Components ──render──→ HTML statique
V2  :  PostgreSQL ──Drizzle──→ lib/data/*.ts (async) ──fetch──→ Server Components
```

La couche `lib/data/` est la frontière. Les composants importent toujours depuis `lib/data/`, jamais directement depuis la BDD.

**Boundary 3 — Client / Server Component :**

```
Server Component (page.tsx)
  ├── import données depuis lib/data/
  ├── export metadata
  ├── render JSON-LD
  └── compose des Client Components via props
       └── Client Component ("use client")
            ├── useState, useEffect, useRef
            ├── useReveal, useParallax
            ├── Événements DOM
            └── Reçoit données via props (pas de fetch côté client)
```

### Requirements to Structure Mapping

**FR1–FR5 (Navigation) →** `components/layout/` + `components/ui/BikeWheel.tsx`
**FR6–FR13 (Découverte) →** `components/home/` + `lib/data/` + `app/(site)/nos-velos/`
**FR14–FR18 (Réparations) →** `app/(site)/reparations/` (page-local)
**FR19–FR22 (Conversion) →** `components/ui/Button.tsx` + `components/ui/CtaBlock.tsx` + `components/layout/Topbar.tsx`
**FR23–FR28 (Animations) →** `components/ui/useReveal.ts` + `components/ui/useParallax.ts` + `app/globals.css`
**FR29–FR37 (SEO) →** `app/sitemap.ts` + `app/robots.ts` + `components/ui/Breadcrumb.tsx` + metadata dans chaque page
**FR38–FR46 (Bugs) →** Fichiers spécifiques identifiés dans `docs/development-guide.md`

### Integration Points

**Internes :**

| Point | Source | Destination | Mécanisme |
|---|---|---|---|
| Données → Pages | `lib/data/*.ts` | `app/(site)/**/page.tsx` | Import TypeScript statique |
| Layout → Pages | `app/(site)/layout.tsx` | Toutes les pages `(site)` | Composition Next.js App Router |
| Hooks → Components | `components/ui/useReveal.ts` | 13 client components | Hook React importé |
| Tokens → Styles | `app/globals.css` | Tous les composants | CSS custom properties Tailwind v4 |

**Externes :**

| Service | Type | Mécanisme | Phase |
|---|---|---|---|
| Google Fonts | CDN fonts | `next/font` (optimisé, pas de render-blocking) | MVP |
| Google Maps | iframe embed | `loading="lazy"` dans page contact | MVP |
| Velodeville configurateur | Lien externe | `<a href="..." target="_blank" rel="noopener noreferrer">` | MVP |
| Resend | Email API | Server Action fetch vers API REST | V1.1 |
| GA4 | Analytics | Script dans layout via `next/script` strategy="afterInteractive" | V1.1 |
| Google Search Console | SEO monitoring | Vérification via meta tag ou DNS | V1.1 |
| Vercel | Hosting + CDN | Git push → build → deploy | V1.1 |
| PostgreSQL | BDD | Drizzle ORM connection pool | V2 |

### Data Flow

```
[Build time]
lib/data/*.ts ──static import──→ Server Components (page.tsx)
                                      │
                                      ├──→ HTML statique (SSG output)
                                      ├──→ JSON-LD inline
                                      └──→ Client Components (via props)
                                              │
                                              └──→ Animations (useReveal, useParallax)
                                                   └──→ DOM mutations (classList, transform)

[Runtime — site public]
CDN ──→ HTML statique ──→ Hydratation React ──→ Client Components actifs
                                                     │
                                                     ├──→ Scroll events (rAF-throttled)
                                                     ├──→ Touch events (swipe Tinder)
                                                     ├──→ IntersectionObserver (reveal)
                                                     └──→ Formulaire contact (V1.1)
                                                              └──→ Server Action ──→ Resend API
```

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility :**
- Next.js 16 App Router + React 19 + TypeScript strict + Tailwind v4 = stack cohérente et officielle
- SSG pour `(site)` + SSR pour `(admin)` = supporté nativement par les route groups Next.js
- Drizzle ORM (V2) + PostgreSQL = compatible avec les Server Actions Next.js et le déploiement Vercel
- Auth.js v5 (V2) = first-class support App Router et Edge Runtime
- Vitest 4.x (V2) = compatible React 19 et Testing Library

**Pattern Consistency :**
- Les conventions de nommage (PascalCase composants, camelCase hooks, snake_case BDD) sont standard et non ambiguës
- Le pattern Server/Client Component est cohérent avec les hooks existants (useReveal, useParallax)
- L'organisation par domaine (`layout/`, `home/`, `ui/`) est cohérente avec le code brownfield existant

**Structure Alignment :**
- La structure de fichiers reflète exactement les décisions architecturales
- Les route groups `(site)`/`(admin)` matérialisent l'isolation bundle
- `lib/data/` centralise les données et prépare la migration V2

### Requirements Coverage Validation ✅

**Functional Requirements Coverage :**

| Catégorie FR | Couverture | Notes |
|---|---|---|
| FR1–FR5 (Navigation) | ✅ 100% | Layout persistant, composants existants, BikeWheel |
| FR6–FR13 (Découverte) | ✅ 100% | Pages SSG, données centralisées, swipe Tinder |
| FR14–FR18 (Réparations) | ✅ 100% | Composants page-locaux, SVG interactif |
| FR19–FR22 (Conversion) | ✅ 100% | CTA tel:, liens externes, Velodeville |
| FR23–FR28 (Animations) | ✅ 100% | 6 couches custom, prefers-reduced-motion |
| FR29–FR37 (SEO) | ✅ 100% | Metadata, JSON-LD, sitemap, robots, 301, 404, WCAG |
| FR38–FR46 (Bugs) | ✅ 100% | Fichiers spécifiques identifiés, fixes ciblés |

**Non-Functional Requirements Coverage :**

| Domaine NFR | Couverture | Notes |
|---|---|---|
| NFR1–NFR9 (Performance) | ✅ 100% | SSG, bundle < 150 KB, rAF-throttled, code-splitting |
| NFR10–NFR15 (Sécurité) | ✅ 100% | .env.local, RGPD, HTTPS, auth V2, headers sécurité |
| NFR16–NFR21 (Accessibilité) | ✅ 100% | WCAG 2.1 AA, contraste, reduced-motion, keyboard |
| NFR22–NFR24 (Intégration) | ✅ 100% | Velodeville externe, Maps lazy, JSON-LD validé |
| NFR25–NFR28 (SEO) | ✅ 100% | Lighthouse SEO, robots, sitemap, canonicals |

### Implementation Readiness Validation ✅

**Decision Completeness :**
- 16 décisions architecturales documentées avec versions vérifiées
- 5 décisions critiques (AD-1 à AD-5) complètes et prêtes
- 5 décisions importantes (AD-6 à AD-10) complètes
- 6 décisions déférées (AD-11 à AD-16) avec choix et rationale pour la phase concernée

**Structure Completeness :**
- Arborescence complète avec tous les fichiers et dossiers
- Route groups `(site)` et `(admin)` définis
- Mapping FR → fichiers explicite

**Pattern Completeness :**
- 18 points de conflit potentiels identifiés et résolus
- Conventions de nommage pour fichiers, code, CSS, BDD
- Patterns de process pour erreurs, animations, loading
- 10 règles d'enforcement pour les agents IA
- Exemples concrets et anti-patterns documentés

### Gap Analysis Results

**Gaps critiques :** Aucun

**Gaps importants (à adresser pendant l'implémentation) :**

| Gap | Impact | Résolution |
|---|---|---|
| Mapping exact des 301 redirects WordPress → Next.js | SEO — sans mapping, les anciennes URLs retournent 404 | Auditer les URLs indexées dans Google Search Console avant la mise en production |
| Contenu placeholder blog | SEO — les articles sont des placeholders sans routes individuelles | Priorisé en V1.1 avec les 10 articles planifiés dans seo-strategy.md |
| Photos réelles absentes | UX — tous les visuels sont des SVG placeholder | Shooting photo à planifier avec David avant V1.1 |

**Gaps nice-to-have :**
- Schema d'API Resend et fallback si service indisponible
- Stratégie de monitoring des performances en production (au-delà de Vercel Analytics)
- Plan de test utilisateur pour valider les animations sur devices réels

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Contexte projet analysé en profondeur
- [x] Scale et complexité évalués
- [x] Contraintes techniques identifiées
- [x] Préoccupations transversales cartographiées

**✅ Architectural Decisions**
- [x] Décisions critiques documentées avec versions vérifiées
- [x] Stack technologique entièrement spécifiée
- [x] Patterns d'intégration définis
- [x] Considérations de performance adressées

**✅ Implementation Patterns**
- [x] Conventions de nommage établies
- [x] Patterns de structure définis
- [x] Patterns de communication spécifiés
- [x] Patterns de process documentés

**✅ Project Structure**
- [x] Arborescence complète définie
- [x] Boundaries des composants établies
- [x] Points d'intégration cartographiés
- [x] Mapping requirements → structure complet

### Architecture Readiness Assessment

**Statut global : PRÊT POUR L'IMPLÉMENTATION**

**Niveau de confiance : ÉLEVÉ** — Le projet est brownfield avec 80% du code existant. L'architecture documente et consolide des décisions déjà validées par le code fonctionnel, tout en préparant l'évolution vers V2.

**Forces clés :**
1. Stack standard et maintenue (Next.js 16, React 19, Tailwind v4) — pas de dépendance exotique
2. Isolation bundles par route groups — performance garantie côté site public
3. Système d'animations documenté et conventionné — les agents IA savent exactement quoi utiliser
4. Centralisation données dans `lib/data/` — migration V2 transparente
5. 10 règles d'enforcement claires — préviennent les divergences entre agents

**Domaines d'amélioration future :**
- Tests automatisés (V2 — Vitest 4 + Testing Library)
- CI/CD formalisé (V1.1 — Vercel + GitHub Actions)
- Documentation API admin (V2 — quand les Server Actions seront en place)
- Monitoring production (V1.1 — Vercel Analytics + GA4)

### Implementation Handoff

**Directives pour les agents IA :**

1. Suivre toutes les décisions architecturales exactement comme documentées
2. Utiliser les patterns d'implémentation de manière cohérente dans tous les composants
3. Respecter la structure projet et les boundaries
4. Consulter ce document pour toute question architecturale
5. Ne JAMAIS installer de librairie d'animation tierce
6. Ne JAMAIS créer de store global de state management
7. Toujours utiliser les hooks existants (useReveal, useParallax) plutôt qu'en recréer
8. Centraliser les données dans `lib/data/`, pas inline dans les composants

**Première priorité d'implémentation :**

1. Réorganiser `app/` en route group `(site)/` (déplacer les routes existantes)
2. Créer `lib/data/` et extraire les données des composants
3. Corriger les 10 bugs brownfield (FR38–FR46)
4. Compléter les mentions légales (FR36, FR46)
5. Ajouter `/mentions-legales` au sitemap (FR37)
