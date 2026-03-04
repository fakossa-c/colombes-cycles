# Story 3.1: Page Nos Velos -- listing des 5 categories

Status: ready-for-dev

## Story

As a visiteur,
I want voir les 5 categories de velos disponibles sur une page dediee,
So that je puisse choisir la categorie qui correspond a mon besoin.

## Acceptance Criteria

1. **Given** le visiteur accede a /nos-velos (FR7)
   **When** la page se charge
   **Then** 5 categories sont affichees : ville, electrique, VTT, enfants, accessoires

2. **Given** les 5 categories sont affichees
   **When** le visiteur clique sur une categorie
   **Then** il est redirige vers /nos-velos/[category] (ex: /nos-velos/velos-de-ville)

3. **Given** la page /nos-velos est chargee
   **When** les elements entrent dans le viewport
   **Then** les animations reveal stagger fonctionnent correctement (FR39, corrige en Story 1.4)

4. **Given** la page /nos-velos est chargee
   **When** je verifie les classes CSS dynamiques
   **Then** les template literals avec `stagger-${index + 1}` s'interpolent correctement (FR38, corrige en Story 1.3)

5. **Given** la page /nos-velos est chargee
   **When** je verifie la source des donnees
   **Then** les categories proviennent de `lib/data/categories.ts` (pas de donnees inline)

6. **Given** la page /nos-velos est buildee
   **When** je lance `npm run build`
   **Then** la page est statiquement generee (SSG) sans erreur

## Tasks / Subtasks

- [ ] Task 1 -- Migrer les donnees categories vers lib/data/categories.ts (AC: #5)
  - [ ] Creer le dossier `lib/data/` s'il n'existe pas encore (depend de Story 1.5)
  - [ ] Deplacer `lib/categories.ts` vers `lib/data/categories.ts` OU re-exporter depuis `lib/data/categories.ts`
  - [ ] Verifier que le type `Category` et la fonction `getCategoryBySlug` sont exportes
  - [ ] Mettre a jour les imports dans `app/(site)/nos-velos/page.tsx` : `import { categories } from "@/lib/data/categories"`
  - [ ] Mettre a jour les imports dans `app/(site)/nos-velos/[category]/page.tsx` : idem

- [ ] Task 2 -- Enrichir la page listing avec les taglines et les donnees centralisees (AC: #1, #2)
  - [ ] Verifier que le `taglines` Record dans page.tsx est coherent avec les slugs des categories
  - [ ] OPTION : deplacer les taglines dans le type `Category` de lib/data/categories.ts (ajouter un champ `tagline: string`)
  - [ ] Verifier que les 5 categories s'affichent dans la grille (grid md:grid-cols-2 lg:grid-cols-3)
  - [ ] Verifier que chaque carte est un `<Link>` vers `/nos-velos/${cat.slug}`

- [ ] Task 3 -- Verifier les animations reveal (AC: #3)
  - [ ] La page est actuellement un Server Component (pas de "use client")
  - [ ] Les classes `reveal stagger-N` sont presentes sur chaque carte
  - [ ] IMPORTANT : les classes `reveal` ne fonctionnent que si un parent a un `useReveal()` hook OU si la page est wrappee dans un client component qui observe le viewport
  - [ ] Story 1.4 doit avoir corrige ce probleme : soit en convertissant la section en client component, soit en ajoutant un wrapper avec useReveal
  - [ ] Verifier que la correction de Story 1.4 est bien appliquee avant de considerer cette tache terminee

- [ ] Task 4 -- Verifier les classes CSS dynamiques (AC: #4)
  - [ ] Dans page.tsx ligne 44, verifier que le className utilise bien des backticks : `` className={`group reveal stagger-${index + 1} block ...`} ``
  - [ ] Actuellement le code utilise deja les backticks (confirme a la lecture) mais Story 1.3 doit valider
  - [ ] Ce task est un controle qualite post-Story 1.3

- [ ] Task 5 -- Verifier le build SSG (AC: #6)
  - [ ] Lancer `npm run build`
  - [ ] Verifier que /nos-velos apparait dans la sortie build comme "Static"
  - [ ] Verifier zero erreur TypeScript

## Dev Notes

### Architecture Critique

**La page /nos-velos/page.tsx est un Server Component.**
- Pas de `"use client"` en haut du fichier
- Importe `PageHero`, `CtaBlock`, et les `categories` depuis `@/lib/categories`
- Les animations `reveal` necessitent un observateur IntersectionObserver cote client
- La Story 1.4 doit avoir resolu ce probleme en amont (soit wrapper client, soit autre solution)

**Le fichier categories.ts est actuellement a `lib/categories.ts` (pas dans lib/data/).**
- La Story 1.5 prevoit de centraliser dans `lib/data/`
- Si Story 1.5 n'est pas encore faite, cette story doit adapter ses imports en consequence
- Import actuel : `import { categories } from "@/lib/categories"`
- Import cible apres Story 1.5 : `import { categories } from "@/lib/data/categories"`

### Composants Existants a Reutiliser

| Composant | Chemin | Role |
|-----------|--------|------|
| PageHero | `@/components/ui/PageHero.tsx` | Hero de page avec tag, title, subtitle, breadcrumbs |
| CtaBlock | `@/components/ui/CtaBlock.tsx` | Bloc CTA en bas de page (Client Component, utilise useReveal) |
| Breadcrumb | `@/components/ui/Breadcrumb.tsx` | Fil d'Ariane (utilise via PageHero) |
| useReveal | `@/components/ui/useReveal.ts` | Hook IntersectionObserver pour animations reveal |

### Fichiers a Creer/Modifier

| Action | Fichier | Raison |
|--------|---------|--------|
| Modifier | `app/(site)/nos-velos/page.tsx` | Mettre a jour import categories si Story 1.5 faite |
| Creer/Modifier | `lib/data/categories.ts` | Centralisation donnees (si Story 1.5 pas encore faite) |
| Modifier | `lib/categories.ts` | Ajouter champ `tagline` au type Category (optionnel) |

### Anti-patterns a EVITER

- **NE PAS ajouter "use client" a page.tsx sans raison** : la page profite du SSG en tant que Server Component. Si les animations reveal necessitent du client, utiliser un wrapper intermediaire.
- **NE PAS dupliquer les donnees** : les taglines inline dans page.tsx devraient migrer vers le type Category dans lib/data/categories.ts
- **NE PAS utiliser de librairie d'animation tierce** (framer-motion, GSAP, etc.) : les animations sont CSS + IntersectionObserver maison

### Project Structure Notes

```
app/(site)/nos-velos/
  page.tsx           ← Page listing categories (Server Component)
  [category]/
    page.tsx         ← Page detail categorie (Server Component)

lib/
  categories.ts      ← Donnees actuelles (a migrer vers lib/data/)

lib/data/            ← Dossier cible apres Story 1.5
  categories.ts      ← Type Category + donnees + getCategoryBySlug
```

### Dependances

- **Story 1.3** (MUST) : corrige le template literal CSS casse dans [category]/page.tsx
- **Story 1.4** (MUST) : ajoute useReveal a /nos-velos pour que les animations reveal fonctionnent
- **Story 1.5** (SHOULD) : centralise les donnees dans lib/data/ -- si pas encore fait, adapter les imports

### References

- FR7 : Le visiteur peut voir les 5 categories de velos
- FR38 : Les classes CSS dynamiques fonctionnent
- FR39 : Les animations reveal fonctionnent sur /nos-velos
- NFR7 : 100% SSG
- Palette : anthracite #1C1C1E, terracotta #C4622D, ivoire #F5F0E8

## Dev Agent Record

### Agent Model Used
(a remplir par le dev agent)

### Debug Log References
(a remplir par le dev agent)

### Completion Notes List
(a remplir par le dev agent)

### File List
(a remplir par le dev agent)
