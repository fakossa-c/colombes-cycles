# Story 2.5: Section Boutique

Status: ready-for-dev

## Story

As a visiteur,
I want voir la boutique physique à travers des visuels et un texte engageant,
So that j'aie envie de me déplacer et visiter le magasin.

## Acceptance Criteria

1. **Given** un visiteur scroll après le processus de réparation, **When** la section Boutique entre dans le viewport, **Then** elle s'affiche avec un fond `bg-ivory` (alternance visuelle avec les sections précédentes en `bg-cream`).

2. **Given** la section Boutique, **When** elle est visible, **Then** le texte côté gauche apparaît en `reveal-left` (translateX -60px → 0) et la grille de photos côté droit apparaît en `reveal-right` (translateX +60px → 0).

3. **Given** le texte de la section, **When** il est affiché, **Then** il contient : SectionTitle avec tag "La boutique" et titre "Un magasin vrai, pas une vitrine.", suivi de deux paragraphes descriptifs. Une ligne terracotta animée `.line-grow` (0 → 80px) apparaît sous le texte.

4. **Given** la grille de photos, **When** elle est affichée en desktop, **Then** elle utilise une grille CSS 12 colonnes × 6 rangées avec 4 zones : image principale (7col × 4row), petite image haut-droite (5col × 3row), image bas-gauche (5col × 2row), image bas-droite terracotta (7col × 3row). Hauteur fixe `h-[500px] md:h-[550px]`.

5. **Given** le responsive, **When** le visiteur est en mobile (< 1024px), **Then** le layout passe en colonne empilée : texte au-dessus, grille photos en dessous. La grille garde sa structure 12 colonnes.

6. **Given** les données, **When** le composant se charge, **Then** les données (textes, libellés photos) proviennent de `lib/data/` (dépendance Story 1.5). En attendant, les données inline sont acceptées.

7. **Given** l'état actuel, **When** les photos ne sont pas encore fournies, **Then** les placeholders SVG (icônes image) avec labels texte restent en place. Prévoir des `<Image>` Next.js avec `fill` + `object-cover` pour le remplacement futur.

## Tasks / Subtasks

- [ ] Task 1 — Auditer le composant Boutique existant (AC: #1, #2, #3)
  - [ ] Confirmer `bg-ivory` comme fond de section
  - [ ] Confirmer `useReveal(0.1)` appliqué à la section
  - [ ] Confirmer `.reveal-left` sur le bloc texte
  - [ ] Confirmer `.reveal-right` sur la grille photos
  - [ ] Confirmer `.line-grow` sous le texte
  - [ ] Confirmer SectionTitle avec tag "La boutique"

- [ ] Task 2 — Vérifier la grille de photos (AC: #4)
  - [ ] Confirmer la grille `grid-cols-12 grid-rows-6 gap-3`
  - [ ] Vérifier les 4 zones avec les bons col-span et row-span
  - [ ] Confirmer les placeholders SVG et labels texte
  - [ ] Vérifier l'effet hover sur l'image principale (gradient overlay)

- [ ] Task 3 — Vérifier le responsive (AC: #5)
  - [ ] Confirmer `grid lg:grid-cols-2` pour le layout principal
  - [ ] Confirmer `gap-12 lg:gap-20 items-center`
  - [ ] Vérifier que le texte est au-dessus de la grille en mobile

- [ ] Task 4 — Préparer le remplacement des placeholders (AC: #7)
  - [ ] Documenter les dimensions attendues pour chaque zone photo
  - [ ] Prévoir les composants `<Image>` Next.js avec `fill`, `sizes`, `alt` descriptif
  - [ ] Zone principale : ratio ~7:4, label "L'atelier"
  - [ ] Zone haut-droite : ratio ~5:3, label "La boutique"
  - [ ] Zone bas-gauche : ratio ~5:2, label "Vue intérieure"
  - [ ] Zone bas-droite : ratio ~7:3, label "Les vélos en rayon"

- [ ] Task 5 — Préparer la migration des données (AC: #6, dépendance Story 1.5)
  - [ ] Documenter les textes inline
  - [ ] Quand Story 1.5 : migrer vers `lib/data/boutique.ts`

## Dev Notes

### Architecture Critique
- **Client Component** : Boutique utilise `useReveal` qui nécessite `"use client"`.
- Le composant utilise uniquement `useReveal`, pas `useParallax` — pas de parallax dans cette section (intentionnel, pour éviter la surcharge visuelle).
- Les placeholders photos sont actuellement des `<div>` avec fond gris/terracotta et icônes SVG inline. Quand les vraies photos arriveront, il faudra les remplacer par des `<Image>` Next.js.
- La grille de photos est une grille CSS complexe (12col × 6row) — ne pas la simplifier, elle crée un layout asymétrique intentionnel.

### Composants Existants à Réutiliser

| Composant | Chemin | Type | Notes |
|-----------|--------|------|-------|
| Boutique | `components/home/Boutique.tsx` | Client | Composant complet, à auditer |
| SectionTitle | `components/ui/SectionTitle.tsx` | Server | Tag + titre h2 |
| useReveal | `components/ui/useReveal.ts` | Hook | IntersectionObserver |

### Fichiers à Créer/Modifier

| Fichier | Action | Raison |
|---------|--------|--------|
| `components/home/Boutique.tsx` | Vérifier | Conformité AC, préparer remplacement photos |
| `lib/data/boutique.ts` | Créer (Story 1.5) | Centralisation textes boutique |

### Anti-patterns à EVITER
- **NE PAS** utiliser un carousel/slider pour les photos — grille statique avec reveal
- **NE PAS** charger les images sans `next/image` (quand elles seront fournies)
- **NE PAS** supprimer les placeholders SVG tant que les vraies photos ne sont pas prêtes
- **NE PAS** ajouter `useParallax` — la section Boutique est volontairement sans parallax
- **NE PAS** casser la grille 12×6 en grille simplifiée — l'asymétrie est voulue

### CSS Classes Utilisées (existantes dans globals.css)
- `.reveal-left` : opacity 0, translateX(-60px → 0), 0.8s cubic-bezier
- `.reveal-right` : opacity 0, translateX(+60px → 0), 0.8s cubic-bezier
- `.line-grow` : width 0 → 80px, 1.2s cubic-bezier
- `.reveal-left.visible`, `.reveal-right.visible`, `.line-grow.visible` : états finaux

### Project Structure Notes
- Boutique est le 5ème composant dans la séquence narrative (après RepairProcess)
- ID : `#boutique` — référencé par le ScrollProgress (BikeWheel) waypoint "Boutique"
- Fond `bg-ivory` pour le contraste avec `bg-cream` des sections précédentes

### References
- [Source: components/home/Boutique.tsx] — code existant 77 lignes
- [Source: components/ui/SectionTitle.tsx] — composant titre réutilisable
- [Source: app/globals.css#L27-L47] — classes reveal-left et reveal-right
- [Source: app/globals.css#L180-L186] — classe line-grow

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
