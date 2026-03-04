# Story 5.1: Meta tags, canonical URLs et OpenGraph sur toutes les pages

Status: ready-for-dev

## Story
As a moteur de recherche,
I want lire meta title, description, canonical URL et OpenGraph/Twitter Cards sur chaque page,
So that les pages sont correctement indexees et apparaissent avec un apercu riche dans les resultats de recherche et les reseaux sociaux.

## Acceptance Criteria

1. **Given** une page publique quelconque du site, **When** un moteur de recherche ou un reseau social la charge, **Then** la page contient un meta title unique de moins de 60 caracteres, une meta description unique de moins de 160 caracteres, et une canonical URL absolue commencant par `https://www.colombes-cycles.fr/`.

2. **Given** une page publique quelconque, **When** le HTML est inspecte, **Then** les balises OpenGraph sont presentes : `og:title`, `og:description`, `og:image` (URL absolue vers image OG 1200x630), `og:url` (URL absolue), `og:type`, `og:locale=fr_FR`, `og:site_name=Colombes Cycles`.

3. **Given** une page publique quelconque, **When** le HTML est inspecte, **Then** les balises Twitter Card sont presentes : `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.

4. **Given** la page d'accueil (`/`), **When** la metadata est lue, **Then** le title est le defaut du template root layout (`Colombes Cycles -- Velos & Reparations a Colombes (92)`), la description est celle du root layout, canonical = `https://www.colombes-cycles.fr`, et les OG/Twitter heritent du root layout.

5. **Given** les pages internes (nos-velos, reparations, a-propos, contact, blog, mentions-legales), **When** la metadata est lue, **Then** chaque page a son propre title (via template `%s | Colombes Cycles`), sa propre description, sa propre canonical, et ses propres OG/Twitter specifiques.

6. **Given** les pages dynamiques `/nos-velos/[category]`, **When** la metadata est lue, **Then** `generateMetadata` retourne un title, description, canonical, OG et Twitter specifiques a la categorie.

7. **Given** toutes les pages, **When** on verifie les metadata, **Then** aucun title n'est duplique entre pages, aucune description n'est dupliquee entre pages.

## Tasks / Subtasks

- [ ] Task 1 -- Auditer les metadata existantes de chaque page (AC: #1, #7)
  - [ ] Verifier `app/(site)/page.tsx` : pas de metadata propre, herite du root layout -- confirmer que c'est suffisant pour AC #4
  - [ ] Verifier toutes les pages dans `app/(site)/` : lister celles qui ont deja metadata complete vs incompletes
  - [ ] Creer un tableau recapitulatif title/description/canonical/OG/Twitter par page

- [ ] Task 2 -- Completer les OG et Twitter sur les pages qui en manquent (AC: #2, #3)
  - [ ] `app/(site)/reparations/page.tsx` : ajouter `openGraph` et `twitter` dans l'objet `metadata` existant
  - [ ] `app/(site)/a-propos/page.tsx` : ajouter `openGraph` et `twitter` dans l'objet `metadata` existant
  - [ ] `app/(site)/nos-velos/page.tsx` : ajouter `openGraph` et `twitter` dans l'objet `metadata` existant
  - [ ] `app/(site)/nos-velos/[category]/page.tsx` : ajouter `openGraph` et `twitter` dans le retour de `generateMetadata`

- [ ] Task 3 -- Verifier que les pages avec OG existant sont completes (AC: #2, #3)
  - [ ] `app/(site)/contact/page.tsx` : a deja OG partiel -- ajouter `og:image`, verifier `twitter`
  - [ ] `app/(site)/blog/page.tsx` : a deja OG partiel -- ajouter `og:image`, verifier `twitter`
  - [ ] `app/(site)/mentions-legales/page.tsx` : a deja OG partiel -- ajouter `og:image`, verifier `twitter`

- [ ] Task 4 -- Verifier l'image OG par defaut (AC: #2, #3)
  - [ ] Confirmer que `/public/images/og-colombes-cycles.jpg` existe et fait 1200x630px
  - [ ] Si absente, creer un placeholder ou documenter la creation necessaire

- [ ] Task 5 -- Tests manuels (AC: #1-#7)
  - [ ] Lancer `next dev`, inspecter le HTML de chaque page pour verifier les balises meta
  - [ ] Verifier unicite des titles et descriptions
  - [ ] Verifier que les canonical URLs sont absolues et correctes

## Dev Notes

### Architecture Critique

Le root layout (`app/layout.tsx`) definit deja :
- `metadataBase: new URL("https://www.colombes-cycles.fr")` -- toutes les URL relatives sont resolues automatiquement
- Template de titre : `%s | Colombes Cycles` avec defaut `Colombes Cycles -- Velos & Reparations a Colombes (92)`
- OpenGraph global : `type: "website"`, `locale: "fr_FR"`, `siteName`, image OG par defaut
- Twitter Card globale : `card: "summary_large_image"`, image par defaut
- Canonical globale : `https://www.colombes-cycles.fr`
- robots : index/follow

**Consequence** : les pages enfants heritent automatiquement de ces valeurs. Il suffit d'ajouter les champs `openGraph` et `twitter` specifiques dans chaque page pour surcharger le title/description/url. L'image OG par defaut sera heritee si non surchargee.

### Fichiers a Creer/Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `app/(site)/reparations/page.tsx` | Modifier | Ajouter `openGraph` + `twitter` dans `metadata` |
| `app/(site)/a-propos/page.tsx` | Modifier | Ajouter `openGraph` + `twitter` dans `metadata` |
| `app/(site)/nos-velos/page.tsx` | Modifier | Ajouter `openGraph` + `twitter` dans `metadata` |
| `app/(site)/nos-velos/[category]/page.tsx` | Modifier | Ajouter `openGraph` + `twitter` dans `generateMetadata` |
| `app/(site)/contact/page.tsx` | Modifier | Completer `openGraph` (manque `images`), ajouter `twitter` |
| `app/(site)/blog/page.tsx` | Modifier | Completer `openGraph` (manque `images`), ajouter `twitter` |
| `app/(site)/mentions-legales/page.tsx` | Modifier | Completer `openGraph` (manque `images`), ajouter `twitter` |
| `app/(site)/page.tsx` | Aucune | Herite du root layout, pas besoin de metadata propre |
| `app/layout.tsx` | Aucune | Deja complet |

### Pattern de metadata a appliquer (exemple reparations)

```typescript
export const metadata: Metadata = {
  title: "Reparation Velo a Colombes -- Atelier Cycles 92",
  description:
    "Atelier reparation velo a Colombes. Revision, crevaison, freins, derailleur, velo electrique. Technicien certifie BOSCH. Devis rapide, 92700.",
  alternates: {
    canonical: "https://www.colombes-cycles.fr/reparations",
  },
  openGraph: {
    title: "Reparation Velo a Colombes -- Atelier Cycles 92",
    description:
      "Atelier reparation velo a Colombes. Revision, crevaison, freins, derailleur, velo electrique. Technicien certifie BOSCH.",
    url: "https://www.colombes-cycles.fr/reparations",
    // images heritees du root layout si non surchargees
  },
  twitter: {
    card: "summary_large_image",
    title: "Reparation Velo a Colombes -- Atelier Cycles 92",
    description:
      "Atelier reparation velo a Colombes. Revision, crevaison, freins, derailleur, velo electrique. Technicien certifie BOSCH.",
  },
};
```

### Pattern pour generateMetadata (nos-velos/[category])

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: {
      canonical: `https://www.colombes-cycles.fr/nos-velos/${cat.slug}`,
    },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url: `https://www.colombes-cycles.fr/nos-velos/${cat.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: cat.metaTitle,
      description: cat.metaDescription,
    },
  };
}
```

### Etat actuel des metadata par page

| Page | title | description | canonical | OG | Twitter |
|------|-------|-------------|-----------|-----|---------|
| `/` (page.tsx) | herite root | herite root | herite root | herite root | herite root |
| `/nos-velos` | OK | OK | OK | MANQUE | MANQUE |
| `/nos-velos/[cat]` | OK (generateMetadata) | OK | OK | MANQUE | MANQUE |
| `/reparations` | OK | OK | OK | MANQUE | MANQUE |
| `/a-propos` | OK | OK | OK | MANQUE | MANQUE |
| `/contact` | OK | OK | OK | partiel (pas images) | MANQUE |
| `/blog` | OK | OK | OK | partiel (pas images) | MANQUE |
| `/mentions-legales` | OK | OK | OK | partiel (pas images) | MANQUE |

### Anti-patterns a EVITER
- Ne PAS dupliquer le meme title ou description sur plusieurs pages
- Ne PAS utiliser des canonical URL relatives (toujours absolues avec `https://www.colombes-cycles.fr`)
- Ne PAS oublier `og:image` -- sans image, le partage social affiche un placeholder generique
- Ne PAS surcharger `og:type`, `og:locale`, `og:site_name` dans les pages enfants (hérité du root layout)
- Ne PAS utiliser `generateMetadata` sur des pages sans params dynamiques -- preferer `export const metadata`

### Project Structure Notes
- Le site utilise le route group `(site)` pour les pages publiques et `(admin)` pour l'admin
- Le root layout `app/layout.tsx` est le point d'entree commun
- `app/(site)/layout.tsx` ajoute Topbar, Navbar, Footer et le JSON-LD LocalBusiness
- Les categories de velos sont definies dans `lib/categories.ts` avec `metaTitle` et `metaDescription` deja prets

### References
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [OpenGraph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- NFR28 : canonical URL absolue
- FR31 : meta tags sur chaque page publique

## Dev Agent Record
### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
