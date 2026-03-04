# Story 1.5: Centraliser les donnees dans lib/data/

Status: ready-for-dev

## Story

As a developpeur,
I want extraire les donnees hardcodees des composants vers des modules TypeScript types dans lib/data/,
So that les donnees soient maintenables, typees et pretes pour une future migration vers une BDD.

## Acceptance Criteria

1. **Given** les donnees sont inline dans 12+ composants
   **When** je cree des modules dans lib/data/
   **Then** chaque module exporte un type TypeScript et un array const

2. **Given** les composants importent les donnees depuis lib/data/
   **When** je verifie les composants
   **Then** aucune donnee metier n'est definie inline dans les composants

3. **Given** `lib/categories.ts` existe a la racine de lib/
   **When** je le deplace vers `lib/data/categories.ts`
   **Then** tous les imports `@/lib/categories` sont mis a jour vers `@/lib/data/categories`

4. **Given** toutes les extractions sont faites
   **When** je lance `npm run build`
   **Then** le build reussit et les memes donnees sont affichees sur toutes les pages

5. **Given** toutes les extractions sont faites
   **When** je verifie les donnees
   **Then** aucune donnee metier n'est dupliquee entre modules

## Tasks / Subtasks

- [ ] Task 1 — Creer le repertoire lib/data/ et le fichier index (AC: #1)
  - [ ] Creer `lib/data/` si inexistant
  - [ ] ATTENTION OneDrive : utiliser `cp` + `rm` au lieu de `mv` pour eviter les locks

- [ ] Task 2 — Deplacer lib/categories.ts vers lib/data/categories.ts (AC: #3)
  - [ ] Copier `lib/categories.ts` vers `lib/data/categories.ts`
  - [ ] Supprimer `lib/categories.ts`
  - [ ] Mettre a jour les imports dans :
    - `app/(site)/nos-velos/page.tsx` : `@/lib/categories` -> `@/lib/data/categories`
    - `app/(site)/nos-velos/[category]/page.tsx` : `@/lib/categories` -> `@/lib/data/categories`
    - Tout autre fichier qui importe depuis `@/lib/categories` (faire un grep)

- [ ] Task 3 — Creer lib/data/team.ts (AC: #1, #2)
  - [ ] Extraire le tableau `team` de `components/home/Team.tsx` (lignes 7-40)
  - [ ] Creer le type `TeamMember` et l'exporter
  - [ ] Exporter `const team: TeamMember[]`
  - [ ] Dans Team.tsx, remplacer le tableau inline par `import { team, type TeamMember } from "@/lib/data/team"`

- [ ] Task 4 — Creer lib/data/reviews.ts (AC: #1, #2)
  - [ ] Extraire le tableau `reviews` de `components/home/Reviews.tsx` (lignes 7-32)
  - [ ] Creer le type `Review` et l'exporter
  - [ ] Exporter `const reviews: Review[]`
  - [ ] Dans Reviews.tsx, remplacer le tableau inline par l'import

- [ ] Task 5 — Creer lib/data/services.ts (AC: #1, #2)
  - [ ] Extraire le tableau `services` et le type `ServiceKey` de `app/(site)/reparations/ServicesGrid.tsx` (lignes 9-72)
  - [ ] Extraire aussi le tableau `labels` (lignes 74-85) — il est couple aux services
  - [ ] Creer les types `ServiceKey`, `Service`, `ServiceLabel` et les exporter
  - [ ] Dans ServicesGrid.tsx, remplacer par les imports

- [ ] Task 6 — Creer lib/data/pricing.ts (AC: #1, #2)
  - [ ] Extraire le tableau `pricingData` de `app/(site)/reparations/page.tsx` (lignes 17-32)
  - [ ] Creer le type `PricingRow` et l'exporter
  - [ ] Dans reparations/page.tsx, remplacer par l'import

- [ ] Task 7 — Creer lib/data/brands.ts (AC: #1, #2)
  - [ ] Extraire le tableau `brands` de `app/(site)/a-propos/page.tsx` (lignes 17-38)
  - [ ] Creer le type `Brand` et l'exporter
  - [ ] Dans a-propos/page.tsx, remplacer par l'import

- [ ] Task 8 — Creer lib/data/trust-items.ts (AC: #1, #2)
  - [ ] Extraire le tableau `items` de `components/home/TrustBand.tsx` (lignes 2-9)
  - [ ] Exporter `const trustItems: string[]`
  - [ ] Dans TrustBand.tsx, remplacer par l'import

- [ ] Task 9 — Creer lib/data/blog-posts.ts (AC: #1, #2)
  - [ ] Extraire le tableau `articles` et le type `Article` de `components/blog/BlogGrid.tsx` (lignes 5-46)
  - [ ] Creer le type `BlogArticle` (renommer pour eviter collision avec le type HTML Article)
  - [ ] Dans BlogGrid.tsx, remplacer par l'import

- [ ] Task 10 — Creer lib/data/site-config.ts (AC: #1, #5)
  - [ ] Centraliser les constantes metier repetees dans le codebase :
    - Telephone : `01 42 42 66 02` (utilise dans contact/page.tsx, Topbar.tsx, Footer.tsx)
    - Adresse : `12 Av. Henri Barbusse, 92700 Colombes`
    - Horaires : mardi-samedi 9h-19h, dimanche-lundi ferme
    - Coordonnees GPS : `48.9234, 2.2528`
    - Note Google : `4.8` sur `271` avis
    - Nom entreprise : `Colombes Cycles`
    - URL : `https://www.colombes-cycles.fr`
  - [ ] NE PAS encore modifier les composants qui utilisent ces valeurs hardcodees — juste creer le module source de verite. L'adoption dans les composants peut se faire progressivement

- [ ] Task 11 — Verifier build et rendu (AC: #4, #5)
  - [ ] `npm run build` reussit
  - [ ] Verifier visuellement que les pages affichent les memes donnees qu'avant
  - [ ] Grep pour confirmer qu'aucune donnee metier n'est dupliquee entre modules

## Dev Notes

### Architecture Critique

**Pattern de module data** : Chaque fichier dans `lib/data/` doit suivre ce pattern :

```typescript
// lib/data/example.ts

export type ExampleItem = {
  id: string;
  label: string;
  // ...
};

export const exampleItems: ExampleItem[] = [
  { id: "a", label: "Alpha" },
  // ...
] as const satisfies readonly ExampleItem[];
// Note: `as const satisfies` est optionnel mais recommande pour l'inference de type
// Si TypeScript se plaint, utiliser simplement `ExampleItem[]`
```

**Donnees avec JSX** : Certains composants contiennent des donnees qui melangent texte et JSX (ex: `Services.tsx` lignes 11-47 avec `<strong>`, `<em>`, `<br/>`). Pour ces cas, NE PAS extraire le JSX dans lib/data/. Options :
- Extraire uniquement les donnees texte brutes et laisser le formatage JSX dans le composant
- OU garder ces donnees inline si l'extraction n'apporte pas de valeur

**Donnees avec JSX inline (a NE PAS extraire)** :
- `components/home/Services.tsx` : le tableau `services` contient du JSX (`<strong>`, `<em>`) — GARDER inline
- `app/(site)/reparations/WhyUsGrid.tsx` : le tableau `reasons` contient des SVG dans `icon` — GARDER inline
- `app/(site)/a-propos/StorySection.tsx` et `ValuesGrid.tsx` : verifier le contenu avant de decider

**Donnees extractibles (texte pur ou objets simples)** :
- `components/home/Team.tsx` : `team[]` — texte pur, extractible
- `components/home/Reviews.tsx` : `reviews[]` — texte pur, extractible
- `app/(site)/reparations/ServicesGrid.tsx` : `services[]` — texte pur, extractible
- `app/(site)/reparations/page.tsx` : `pricingData[]` — texte pur, extractible
- `app/(site)/a-propos/page.tsx` : `brands[]` — texte pur, extractible
- `components/home/TrustBand.tsx` : `items[]` — strings purs, extractible
- `components/blog/BlogGrid.tsx` : `articles[]` — texte pur, extractible
- `lib/categories.ts` : deja separe, juste a deplacer

### Structure Cible

```
lib/data/
├── categories.ts      <- DEPLACE depuis lib/categories.ts (type Category, const categories)
├── team.ts            <- EXTRAIT de Team.tsx (type TeamMember, const team)
├── reviews.ts         <- EXTRAIT de Reviews.tsx (type Review, const reviews)
├── services.ts        <- EXTRAIT de ServicesGrid.tsx (type ServiceKey, Service, ServiceLabel)
├── pricing.ts         <- EXTRAIT de reparations/page.tsx (type PricingRow, const pricingData)
├── brands.ts          <- EXTRAIT de a-propos/page.tsx (type Brand, const brands)
├── trust-items.ts     <- EXTRAIT de TrustBand.tsx (const trustItems)
├── blog-posts.ts      <- EXTRAIT de BlogGrid.tsx (type BlogArticle, const articles)
└── site-config.ts     <- NOUVEAU — constantes metier centralisees
```

### Fichiers a Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `lib/categories.ts` | SUPPRIMER | Deplace vers lib/data/categories.ts |
| `lib/data/categories.ts` | CREER | Copie exacte de lib/categories.ts |
| `lib/data/team.ts` | CREER | Type TeamMember + const team |
| `lib/data/reviews.ts` | CREER | Type Review + const reviews |
| `lib/data/services.ts` | CREER | Types ServiceKey, Service, ServiceLabel + consts |
| `lib/data/pricing.ts` | CREER | Type PricingRow + const pricingData |
| `lib/data/brands.ts` | CREER | Type Brand + const brands |
| `lib/data/trust-items.ts` | CREER | const trustItems: string[] |
| `lib/data/blog-posts.ts` | CREER | Type BlogArticle + const articles |
| `lib/data/site-config.ts` | CREER | Constantes metier centralisees |
| `app/(site)/nos-velos/page.tsx` | MODIFIER | Update import categories |
| `app/(site)/nos-velos/[category]/page.tsx` | MODIFIER | Update import categories |
| `components/home/Team.tsx` | MODIFIER | Remplacer donnees inline par import |
| `components/home/Reviews.tsx` | MODIFIER | Remplacer donnees inline par import |
| `app/(site)/reparations/ServicesGrid.tsx` | MODIFIER | Remplacer donnees inline par import |
| `app/(site)/reparations/page.tsx` | MODIFIER | Remplacer pricingData inline par import |
| `app/(site)/a-propos/page.tsx` | MODIFIER | Remplacer brands inline par import |
| `components/home/TrustBand.tsx` | MODIFIER | Remplacer items inline par import |
| `components/blog/BlogGrid.tsx` | MODIFIER | Remplacer articles inline par import |

### Contenu exact de lib/data/team.ts

```typescript
export type TeamMember = {
  name: string;
  surname: string;
  role: string;
  description: string;
  accent: string;
};

export const team: TeamMember[] = [
  {
    name: "David",
    surname: "Thibault",
    role: "Fondateur · Gerant",
    description: "Quinze ans plus tard, il connait encore chaque client par son prenom, et souvent aussi par son velo.",
    accent: "C'est lui qui a pose les regles de la maison.",
  },
  // ... (copier integralement depuis Team.tsx)
];
```

### Contenu exact de lib/data/site-config.ts

```typescript
export const siteConfig = {
  name: "Colombes Cycles",
  url: "https://www.colombes-cycles.fr",
  phone: "01 42 42 66 02",
  phoneTel: "0142426602",
  address: {
    street: "12 Av. Henri Barbusse",
    city: "Colombes",
    postalCode: "92700",
    full: "12 Av. Henri Barbusse, 92700 Colombes",
  },
  geo: {
    latitude: 48.9234,
    longitude: 2.2528,
  },
  hours: {
    open: "Mardi - Samedi : 9h - 19h",
    closed: "Dimanche et Lundi : Ferme",
    days: [
      { day: "Lundi", open: false },
      { day: "Mardi", open: true, hours: "09:00-19:00" },
      { day: "Mercredi", open: true, hours: "09:00-19:00" },
      { day: "Jeudi", open: true, hours: "09:00-19:00" },
      { day: "Vendredi", open: true, hours: "09:00-19:00" },
      { day: "Samedi", open: true, hours: "09:00-19:00" },
      { day: "Dimanche", open: false },
    ],
  },
  google: {
    rating: 4.8,
    reviewCount: 271,
  },
  certifications: ["BOSCH eBike"],
  brands: ["Orbea", "Peugeot Cycles", "Gitane", "Velodeville", "Lombardo", "Sparta"],
  owner: "David Thibault",
} as const;
```

### Anti-patterns a EVITER

- NE PAS extraire les donnees contenant du JSX (composants React) dans lib/data/ — seules les donnees serialisables
- NE PAS creer de barrel export (`lib/data/index.ts`) pour le moment — chaque module est importe directement
- NE PAS dupliquer les donnees entre modules (ex: les marques sont dans brands.ts ET categories.ts — c'est OK car ce sont des contextes differents)
- NE PAS modifier le comportement ou le rendu des composants — cette story est un REFACTORING pur
- NE PAS renommer les variables dans les composants — garder les memes noms pour minimiser les diffs
- OneDrive : utiliser `cp -r` + `rm -rf` au lieu de `mv` pour eviter les locks fichier

### Project Structure Notes

- Suit la decision architecturale : donnees dans `lib/data/` avec types TypeScript
- Prepare la migration future vers une BDD (Supabase) — les modules deviennent des points d'abstraction
- Les imports utilisent l'alias `@/lib/data/` qui fonctionne avec le tsconfig existant

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Data Layer]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.5]
- [Source: lib/categories.ts — module existant a deplacer]
- [Source: components/home/Team.tsx#lignes 7-40 — donnees team inline]
- [Source: components/home/Reviews.tsx#lignes 7-32 — donnees reviews inline]
- [Source: app/(site)/reparations/ServicesGrid.tsx#lignes 9-85 — donnees services inline]
- [Source: app/(site)/reparations/page.tsx#lignes 17-32 — donnees pricing inline]
- [Source: app/(site)/a-propos/page.tsx#lignes 17-38 — donnees brands inline]
- [Source: components/home/TrustBand.tsx#lignes 2-9 — donnees trust inline]
- [Source: components/blog/BlogGrid.tsx#lignes 5-46 — donnees blog inline]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List
