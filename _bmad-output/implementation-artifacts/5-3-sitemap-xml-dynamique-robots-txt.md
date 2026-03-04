# Story 5.3: Sitemap XML dynamique et robots.txt

Status: ready-for-dev

## Story
As a moteur de recherche,
I want un sitemap XML complet et un robots.txt correctement configure,
So that toutes les pages publiques sont indexees et les routes admin sont exclues du crawl.

## Acceptance Criteria

1. **Given** le fichier `app/sitemap.ts`, **When** un moteur de recherche accede a `/sitemap.xml`, **Then** le sitemap contient toutes les routes publiques : `/`, `/nos-velos`, `/nos-velos/velos-de-ville`, `/nos-velos/velos-electriques`, `/nos-velos/vtt`, `/nos-velos/velos-enfants`, `/nos-velos/accessoires`, `/reparations`, `/a-propos`, `/contact`, `/blog`, `/mentions-legales`.

2. **Given** chaque entree du sitemap, **When** on l'inspecte, **Then** elle contient `url` (URL absolue), `lastModified` (date ISO), `changeFrequency` (weekly/monthly/yearly) et `priority` (0.0-1.0).

3. **Given** le fichier `app/robots.ts`, **When** un moteur de recherche accede a `/robots.txt`, **Then** le robots.txt autorise le crawl de toutes les pages publiques (`Allow: /`), bloque `/admin/*` (`Disallow: /admin`), et reference le sitemap (`Sitemap: https://www.colombes-cycles.fr/sitemap.xml`).

4. **Given** le sitemap et le robots.txt, **When** on ajoute une nouvelle page publique a l'avenir, **Then** le sitemap doit etre mis a jour manuellement (approche statique) pour inclure la nouvelle route.

## Tasks / Subtasks

- [ ] Task 1 -- Auditer le sitemap existant (AC: #1, #2)
  - [ ] Verifier `app/sitemap.ts` : lister les routes presentes et manquantes
  - [ ] **Route manquante** : `/mentions-legales` n'est pas dans le sitemap actuel -- l'ajouter
  - [ ] Verifier que les slugs de categories correspondent a ceux de `lib/categories.ts` : `velos-de-ville`, `velos-electriques`, `vtt`, `velos-enfants`, `accessoires`

- [ ] Task 2 -- Ajouter `lastModified` a toutes les entrees (AC: #2)
  - [ ] Ajouter `lastModified: new Date("YYYY-MM-DD")` a chaque entree
  - [ ] Utiliser la date de derniere modification reelle ou la date de deploiement initial

- [ ] Task 3 -- Ajouter la route `/mentions-legales` au sitemap (AC: #1)
  - [ ] Ajouter l'entree avec `priority: 0.3`, `changeFrequency: "yearly"`, `lastModified`

- [ ] Task 4 -- Auditer le robots.txt existant (AC: #3)
  - [ ] Verifier `app/robots.ts` : les regles sont deja correctes (`Allow: /`, `Disallow: ["/api/", "/_next/", "/admin/"]`, sitemap reference)
  - [ ] Confirmer que le format est correct pour les moteurs de recherche

- [ ] Task 5 -- Test de validation (AC: #1-#4)
  - [ ] Lancer `next dev`, acceder a `http://localhost:3000/sitemap.xml` et verifier toutes les routes
  - [ ] Acceder a `http://localhost:3000/robots.txt` et verifier le contenu
  - [ ] Verifier avec Google Search Console (si disponible) ou un validateur en ligne

## Dev Notes

### Architecture Critique

Les deux fichiers existent deja et sont fonctionnels. Cette story est un audit + correction mineure.

**`app/sitemap.ts`** (existant) :
- Utilise `MetadataRoute.Sitemap` de Next.js
- Contient 11 routes sur 12 attendues
- **Manque** : `/mentions-legales`
- **Manque** : `lastModified` sur toutes les entrees
- Les slugs de categories utilisent les bons slugs de `lib/categories.ts`

**`app/robots.ts`** (existant) :
- Utilise `MetadataRoute.Robots` de Next.js
- Regles : `userAgent: "*"`, `allow: "/"`, `disallow: ["/api/", "/_next/", "/admin/"]`
- Reference sitemap : `https://www.colombes-cycles.fr/sitemap.xml`
- **Complet et correct** -- rien a changer

### Fichiers a Creer/Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `app/sitemap.ts` | Modifier | Ajouter `/mentions-legales`, ajouter `lastModified` partout |
| `app/robots.ts` | Aucune | Deja complet et correct |

### Sitemap cible complet

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.colombes-cycles.fr";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/nos-velos`,
      lastModified,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/nos-velos/velos-de-ville`,
      lastModified,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/nos-velos/velos-electriques`,
      lastModified,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/nos-velos/vtt`,
      lastModified,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/nos-velos/velos-enfants`,
      lastModified,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/nos-velos/accessoires`,
      lastModified,
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/reparations`,
      lastModified,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified,
      priority: 0.5,
      changeFrequency: "yearly",
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      priority: 0.8,
      changeFrequency: "yearly",
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      priority: 0.7,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified,
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];
}
```

### Option avancee : sitemap dynamique avec categories

Si a l'avenir les categories deviennent dynamiques (base de donnees), on pourra generer le sitemap dynamiquement :

```typescript
import { categories } from "@/lib/categories";

// Generer dynamiquement les routes de categories
const categoryRoutes = categories.map((cat) => ({
  url: `${baseUrl}/nos-velos/${cat.slug}`,
  lastModified,
  priority: 0.7,
  changeFrequency: "monthly" as const,
}));
```

Pour l'instant, l'approche statique est suffisante car les categories sont fixes dans `lib/categories.ts`.

### Anti-patterns a EVITER
- Ne PAS inclure les routes admin (`/admin/*`) dans le sitemap
- Ne PAS inclure les routes API (`/api/*`) dans le sitemap
- Ne PAS oublier le `lastModified` -- les moteurs de recherche l'utilisent pour prioriser le crawl
- Ne PAS utiliser des URLs relatives dans le sitemap (toujours absolues avec `https://www.colombes-cycles.fr`)
- Ne PAS mettre `priority: 1.0` sur toutes les pages -- ca revient a ne prioriser rien
- Ne PAS bloquer le sitemap dans le robots.txt (le sitemap doit etre accessible)

### Project Structure Notes
- `app/sitemap.ts` genere automatiquement `/sitemap.xml` via Next.js App Router
- `app/robots.ts` genere automatiquement `/robots.txt` via Next.js App Router
- Les categories sont definies dans `lib/categories.ts` avec les slugs : `velos-de-ville`, `velos-electriques`, `vtt`, `velos-enfants`, `accessoires`
- Le route group `(admin)` est exclu du crawl via `Disallow: /admin`

### References
- [Next.js sitemap.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js robots.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- FR29 : sitemap XML complet
- FR37 : route mentions-legales dans sitemap
- NFR26 : robots.txt bloque /admin

## Dev Agent Record
### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
