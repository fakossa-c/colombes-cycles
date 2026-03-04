# Story 4.1: Page A propos -- histoire, valeurs et certification

Status: ready-for-dev

## Story

As a visiteur,
I want decouvrir l'histoire de David, les valeurs et la certification BOSCH,
So that confiance et connexion a des passionnes authentiques.

## Acceptance Criteria

1. **Given** je navigue vers /a-propos
   **When** la page se charge
   **Then** le PageHero affiche le titre "15 ans de velos. Et ca continue.", le tag "Notre histoire" et le breadcrumb Accueil > A propos

2. **Given** la page /a-propos est chargee
   **When** je scrolle vers la section histoire
   **Then** le composant StorySection affiche le recit du fondateur avec des blockquotes stylees en bordure terracotta (border-l-4 border-terracotta), animate via useReveal

3. **Given** la page /a-propos est chargee
   **When** je scrolle vers la grille de valeurs
   **Then** le composant ValuesGrid affiche les 5 valeurs (Franchise, Maitrise, Ancrage, Soin, Caractere) dans une grille responsive (md:2col, lg:3col), chaque carte avec bordure fine et animation stagger

4. **Given** la page /a-propos est chargee
   **When** je scrolle vers la section certification
   **Then** une section fond anthracite affiche le texte de certification BOSCH eBike avec icone eclair terracotta et typographie claire sur fond sombre (SectionTitle light)

5. **Given** la page /a-propos est chargee
   **When** je scrolle vers la section marques
   **Then** une grille 2 colonnes affiche les marques partenaires (Orbea, Peugeot Cycles, Gitane, Velodeville) avec nom en Syne bold et description en texte secondaire

6. **Given** la page /a-propos est chargee
   **When** je scrolle vers le bas
   **Then** un CtaBlock "Envie de passer nous voir ?" avec lien vers /contact est affiche

7. **Given** un moteur de recherche indexe la page
   **When** il lit les metadonnees
   **Then** le title est "A Propos -- Colombes Cycles, 15 ans d'expertise", la description mentionne David Thibault et 4.8/5, et le canonical est https://www.colombes-cycles.fr/a-propos

8. **Given** la page est chargee sur un ecran mobile (< 768px)
   **When** je consulte la page
   **Then** toutes les sections s'empilent correctement, les grilles passent en 1 colonne, et les textes restent lisibles

## Tasks / Subtasks

- [ ] Task 1 -- Verifier/adapter les donnees marques vers lib/data/brands.ts (AC: #5)
  - [ ] Creer `lib/data/brands.ts` avec le tableau des marques (Orbea, Peugeot Cycles, Gitane, Velodeville) et leurs descriptions
  - [ ] Importer les donnees dans `app/(site)/a-propos/page.tsx` au lieu du tableau inline

- [ ] Task 2 -- Verifier le composant StorySection (AC: #2)
  - [ ] Confirmer que `app/(site)/a-propos/StorySection.tsx` existe et fonctionne avec useReveal
  - [ ] Verifier les blockquotes border-l-4 border-terracotta
  - [ ] Verifier le contenu (histoire David, equipe, ancrage local, note Google)

- [ ] Task 3 -- Verifier le composant ValuesGrid (AC: #3)
  - [ ] Confirmer que `app/(site)/a-propos/ValuesGrid.tsx` existe avec les 5 valeurs
  - [ ] Verifier la grille responsive (grid md:grid-cols-2 lg:grid-cols-3)
  - [ ] Verifier les animations reveal stagger

- [ ] Task 4 -- Verifier la section Certification BOSCH (AC: #4)
  - [ ] Confirmer la section bg-anthracite avec SectionTitle light
  - [ ] Verifier l'icone eclair SVG en terracotta
  - [ ] Verifier le contenu (formation Mathys, diagnostic BOSCH eBike Flow)

- [ ] Task 5 -- Verifier la section Marques (AC: #5)
  - [ ] Confirmer la grille md:grid-cols-2 pour les cartes marques
  - [ ] Verifier SectionTitle avec tag "Nos marques"

- [ ] Task 6 -- Ajouter les animations reveal manquantes (AC: #2, #3, #4, #5)
  - [ ] Verifier que la section BOSCH et la section Marques utilisent useReveal
  - [ ] Ajouter les classes reveal aux elements qui ne les ont pas encore

- [ ] Task 7 -- Verifier les metadonnees SEO (AC: #7)
  - [ ] Confirmer le Metadata export avec title, description, canonical
  - [ ] Verifier la coherence avec le contenu de la page

- [ ] Task 8 -- Test responsive et accessibilite (AC: #8)
  - [ ] Tester sur mobile (375px), tablette (768px), desktop (1280px)
  - [ ] Verifier l'empilement des grilles sur mobile
  - [ ] Verifier les contrastes texte/fond (surtout section anthracite)

## Dev Notes

### Architecture Critique

La page `/a-propos` existe deja quasi complete dans `app/(site)/a-propos/page.tsx`. Cette story concerne principalement la **validation**, l'**extraction des donnees** vers lib/data/, et l'ajout d'animations reveal aux sections qui n'en ont pas encore (BOSCH et Marques).

La page est un **Server Component** (pas de "use client"). Les composants interactifs StorySection et ValuesGrid sont des Client Components isoles.

### Composants Existants a Reutiliser

| Composant | Chemin | Type | Role |
|-----------|--------|------|------|
| PageHero | `@/components/ui/PageHero` | Server | Hero avec titre, tag, breadcrumb |
| SectionTitle | `@/components/ui/SectionTitle` | Server | Titre section avec tag optionnel, variante light |
| CtaBlock | `@/components/ui/CtaBlock` | Client | CTA avec bouton, utilise useReveal |
| Button | `@/components/ui/Button` | Server | Bouton/lien avec variantes |
| Breadcrumb | `@/components/ui/Breadcrumb` | Server | Fil d'Ariane |
| useReveal | `@/components/ui/useReveal` | Hook | IntersectionObserver pour animations reveal |
| StorySection | `./StorySection` | Client | Recit fondateur avec blockquotes |
| ValuesGrid | `./ValuesGrid` | Client | Grille des 5 valeurs |

### Fichiers a Creer/Modifier

| Action | Fichier |
|--------|---------|
| CREER | `lib/data/brands.ts` -- extraction des donnees marques |
| MODIFIER | `app/(site)/a-propos/page.tsx` -- importer brands depuis lib/data, ajouter reveal aux sections BOSCH/Marques |

### Donnees Marques (a extraire)

```typescript
// lib/data/brands.ts
export type Brand = {
  name: string;
  description: string;
};

export const brands: Brand[] = [
  {
    name: "Orbea",
    description: "Fabricant basque fonde en 1840...",
  },
  {
    name: "Peugeot Cycles",
    description: "Une marque francaise avec 135 ans d'histoire...",
  },
  {
    name: "Gitane",
    description: "Autre marque francaise historique...",
  },
  {
    name: "Velodeville",
    description: "Une marque contemporaine, orientee velo urbain...",
  },
];
```

### Pattern Reveal pour sections Server

Les sections BOSCH et Marques sont rendues dans le Server Component page.tsx. Pour ajouter des animations reveal, deux options :
1. Extraire en Client Components dedies (comme StorySection/ValuesGrid)
2. Wrapper avec un composant Client minimal qui applique useReveal

Option recommandee : creer un composant `RevealSection` generique Client qui wrap les enfants avec useReveal.

### Anti-patterns a EVITER

- NE PAS ajouter de bibliotheque d'animation tierce (framer-motion, GSAP, etc.)
- NE PAS utiliser d'etat global pour les donnees de la page
- NE PAS mettre "use client" sur page.tsx (garder Server Component)
- NE PAS hardcoder les marques dans la page si lib/data/brands.ts est cree

### Project Structure Notes

```
app/(site)/a-propos/
  page.tsx          -- Server Component, metadata export
  StorySection.tsx  -- Client Component, useReveal
  ValuesGrid.tsx    -- Client Component, useReveal
```

### Dependencies (Epic 1)

- Story 1.1 (route groups) : DOIT etre completee avant -- les fichiers sont sous app/(site)/
- Story 1.3 (bug CSS Button) : le hover du Button dans CtaBlock doit fonctionner
- Story 1.4 (useReveal) : le hook useReveal doit exister dans components/ui/
- Story 1.5 (centralisation donnees) : lib/data/ doit exister pour brands.ts

### References

- Direction artistique : palette anthracite/ivoire/terracotta/creme, Syne titres, Inter corps
- Contenu David : coureur des 8 ans, stage 14 ans, CAP, 22 ans Cycles Moisdon, ouverture 2016
- Equipe : David, Francois, Mathys (BOSCH), Christophe + apprenti

## Dev Agent Record

### Agent Model Used
(a remplir)

### Debug Log References
(a remplir)

### Completion Notes List
(a remplir)

### File List
(a remplir)
