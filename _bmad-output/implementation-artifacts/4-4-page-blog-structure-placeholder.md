# Story 4.4: Page Blog -- structure placeholder

Status: ready-for-dev

## Story

As a visiteur,
I want voir la page blog avec articles en attente,
So that savoir que du contenu est a venir.

## Acceptance Criteria

1. **Given** je navigue vers /blog
   **When** la page se charge
   **Then** le PageHero affiche le titre "Conseils, guides et actualites velo.", le sous-titre "Des articles pratiques pour rouler mieux, plus longtemps.", le tag "Blog" et le breadcrumb Accueil > Blog

2. **Given** la page /blog est chargee
   **When** je vois la grille d'articles
   **Then** le composant BlogGrid affiche 4 articles placeholder dans une grille responsive (md:2col, lg:3col)

3. **Given** les articles sont affiches
   **When** je tente de cliquer sur un article
   **Then** les liens sont desactives (pas de <a> ou <Link>, le texte "Lire l'article" est un <span> non-cliquable)

4. **Given** la page /blog est chargee
   **When** je vois la grille
   **Then** un message "Contenu arrive prochainement" est visible (dans la page ou integre dans le composant)

5. **Given** la page /blog est chargee
   **When** je scrolle vers le bas
   **Then** un CtaBlock "Une question sur votre velo ?" avec lien vers /contact est affiche

6. **Given** un moteur de recherche indexe la page
   **When** il lit les metadonnees
   **Then** le title est "Conseils Velo & Entretien -- Blog Colombes Cycles", la description mentionne conseils/guides, le canonical est https://www.colombes-cycles.fr/blog

7. **Given** la page est chargee
   **When** les sections entrent dans le viewport
   **Then** les articles apparaissent avec animation reveal stagger

8. **Given** les donnees d'articles
   **When** je verifie la source
   **Then** les articles proviennent de `lib/data/blog-posts.ts` (centralisation donnees story 1.5)

## Tasks / Subtasks

- [ ] Task 1 -- Extraire les donnees articles vers lib/data/blog-posts.ts (AC: #8)
  - [ ] Creer `lib/data/blog-posts.ts` avec le type Article et le tableau des 4 articles placeholder
  - [ ] Exporter le type et les donnees

- [ ] Task 2 -- Adapter BlogGrid pour importer depuis lib/data/ (AC: #2, #8)
  - [ ] Modifier `components/blog/BlogGrid.tsx` pour importer les articles depuis `lib/data/blog-posts.ts`
  - [ ] Supprimer le tableau articles inline du composant

- [ ] Task 3 -- Confirmer que les liens sont desactives (AC: #3)
  - [ ] Verifier que BlogCard utilise un `<span>` et non un `<a>` ou `<Link>` pour "Lire l'article"
  - [ ] Verifier qu'il n'y a pas de `<article>` wrappee dans un lien
  - [ ] L'etat actuel utilise deja un `<span>` -- confirmer que c'est le cas

- [ ] Task 4 -- Ajouter le message "Contenu arrive prochainement" (AC: #4)
  - [ ] Ajouter un paragraphe ou bandeau au-dessus ou en dessous de la grille
  - [ ] Style : texte centre, couleur secondaire, discret mais visible
  - [ ] Suggestion : sous le PageHero, avant la grille, ou integre dans BlogGrid

- [ ] Task 5 -- Verifier les animations reveal (AC: #7)
  - [ ] Confirmer que BlogGrid utilise useReveal
  - [ ] Confirmer les classes reveal stagger-N sur chaque BlogCard
  - [ ] L'etat actuel a deja les animations -- verifier

- [ ] Task 6 -- Verifier le CtaBlock (AC: #5)
  - [ ] Confirmer le CtaBlock en bas de page avec les bons textes et lien /contact

- [ ] Task 7 -- Verifier les metadonnees SEO (AC: #6)
  - [ ] Confirmer le Metadata export avec title, description, canonical, openGraph

- [ ] Task 8 -- Test responsive (AC: #2)
  - [ ] Verifier la grille : 1 col mobile, 2 col tablette, 3 col desktop
  - [ ] Verifier que les images placeholder ne creent pas de CLS (aspect-[16/9])

## Dev Notes

### Architecture Critique

La page `/blog` existe deja dans `app/(site)/blog/page.tsx` et est **quasi complete**. Le composant `BlogGrid` dans `components/blog/BlogGrid.tsx` affiche deja 4 articles placeholder avec animations.

Les modifications principales sont :
1. **Extraction des donnees** vers `lib/data/blog-posts.ts` (centralisation story 1.5)
2. **Ajout du message "prochainement"**
3. **Verification** que les liens sont bien desactives

### Composants Existants a Reutiliser

| Composant | Chemin | Type | Role |
|-----------|--------|------|------|
| PageHero | `@/components/ui/PageHero` | Server | Hero avec titre, tag, breadcrumb |
| BlogGrid | `@/components/blog/BlogGrid` | Client | Grille 4 articles avec reveal stagger |
| CtaBlock | `@/components/ui/CtaBlock` | Client | CTA fin de page |
| useReveal | `@/components/ui/useReveal` | Hook | Animations reveal |

### Fichiers a Creer/Modifier

| Action | Fichier |
|--------|---------|
| CREER | `lib/data/blog-posts.ts` -- donnees articles placeholder |
| MODIFIER | `components/blog/BlogGrid.tsx` -- importer depuis lib/data/, supprimer donnees inline |
| MODIFIER | `app/(site)/blog/page.tsx` -- ajouter message "prochainement" |

### Donnees Articles (a extraire)

```typescript
// lib/data/blog-posts.ts
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
};

export const blogPosts: Article[] = [
  {
    slug: "guide-velo-electrique-colombes",
    title: "Velo electrique a Colombes : notre guide complet pour choisir votre VAE",
    excerpt: "Ville, cargo, VTT electrique : comment choisir le bon VAE pour vos trajets en Ile-de-France.",
    date: "15 mars 2026",
    dateISO: "2026-03-15",
  },
  {
    slug: "entretien-velo-colombes",
    title: "Comment entretenir son velo a Colombes : 7 gestes simples pour durer",
    excerpt: "Quelques gestes reguliers suffisent a prolonger la vie de votre velo.",
    date: "10 mars 2026",
    dateISO: "2026-03-10",
  },
  {
    slug: "pistes-cyclables-colombes-hauts-de-seine",
    title: "Pistes cyclables a Colombes et autour : nos itineraires favoris",
    excerpt: "De Colombes a Bois-Colombes, Asnieres ou La Defense : les meilleurs trajets velo.",
    date: "5 mars 2026",
    dateISO: "2026-03-05",
  },
  {
    slug: "revision-velo-professionnel",
    title: "Revision de velo : quand et pourquoi confier son velo a un professionnel",
    excerpt: "Les signes qui montrent qu'il est temps de passer a l'atelier.",
    date: "1 mars 2026",
    dateISO: "2026-03-01",
  },
];
```

### Liens Desactives -- Verification

Le composant BlogCard actuel utilise deja un `<span>` pour "Lire l'article" (pas de `<a>` ou `<Link>`). C'est le comportement correct pour des articles placeholder. A confirmer qu'aucun wrapper `<Link>` n'est ajoute autour de `<article>`.

Le texte du span actuel :
```tsx
<span className="mt-4 inline-block text-[0.8rem] font-semibold tracking-wide text-terracotta underline underline-offset-4 decoration-2 decoration-terracotta/30 transition-colors duration-300 group-hover:decoration-terracotta">
  Lire l'article
</span>
```

**Note** : le `group-hover` donne un effet visuel de lien cliquable. Envisager de retirer le hover effect pour ne pas tromper l'utilisateur, ou ajouter un `cursor-default` sur la carte.

### Message "Prochainement"

Suggestion d'integration dans page.tsx, entre PageHero et BlogGrid :

```tsx
<section className="pt-16 pb-8 md:pt-24 md:pb-12">
  <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
    <p className="text-anthracite/50 text-[0.9rem] italic">
      Nos articles arrivent prochainement. En attendant, voici un apercu de ce qu'on prepare.
    </p>
  </div>
</section>
```

### Anti-patterns a EVITER

- NE PAS creer de vrais liens vers /blog/[slug] (les articles n'existent pas)
- NE PAS ajouter de systeme CMS a ce stade
- NE PAS utiliser de bibliotheque d'animation tierce
- NE PAS mettre "use client" sur page.tsx

### Project Structure Notes

```
app/(site)/blog/
  page.tsx         -- Server Component, metadata export

components/blog/
  BlogGrid.tsx     -- Client Component, grille + BlogCard

lib/data/
  blog-posts.ts    -- Donnees articles placeholder (a creer)
```

### Dependencies (Epic 1)

- Story 1.1 (route groups) : fichiers sous app/(site)/
- Story 1.4 (useReveal + liens blog desactives) : le hook et le pattern de liens desactives doivent etre en place
- Story 1.5 (centralisation donnees) : lib/data/ doit exister

### References

- 4 articles placeholder avec themes SEO local (VAE, entretien, pistes cyclables, revision)
- Dates fictives mars 2026
- Images placeholder : fond neutre avec icone SVG

## Dev Agent Record

### Agent Model Used
(a remplir)

### Debug Log References
(a remplir)

### Completion Notes List
(a remplir)

### File List
(a remplir)
