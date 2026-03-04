# Story 2.4: Sections Services et Processus Réparation (homepage)

Status: ready-for-dev

## Story

As a visiteur,
I want découvrir les 3 services principaux et le processus de réparation en 4 étapes,
So that je comprenne ce que la boutique propose et comment ça fonctionne.

## Acceptance Criteria

1. **Given** un visiteur scroll après la bande de confiance, **When** la section Services entre dans le viewport, **Then** les 3 services (Vente, Réparation, Conseil) apparaissent en reveal staggeré (`.reveal .stagger-1`, `.reveal .stagger-2`, `.reveal .stagger-3`).

2. **Given** les 3 services, **When** ils sont affichés, **Then** chaque carte contient : numéro géant (01, 02, 03) en fond très discret, label en uppercase terracotta, titre en Syne font-700, description avec accents terracotta italic. Les cartes sont séparées par des bordures verticales en desktop (`md:border-r`).

3. **Given** le texte de fond "MÉTIER", **When** la section Services est visible, **Then** le texte est affiché en `text-[12vw]` avec opacity 1.5% (`text-anthracite/[0.015]`), en parallax `data-speed="0.04"`.

4. **Given** les services, **When** le visiteur clique sur une carte, **Then** il est redirigé vers la page correspondante (Vente → `/nos-velos`, Réparation → `/reparations`, Conseil → `/contact`). **Note** : les liens ne sont pas encore implémentés — à ajouter.

5. **Given** un visiteur continue de scroller, **When** la section Processus Réparation entre dans le viewport, **Then** les 4 étapes (Diagnostic, Devis clair, Réparation, On vous explique) apparaissent en reveal staggeré séquentiel.

6. **Given** les 4 étapes desktop, **When** elles sont affichées, **Then** elles sont en grille 4 colonnes avec un connecteur horizontal (ligne `h-[1px]` entre les cercles d'icônes). Chaque étape a : cercle anthracite avec icône SVG, badge numéro terracotta, titre Syne, description.

7. **Given** les 4 étapes, **When** le visiteur survole une étape, **Then** le cercle passe de `bg-anthracite` à `bg-terracotta` et l'icône grossit (`group-hover:scale-110`). Le badge numéro passe de `bg-terracotta` à `bg-anthracite`. Transitions 500ms.

8. **Given** le bloc BOSCH sous le processus, **When** il est visible, **Then** il affiche un fond anthracite avec icône éclair dans un cercle bordé terracotta, texte "Certifié BOSCH eBike" et description de la compétence Mathys.

9. **Given** les sections, **When** elles sont affichées, **Then** les sections alternent visuellement : Services sur `bg-cream`, ProcessRéparation sur `bg-cream` également (même section continue). La section suivante (Boutique) sera sur `bg-ivory` pour le contraste.

10. **Given** l'accessibilité, **When** les animations se jouent, **Then** elles utilisent le hook `useReveal` (IntersectionObserver) existant. Les icônes SVG dans les étapes ont `aria-hidden="true"` implicitement (décoratives).

## Tasks / Subtasks

- [ ] Task 1 — Auditer le composant Services existant (AC: #1, #2, #3)
  - [ ] Confirmer le reveal staggeré avec classes `.reveal .stagger-N`
  - [ ] Confirmer l'utilisation combinée de `useReveal` et `useParallax` via double ref
  - [ ] Vérifier le texte "MÉTIER" en fond parallax
  - [ ] Confirmer le SectionTitle avec tag "Nos métiers"
  - [ ] Vérifier les bordures verticales entre cartes desktop

- [ ] Task 2 — Ajouter les liens cliquables sur les services (AC: #4)
  - [ ] Wrapper chaque carte service dans un `<Link>` Next.js
  - [ ] Mappings : Vente → `/nos-velos`, Réparation → `/reparations`, Conseil → `/contact`
  - [ ] Ajouter un indicateur visuel de cliquabilité (cursor-pointer, hover effect)
  - [ ] Ajouter `href` dans le tableau de données `services[]`

- [ ] Task 3 — Auditer le composant RepairProcess (AC: #5, #6, #7, #8)
  - [ ] Confirmer la grille `md:grid-cols-4` avec connecteur horizontal
  - [ ] Confirmer le reveal staggeré des 4 étapes
  - [ ] Confirmer les effets hover sur les cercles (couleur swap anthracite ↔ terracotta)
  - [ ] Confirmer le bloc BOSCH avec icône éclair et texte Mathys
  - [ ] Vérifier que `useReveal(0.1)` est bien appliqué

- [ ] Task 4 — Vérifier le responsive mobile (AC: #5, #6)
  - [ ] Confirmer que le connecteur horizontal est masqué en mobile (`hidden md:block`)
  - [ ] Confirmer l'espacement vertical en mobile (`gap-12 md:gap-6`)
  - [ ] Vérifier l'alignement centré des étapes en mobile (`text-center`)

- [ ] Task 5 — Préparer la migration des données (dépendance Story 1.5)
  - [ ] Documenter les données services[] inline
  - [ ] Documenter les données steps[] inline
  - [ ] Quand Story 1.5 sera complète : migrer vers `lib/data/services.ts` et `lib/data/repair-steps.ts`

## Dev Notes

### Architecture Critique
- **Deux composants Client** : `Services.tsx` et `RepairProcess.tsx` utilisent tous deux `useReveal`.
- Services utilise en plus `useParallax` — les deux refs sont combinées via une callback ref commune : `ref={(el) => { revealRef.current = el; parallaxRef.current = el; }}`.
- Les données `services[]` et `steps[]` sont actuellement inline dans les composants. Elles contiennent du JSX (texte avec `<strong>`, `<em>`) — attention lors de la migration vers `lib/data/`, il faudra soit garder du JSX soit convertir en structure data + rendu.
- Le composant `SectionTitle` est un Server Component réutilisé dans les deux sections — pas de problème car il est importé dans un Client Component (le rendu se fait côté client dans ce cas).

### Composants Existants à Réutiliser

| Composant | Chemin | Type | Notes |
|-----------|--------|------|-------|
| Services | `components/home/Services.tsx` | Client | 3 services, useReveal + useParallax |
| RepairProcess | `components/home/RepairProcess.tsx` | Client | 4 étapes + bloc BOSCH |
| SectionTitle | `components/ui/SectionTitle.tsx` | Server | Tag + titre h2, variante light |
| useReveal | `components/ui/useReveal.ts` | Hook | IntersectionObserver, threshold configurable |
| useParallax | `components/ui/useParallax.ts` | Hook | data-speed sur enfants, rAF-throttled |

### Fichiers à Créer/Modifier

| Fichier | Action | Raison |
|---------|--------|--------|
| `components/home/Services.tsx` | Modifier | Ajouter liens cliquables sur les cartes |
| `components/home/RepairProcess.tsx` | Vérifier | Auditer conformité AC |
| `lib/data/services.ts` | Créer (Story 1.5) | Centralisation données services |
| `lib/data/repair-steps.ts` | Créer (Story 1.5) | Centralisation données étapes |

### Anti-patterns à EVITER
- **NE PAS** utiliser Framer Motion ou GSAP — animations via CSS classes `.reveal` + `.stagger-N`
- **NE PAS** déclencher les animations sur `scroll` directement — utiliser IntersectionObserver via `useReveal`
- **NE PAS** ajouter de carousel/slider auto-play pour les services
- **NE PAS** charger les icônes SVG des étapes depuis un fichier externe — les garder inline pour la performance
- **NE PAS** casser la combinaison ref de `useReveal` + `useParallax` dans Services — le pattern callback ref est intentionnel

### CSS Classes Utilisées (existantes dans globals.css)
- `.reveal` : opacity 0 → 1, translateY(40px → 0), 0.8s cubic-bezier
- `.reveal.visible` : état final visible
- `.stagger-1` à `.stagger-5` : transition-delay de 0.08s à 0.4s
- `.line-grow` + `.line-grow.visible` : largeur 0 → 80px

### Project Structure Notes
- Services est le 3ème composant dans la séquence narrative (après TrustBand)
- RepairProcess est le 4ème composant
- Les deux sections partagent le fond `bg-cream`
- IDs utilisés : `#services`, `#process` — référencés par le ScrollProgress (BikeWheel)

### References
- [Source: components/home/Services.tsx] — code existant 107 lignes
- [Source: components/home/RepairProcess.tsx] — code existant 123 lignes
- [Source: components/ui/useReveal.ts] — hook IntersectionObserver
- [Source: components/ui/useParallax.ts] — hook parallax data-speed
- [Source: app/globals.css#L16-L64] — classes reveal et stagger

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
