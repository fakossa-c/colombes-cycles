# Colombes Cycles — Vue d'ensemble du projet

> Dernière mise à jour : 2026-03-03 | Scan : Deep | Mode : initial_scan

## Résumé

Site vitrine pour **Colombes Cycles**, commerce spécialisé dans la vente et la réparation de vélos à Colombes (92). Refonte complète depuis un site WordPress vers une application Next.js statique. Le site présente les services, l'équipe, les catégories de vélos, les tarifs de réparation, et les avis clients.

## Type de projet

| Attribut | Valeur |
|---|---|
| Repository | Monolith |
| Type | Application web statique (SSG) |
| Framework | Next.js 16.1.6 (App Router) |
| Langage | TypeScript (mode strict) |
| Runtime | React 19.2.3 |
| Styling | Tailwind CSS v4 + CSS custom |
| Animations | 100% custom (CSS keyframes + IntersectionObserver + rAF) |
| Données | Statique (fichiers TS, pas de BDD/CMS/API) |
| Tests | Aucun |
| CI/CD | Aucun |
| Déploiement | Non configuré (Vercel mentionné dans mentions légales) |

## Stack technologique

| Catégorie | Technologie | Version |
|---|---|---|
| Framework | Next.js | 16.1.6 |
| UI | React | 19.2.3 |
| Langage | TypeScript | ^5 |
| CSS | Tailwind CSS | ^4 |
| PostCSS | @tailwindcss/postcss | ^4 |
| Polices | Syne (titres) + Inter (corps) | Google Fonts via next/font |
| Linting | ESLint + eslint-config-next | ^9 / 16 |

## Architecture

- **Pattern** : Component-based avec App Router (file-system routing)
- **Rendu** : SSG (Static Site Generation) — toutes les pages sont générables statiquement
- **Composants** : Server Components par défaut, Client Components (`"use client"`) pour l'interactivité
- **Données** : Aucune source externe — tout est hardcodé dans les composants ou dans `lib/categories.ts`
- **Animations** : Système custom à 6 couches (CSS keyframes, IntersectionObserver reveal, scroll parallax, swipe Tinder, SVG interactif, utilitaires CSS)

## Pages

| Route | Description | Type |
|---|---|---|
| `/` | Accueil — hero + preuve sociale + services + atelier + boutique + équipe + avis + CTA | Server |
| `/nos-velos` | Grille des 5 catégories de vélos | Server |
| `/nos-velos/[category]` | Page catégorie dynamique (5 slugs pré-générés) | Server |
| `/reparations` | Services atelier, SVG interactif, tarifs, avantages | Server |
| `/a-propos` | Histoire de David, valeurs, certifications, marques | Server |
| `/contact` | Téléphone, horaires, adresse, carte Google Maps | Server |
| `/blog` | Grille de 4 articles (placeholder, pas de routes individuelles) | Server |
| `/mentions-legales` | Informations légales (certains champs incomplets) | Server |

## Documentation existante (hors docs/)

| Fichier | Contenu |
|---|---|
| `audit.md` | Audit UX/design complet du site WordPress actuel |
| `brand-strategy.md` | Positionnement, 3 personas, ton de voix |
| `copy.md` | Copywriting pour les sections du site |
| `seo-strategy.md` | Stratégie SEO locale |

## Problèmes connus

1. **Template literal cassé** — `app/nos-velos/[category]/page.tsx` : `stagger-${index + 1}` dans un attribut string JSX
2. **Reveal non fonctionnel** — `app/nos-velos/page.tsx` : classes `.reveal` sans hook `useReveal` (server component)
3. **Button arrow** — `components/ui/Button.tsx` : `group-hover` sans classe `group` parente
4. **ContactForm inutilisé** — Le composant existe mais n'est pas importé dans la page contact
5. **ContactForm sans soumission** — Aucun `fetch` ni server action, le formulaire ne transmet rien
6. **Blog liens morts** — Slugs d'articles définis mais pas de routes `/blog/[slug]`
7. **Sitemap incomplet** — `/mentions-legales` absent
8. **Mentions légales** — Forme juridique et SIRET non renseignés
9. **Navbar mobile** — Pas de transition d'animation malgré la classe CSS `.mobile-menu-enter` disponible
10. **`.env` exposé** — Clé API CRM commitée dans le repo (devrait être dans `.env.local`)
