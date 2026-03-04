# Colombes Cycles — Inventaire des composants

> Dernière mise à jour : 2026-03-03

## Résumé

31 composants au total : 3 layout, 8 sections home, 8 primitives UI (dont 2 hooks), 6 page-locaux (réparations), 2 page-locaux (à propos), 2 page-locaux (blog/contact), 1 module données.

---

## Layout (3 composants)

| Composant | Type | Fichier | Props | Description |
|---|---|---|---|---|
| `Topbar` | Server | `components/layout/Topbar.tsx` | — | Barre utilitaire : téléphone, horaires, badge BOSCH |
| `Navbar` | Client | `components/layout/Navbar.tsx` | — | Navigation sticky, dropdown "Nos Vélos", hamburger mobile |
| `Footer` | Server | `components/layout/Footer.tsx` | — | Pied de page 4 colonnes : brand, navigation, horaires, contact |

**State Navbar** : `mobileOpen: boolean`, `dropdownOpen: boolean`

---

## Sections Home (8 composants)

| Composant | Type | Fichier | Hooks utilisés | Description |
|---|---|---|---|---|
| `Hero` | Client | `components/home/Hero.tsx` | useEffect, useRef | Hero plein écran avec parallax multi-vitesse et fade-out scroll |
| `TrustBand` | Server | `components/home/TrustBand.tsx` | — | Bandeau marquee infini avec 6 items de preuve sociale |
| `Services` | Client | `components/home/Services.tsx` | useReveal, useParallax | 3 services (Vente/Réparation/Conseil), parallax sur texte MÉTIER |
| `RepairProcess` | Client | `components/home/RepairProcess.tsx` | useReveal | 4 étapes réparation avec connecteur horizontal |
| `Boutique` | Client | `components/home/Boutique.tsx` | useReveal | 2 colonnes : texte (reveal-left) + grille photos (reveal-right) |
| `Team` | Client | `components/home/Team.tsx` | useReveal, useState, useRef, useCallback | Équipe 4 membres — grille 2×2 desktop, Tinder swipe mobile |
| `Reviews` | Client | `components/home/Reviews.tsx` | useReveal, useState, useRef, useCallback | 6 avis Google — 2×3 grille desktop, Tinder swipe mobile |
| `CtaFinal` | Client | `components/home/CtaFinal.tsx` | useReveal | CTA final centré avec 2 boutons |

**Sous-composants locaux :**
- `Team` → `TeamCard` (carte membre), `MobileCardStack` (stack Tinder)
- `Reviews` → `Stars` (étoiles SVG), `MobileReviewStack` (stack Tinder)

---

## Primitives UI (8 composants/hooks)

| Composant | Type | Fichier | Props | Description |
|---|---|---|---|---|
| `ScrollProgress` | Client | `components/ui/BikeWheel.tsx` | — | Roue vélo rotative + barre de progression + waypoints de section |
| `Button` | Server | `components/ui/Button.tsx` | `href`, `variant`, `children`, `className?` | Bouton Link avec 4 variantes : primary, outline, outline-light, ghost |
| `Breadcrumb` | Server | `components/ui/Breadcrumb.tsx` | `items: BreadcrumbItem[]` | Fil d'Ariane avec JSON-LD BreadcrumbList |
| `CtaBlock` | Client | `components/ui/CtaBlock.tsx` | `title`, `subtitle?`, `ctaText`, `ctaHref` | Bloc CTA réutilisable avec useReveal |
| `PageHero` | Server | `components/ui/PageHero.tsx` | `title`, `subtitle?`, `tag?`, `breadcrumbs?` | Hero pages intérieures avec animations d'entrée CSS |
| `SectionTitle` | Server | `components/ui/SectionTitle.tsx` | `children`, `light?`, `className?`, `tag?` | Titre h2 section avec tag optionnel |
| `useReveal` | Client hook | `components/ui/useReveal.ts` | `threshold?: number` | IntersectionObserver → ajoute `.visible` aux `.reveal*` |
| `useParallax` | Client hook | `components/ui/useParallax.ts` | — | Parallax rAF sur éléments `[data-speed]` |

**Variantes Button :**
- `primary` : bg-terracotta + flèche SVG
- `outline` : bordure anthracite
- `outline-light` : bordure blanche
- `ghost` : transparent

---

## Page-local — Réparations (4 composants)

| Composant | Type | Fichier | Description |
|---|---|---|---|
| `ServicesGrid` | Client | `app/reparations/ServicesGrid.tsx` | Carrousel vertical (desktop) / horizontal (mobile) de 6 services + SVG vélo interactif |
| `WhyUsGrid` | Client | `app/reparations/WhyUsGrid.tsx` | Grille 5 avantages avec icônes SVG |
| `BikeInteractiveSvg` | Server | `app/reparations/BikeInteractiveSvg.tsx` | Vélo SVG 600×380 avec 6 hotspots cliquables et cercles pulsants |
| `BlueprintBg` | Client | `app/reparations/BlueprintBg.tsx` | Fond technique SVG avec grille, géométrie décorative, useId |

**Types exportés :** `ServiceKey = "revision" | "roues" | "freinage" | "transmission" | "electrique" | "urgences"`

---

## Page-local — À propos (2 composants)

| Composant | Type | Fichier | Description |
|---|---|---|---|
| `StorySection` | Client | `app/a-propos/StorySection.tsx` | Narration longue avec blockquotes terracotta |
| `ValuesGrid` | Client | `app/a-propos/ValuesGrid.tsx` | 5 valeurs : Franchise, Maîtrise, Ancrage, Soin, Caractère |

---

## Page-local — Blog & Contact (2 composants)

| Composant | Type | Fichier | Description |
|---|---|---|---|
| `BlogGrid` | Client | `components/blog/BlogGrid.tsx` | Grille 4 articles placeholder (liens morts vers `/blog/[slug]`) |
| `ContactForm` | Client | `components/contact/ContactForm.tsx` | Formulaire 5 champs avec validation côté client — **NON UTILISÉ** |

---

## Module Données (1 module)

| Module | Fichier | Exports |
|---|---|---|
| `categories` | `lib/categories.ts` | `Category` (type), `categories` (array de 5), `getCategoryBySlug` (fonction) |

**Champs Category :** `slug`, `title`, `pageTitle`, `metaTitle`, `metaDescription`, `description`, `angleConseil`, `breadcrumbLabel`, `brands: string[]`

---

## Répartition Client vs Server

| Type | Nombre | Composants |
|---|---|---|
| Server Components | 11 | Topbar, Footer, TrustBand, Button, Breadcrumb, PageHero, SectionTitle, BikeInteractiveSvg, + toutes les pages |
| Client Components | 18 | Navbar, Hero, Services, RepairProcess, Boutique, Team, Reviews, CtaFinal, ScrollProgress, CtaBlock, useReveal, useParallax, ServicesGrid, WhyUsGrid, BlueprintBg, StorySection, ValuesGrid, BlogGrid, ContactForm |

---

## Design System — Tokens

| Token | Valeur | Usage |
|---|---|---|
| `--color-anthracite` | `#1C1C1E` | Fond sombre, texte principal |
| `--color-ivory` | `#F5F0E8` | Fond alternatif chaud |
| `--color-terracotta` | `#C4622D` | Accent principal, CTAs, badges |
| `--color-cream` | `#FAFAF7` | Fond principal clair |
| `--color-terracotta-dark` | `#A8511F` | Hover states |
| `--color-terracotta-light` | `#D4784A` | Accents secondaires |
| `--font-syne` | Syne 400–800 | Titres (font-display: swap) |
| `--font-inter` | Inter | Corps de texte (font-display: swap) |

---

## Composants réutilisables identifiés

Ces composants sont utilisés sur plusieurs pages :

| Composant | Utilisé dans |
|---|---|
| `PageHero` | nos-velos, [category], reparations, a-propos, contact, blog, mentions-legales |
| `CtaBlock` | nos-velos, [category], reparations, a-propos, blog |
| `SectionTitle` | Services, RepairProcess, Boutique, Team, Reviews, ServicesGrid, WhyUsGrid, ValuesGrid |
| `Button` | Hero, CtaFinal, CtaBlock |
| `Breadcrumb` | Via PageHero sur toutes les pages intérieures |
| `useReveal` | 13 composants client |
