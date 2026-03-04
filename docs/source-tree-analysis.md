# Colombes Cycles — Analyse de l'arborescence source

> Dernière mise à jour : 2026-03-03

## Arborescence annotée

```
Colombes-cycles/
│
├── app/                              # ← POINT D'ENTRÉE : Next.js App Router
│   ├── layout.tsx                    # Layout racine (fonts, metadata, JSON-LD, Topbar/Navbar/Footer)
│   ├── page.tsx                      # Homepage — compose 8 sections
│   ├── globals.css                   # Thème Tailwind v4 + animations CSS custom
│   ├── sitemap.ts                    # Générateur sitemap Next.js (11 URLs)
│   ├── robots.ts                     # Générateur robots.txt
│   │
│   ├── nos-velos/                    # Page catalogue vélos
│   │   ├── page.tsx                  # Grille 5 catégories
│   │   └── [category]/              # Route dynamique
│   │       └── page.tsx              # Page catégorie (SSG, generateStaticParams)
│   │
│   ├── reparations/                  # Page atelier réparation
│   │   ├── page.tsx                  # Tarifs + JSON-LD Service
│   │   ├── ServicesGrid.tsx          # Carrousel services + SVG interactif (CLIENT)
│   │   ├── WhyUsGrid.tsx            # Grille avantages (CLIENT)
│   │   ├── BikeInteractiveSvg.tsx   # Vélo SVG avec hotspots cliquables
│   │   └── BlueprintBg.tsx          # Fond blueprint technique (CLIENT)
│   │
│   ├── a-propos/                    # Page à propos
│   │   ├── page.tsx                  # Assemblage sections + certif BOSCH + marques
│   │   ├── StorySection.tsx         # Narration histoire David (CLIENT)
│   │   └── ValuesGrid.tsx           # Grille 5 valeurs (CLIENT)
│   │
│   ├── contact/                     # Page contact
│   │   └── page.tsx                  # Tél + horaires + Google Maps iframe
│   │
│   ├── blog/                        # Page blog
│   │   └── page.tsx                  # Grille 4 articles placeholder
│   │
│   └── mentions-legales/            # Page mentions légales
│       └── page.tsx                  # Infos légales (certains champs incomplets)
│
├── components/                       # ← COMPOSANTS PARTAGÉS
│   ├── layout/                       # Structure globale du site
│   │   ├── Topbar.tsx                # Barre utilitaire (tél, horaires, certif BOSCH)
│   │   ├── Navbar.tsx                # Navigation sticky + dropdown + hamburger (CLIENT)
│   │   └── Footer.tsx                # Pied de page 4 colonnes
│   │
│   ├── home/                        # Sections de la page d'accueil
│   │   ├── Hero.tsx                  # Hero plein écran + parallax + fade-out scroll (CLIENT)
│   │   ├── TrustBand.tsx            # Bandeau preuve sociale marquee infini
│   │   ├── Services.tsx             # 3 services principaux + parallax (CLIENT)
│   │   ├── RepairProcess.tsx        # 4 étapes réparation (CLIENT)
│   │   ├── Boutique.tsx             # Section boutique 2 colonnes (CLIENT)
│   │   ├── Team.tsx                 # Équipe — Tinder swipe mobile (CLIENT)
│   │   ├── Reviews.tsx              # Avis Google — Tinder swipe mobile (CLIENT)
│   │   └── CtaFinal.tsx             # CTA final (CLIENT)
│   │
│   ├── ui/                          # Primitives UI réutilisables
│   │   ├── BikeWheel.tsx            # Indicateur de progression scroll (roue vélo) (CLIENT)
│   │   ├── Button.tsx               # Bouton Link avec variantes (primary/outline/ghost)
│   │   ├── Breadcrumb.tsx           # Fil d'Ariane avec JSON-LD BreadcrumbList
│   │   ├── CtaBlock.tsx             # Bloc CTA réutilisable (CLIENT)
│   │   ├── PageHero.tsx             # Hero de page intérieure avec breadcrumbs
│   │   ├── SectionTitle.tsx         # Titre de section h2 avec tag optionnel
│   │   ├── useReveal.ts            # Hook IntersectionObserver pour animations scroll (CLIENT)
│   │   └── useParallax.ts          # Hook parallax rAF pour data-speed (CLIENT)
│   │
│   ├── blog/
│   │   └── BlogGrid.tsx             # Grille d'articles blog (CLIENT)
│   │
│   └── contact/
│       └── ContactForm.tsx           # Formulaire contact — NON UTILISÉ (CLIENT)
│
├── lib/                             # ← COUCHE DONNÉES
│   └── categories.ts                # Données des 5 catégories vélos (slugs, meta, marques, descriptions)
│
├── public/                          # ← ASSETS STATIQUES
│   └── images/                      # Dossier images (actuellement vide — tous les visuels sont des SVG placeholder)
│
├── prototypes/                      # ← EXPÉRIMENTATIONS HTML STATIQUES
│   ├── 01-velo-interactif.html      # Prototype vélo interactif v1
│   ├── 01-velo-interactif-v2.html   # Prototype vélo interactif v2
│   ├── 02-accordeon-vertical.html   # Prototype accordéon vertical
│   └── 03-carrousel-horizontal.html # Prototype carrousel horizontal
│
├── docs/                            # ← DOCUMENTATION GÉNÉRÉE (ce dossier)
│
├── _bmad/                           # ← BMAD AI Methodology scaffolding
│   ├── bmm/                         # Module BMAD Method
│   └── core/                        # Core engine
│
├── package.json                     # Dépendances et scripts npm
├── next.config.ts                   # Config Next.js (vide — aucune personnalisation)
├── tsconfig.json                    # Config TypeScript (strict, alias @/*)
├── eslint.config.mjs                # Config ESLint v9
├── postcss.config.mjs               # Config PostCSS pour Tailwind v4
├── .env                             # Clé API CRM (⚠️ devrait être dans .env.local)
│
├── audit.md                         # Audit UX/design du site WordPress
├── brand-strategy.md                # Stratégie de marque et positionnement
├── copy.md                          # Copywriting
└── seo-strategy.md                  # Stratégie SEO locale
```

## Répertoires critiques

| Répertoire | Rôle | Fichiers clés |
|---|---|---|
| `app/` | Routes et pages (App Router) | `layout.tsx` (point d'entrée global), `page.tsx` (homepage) |
| `components/layout/` | Structure persistante du site | `Navbar.tsx` (navigation), `Footer.tsx` |
| `components/home/` | Sections de la page d'accueil | `Hero.tsx` (hero animé), `Team.tsx` + `Reviews.tsx` (swipe Tinder) |
| `components/ui/` | Primitives réutilisables | `useReveal.ts` (système reveal), `BikeWheel.tsx` (scroll progress) |
| `lib/` | Données statiques | `categories.ts` (seule source de données partagée) |
| `app/globals.css` | Tokens design + animations | Toutes les animations CSS custom |

## Points d'entrée

| Point d'entrée | Fichier | Description |
|---|---|---|
| Application | `app/layout.tsx` | Layout racine, charge fonts, metadata, JSON-LD, wrapper global |
| Homepage | `app/page.tsx` | Compose les 8 sections d'accueil |
| CSS/Thème | `app/globals.css` | Tokens Tailwind v4 + 15+ classes d'animation |
| Données | `lib/categories.ts` | Seule source de données partagée de l'app |
| Config | `next.config.ts` | Vide — aucune personnalisation |

## Organisation des fichiers — Conventions

- **Pages** : Un dossier par route dans `app/`
- **Composants page-locaux** : Fichiers `.tsx` dans le dossier de la page (ex: `app/reparations/ServicesGrid.tsx`)
- **Composants partagés** : Dans `components/` organisés par domaine (`layout/`, `home/`, `ui/`, `blog/`, `contact/`)
- **Hooks custom** : Dans `components/ui/` avec préfixe `use` (ex: `useReveal.ts`, `useParallax.ts`)
- **Données** : Dans `lib/` — une seule source partagée (`categories.ts`)
- **Client components** : Marqués `"use client"` en haut du fichier
- **Server components** : Défaut (pas de directive)
- **Alias** : `@/*` pointe vers la racine du projet
