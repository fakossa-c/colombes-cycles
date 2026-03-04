# Colombes Cycles — Architecture

> Dernière mise à jour : 2026-03-03

## Résumé

Application web statique construite avec Next.js 16 (App Router) et React 19. Architecture component-based avec rendu SSG (Static Site Generation). Aucune source de données externe — tout le contenu est hardcodé. Système d'animations entièrement custom sans librairie tierce.

## Pattern architectural

**Component-Based SSG (Static Site Generation)**

```
┌─────────────────────────────────────────────────────┐
│                    Next.js App Router                │
│  ┌───────────────────────────────────────────────┐  │
│  │              layout.tsx (Server)               │  │
│  │  ┌─────────┐  ┌────────┐  ┌──────────────┐   │  │
│  │  │ Topbar  │  │ Navbar │  │ ScrollProgress│   │  │
│  │  │(Server) │  │(Client)│  │  (Client)     │   │  │
│  │  └─────────┘  └────────┘  └──────────────┘   │  │
│  │                                               │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │           <main> = Page Content         │  │  │
│  │  │  ┌─────────────────────────────────┐    │  │  │
│  │  │  │   Server Component (page.tsx)   │    │  │  │
│  │  │  │   ┌───────────────────────┐     │    │  │  │
│  │  │  │   │  Client Components    │     │    │  │  │
│  │  │  │   │  (interactivité)      │     │    │  │  │
│  │  │  │   └───────────────────────┘     │    │  │  │
│  │  │  └─────────────────────────────────┘    │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  │                                               │  │
│  │  ┌──────────┐                                 │  │
│  │  │  Footer  │                                 │  │
│  │  │ (Server) │                                 │  │
│  │  └──────────┘                                 │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Flux de données

```
lib/categories.ts ──────────────────┐
  (5 catégories, slugs, meta, marques) │
                                     ▼
                          ┌──────────────────┐
                          │ nos-velos/page    │ (grille catégories)
                          │ [category]/page   │ (page catégorie + generateStaticParams)
                          └──────────────────┘

Données inline (hardcodées dans chaque composant) :
  Hero.tsx ──── stats (4.8/5, 271 avis, 15 ans)
  TrustBand.tsx ──── 6 items preuve sociale
  Services.tsx ──── 3 services
  RepairProcess.tsx ──── 4 étapes
  Team.tsx ──── 4 membres d'équipe
  Reviews.tsx ──── 6 avis clients
  ServicesGrid.tsx ──── 6 services atelier
  WhyUsGrid.tsx ──── 5 raisons
  BlogGrid.tsx ──── 4 articles placeholder
  reparations/page.tsx ──── 14 lignes de tarifs
  a-propos/page.tsx ──── 4 marques partenaires
  [category]/page.tsx ──── produits placeholder par catégorie
```

**Aucun flux de données externe** — pas d'API, pas de BDD, pas de CMS, pas de server actions, pas de `fetch`.

## Système de rendu

| Composant | Type | Raison |
|---|---|---|
| Pages (`page.tsx`) | Server | Contenu statique, metadata, JSON-LD |
| `layout.tsx` | Server | Wrapping global, fonts, structured data |
| `Topbar`, `Footer`, `TrustBand` | Server | Aucune interactivité nécessaire |
| `Button`, `Breadcrumb`, `PageHero`, `SectionTitle` | Server | Rendu statique pur |
| `Navbar` | Client | State hamburger + dropdown |
| `Hero` | Client | Scroll parallax + fade |
| `BikeWheel` (ScrollProgress) | Client | Scroll listener + rotation |
| Sections home (Services, Team, Reviews...) | Client | useReveal + animations |
| `ServicesGrid` | Client | Carrousel interactif + keyboard nav |
| `ContactForm` | Client | State formulaire |

## Système d'animations (6 couches)

### Couche 1 — Entrées CSS (Hero)
- Keyframes `heroSlideUp`, `heroFadeIn`, `heroLine` dans `globals.css`
- Appliqués par classes CSS : `.hero-title`, `.hero-subtitle`, `.hero-cta`, `.hero-badge`, `.hero-line`
- Utilisés par : `Hero.tsx`, `PageHero.tsx`

### Couche 2 — Reveal par IntersectionObserver
- Hook `useReveal(threshold)` observe une section et ajoute `.visible` aux descendants `.reveal*`
- Transitions CSS : `opacity + transform` sur 0.8s avec cubic-bezier spring
- Stagger : `.stagger-1` à `.stagger-5` (0.08s – 0.4s de délai)
- Utilisé par : 13 composants

### Couche 3 — Parallax scroll (JS)
- `Hero.tsx` : parallax multi-vitesse via `data-speed` + fade-out via CSS variable
- `useParallax` : hook générique pour sections intérieures
- RAF-throttled avec `ticking` flag

### Couche 4 — Swipe Tinder (mobile)
- Pattern identique dans `Team.tsx` et `Reviews.tsx`
- Touch handling avec seuil 50px, animation via `translateX + rotate`
- Stack rendering avec Z-index calculé depuis l'offset

### Couche 5 — SVG interactif
- `BikeInteractiveSvg.tsx` : 6 hotspots cliquables avec zones pulsantes
- CSS scoped via `<style>` injecté dans le SVG
- Keyframe `zonePulse` avec délais staggerés

### Couche 6 — Utilitaires CSS
- `.marquee-track` : scroll infini 30s
- `.magnetic-btn` : scale + glow hover
- `.cursor-wrench` : curseur SVG custom
- `.line-grow` : largeur animée de 0 à 80px

## SEO technique

### Metadata Next.js
- Template titre : `%s | Colombes Cycles`
- Canonical URLs sur chaque page
- OpenGraph + Twitter Cards configurés
- `generateMetadata` async pour les routes dynamiques

### Données structurées (JSON-LD)
| Schema | Emplacement |
|---|---|
| `LocalBusiness + BikeStore` | `layout.tsx` (site-wide) — rating, brands, horaires, zones desservies |
| `Service + OfferCatalog` | `reparations/page.tsx` (page-level) |
| `BreadcrumbList` | `Breadcrumb.tsx` (par page via PageHero) |

### Sitemap et robots
- `sitemap.ts` : 11 URLs avec priorités (manque `/mentions-legales`)
- `robots.ts` : autorise `/`, bloque `/api/`, `/_next/`, `/admin/`

### Fonts
- Google Fonts via `next/font` avec `display: swap` (pas de render-blocking)

## Conventions de code

| Convention | Détail |
|---|---|
| Alias imports | `@/*` → racine du projet |
| Client components | Directive `"use client"` en ligne 1 |
| Page-local components | Dans le dossier de la page |
| Composants partagés | Dans `components/` par domaine |
| Hooks custom | Préfixe `use`, dans `components/ui/` |
| Scroll listeners | Pattern RAF-throttled avec `ticking` flag |
| Reveal animations | Pattern `useReveal(threshold)` + classes CSS `.reveal*` + `.stagger-N` |
| Données | Inline dans les composants (sauf categories dans `lib/`) |

## Contraintes architecturales

1. **Pas de BDD/CMS** — Tout changement de contenu nécessite une modification de code
2. **Pas de gestion d'état globale** — Tout state est local (`useState`)
3. **Pas d'API** — Le `ContactForm` n'envoie rien, pas de server actions
4. **Pas de système d'images** — Tous les visuels sont des SVG placeholder, `next/image` non utilisé
5. **Pas de tests** — Aucun framework de test installé
6. **Pas de CI/CD** — Pas de pipeline de déploiement
7. **SSG pur** — Toutes les pages sont statiquement générables au build
