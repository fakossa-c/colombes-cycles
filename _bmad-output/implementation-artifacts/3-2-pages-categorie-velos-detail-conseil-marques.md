# Story 3.2: Pages categorie velos -- detail avec conseil et marques

Status: ready-for-dev

## Story

As a visiteur,
I want acceder a une page dediee par categorie avec description detaillee, angle conseil et marques distribuees,
So that je puisse m'informer avant de me deplacer en boutique.

## Acceptance Criteria

1. **Given** le visiteur accede a /nos-velos/ville (ou toute autre categorie) (FR8)
   **When** la page se charge
   **Then** la page affiche le titre de la categorie, une description detaillee et un angle conseil en encadre terracotta

2. **Given** la page categorie est chargee
   **When** la section "Nos marques" est visible
   **Then** les marques partenaires distribuees sont affichees : Orbea, Peugeot Cycles, Gitane, Velodeville, Lombardo, Sparta (selon la categorie) (FR12)

3. **Given** la categorie "velos-de-ville" ou "velos-electriques" est affichee
   **When** le visiteur cherche un CTA Velodeville
   **Then** un CTA Velodeville est present, ouvre le configurateur dans un nouvel onglet avec `target="_blank" rel="noopener noreferrer"` et l'URL contient `h_ident=10144` (FR22, NFR22)

4. **Given** le fichier app/(site)/nos-velos/[category]/page.tsx
   **When** je verifie generateStaticParams
   **Then** les 5 pages categorie sont statiquement generees via `generateStaticParams()` qui retourne les 5 slugs

5. **Given** le visiteur est en bas de la page categorie
   **When** la section CtaBlock entre dans le viewport
   **Then** un CtaBlock est present avec CTA vers /contact

6. **Given** les donnees des categories
   **When** je verifie leur source
   **Then** elles proviennent de `lib/data/categories.ts` (type Category avec slug, title, pageTitle, description, angleConseil, brands, metaTitle, metaDescription, breadcrumbLabel)

7. **Given** chaque page categorie
   **When** je verifie les meta tags
   **Then** title, description et canonical URL sont generes dynamiquement via `generateMetadata`

## Tasks / Subtasks

- [ ] Task 1 -- Verifier et enrichir le type Category dans lib/data/categories.ts (AC: #6)
  - [ ] Le type Category actuel contient deja : slug, title, pageTitle, metaTitle, metaDescription, description, angleConseil, breadcrumbLabel, brands
  - [ ] Ajouter un champ optionnel `velodevilleUrl?: string` pour les categories qui proposent Velodeville
  - [ ] Ajouter l'URL Velodeville pour "velos-de-ville" : `https://www.velodeville.com/fr/configurateur?h_ident=10144`
  - [ ] Verifier que les brands sont correctes pour chaque categorie

- [ ] Task 2 -- Ajouter le CTA Velodeville sur les pages concernees (AC: #3)
  - [ ] Dans `app/(site)/nos-velos/[category]/page.tsx`, apres la section "Nos marques"
  - [ ] Condition : afficher le CTA seulement si `cat.velodevilleUrl` existe OU si `cat.brands.includes("Velodeville")`
  - [ ] Code du lien :
    ```tsx
    <a
      href="https://www.velodeville.com/fr/configurateur?h_ident=10144"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-white font-syne font-600 text-sm rounded-sm hover:bg-terracotta/90 transition-colors duration-300"
    >
      Configurer votre Velodeville
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
    ```
  - [ ] L'icone SVG indique un lien externe (fleche sortante)
  - [ ] IMPORTANT : `target="_blank"` + `rel="noopener noreferrer"` sont OBLIGATOIRES (NFR22)

- [ ] Task 3 -- Verifier la section marques existante (AC: #2)
  - [ ] La section "Nos marques" existe deja dans [category]/page.tsx (lignes 129-145)
  - [ ] Elle est conditionnelle : `{cat.brands.length > 0 && ...}`
  - [ ] Les marques s'affichent en pills (rounded-full bg-anthracite/[0.05])
  - [ ] Verifier que les marques sont correctes pour chaque categorie dans categories.ts

- [ ] Task 4 -- Corriger le template literal CSS casse (AC depend de Story 1.3)
  - [ ] Ligne 99 de [category]/page.tsx : le className utilise des guillemets doubles au lieu de backticks
  - [ ] Corriger : `` className={`reveal stagger-${index + 1} group rounded-sm overflow-hidden`} ``
  - [ ] Cette tache est normalement couverte par Story 1.3 -- verifier que c'est fait

- [ ] Task 5 -- Verifier generateStaticParams et generateMetadata (AC: #4, #7)
  - [ ] `generateStaticParams` est deja implemente (lignes 11-13) -- retourne les 5 slugs depuis categories
  - [ ] `generateMetadata` est deja implemente (lignes 15-27) -- genere title, description, canonical
  - [ ] Verifier que l'import de categories pointe vers le bon fichier apres migration lib/data/
  - [ ] Tester avec `npm run build` que les 5 pages sont generees en SSG

- [ ] Task 6 -- Verifier le CtaBlock en bas de page (AC: #5)
  - [ ] Le CtaBlock est deja present (lignes 149-154)
  - [ ] Props : title, subtitle, ctaText="Prendre rendez-vous en boutique", ctaHref="/contact"
  - [ ] Aucune modification necessaire sauf si le wording change

## Dev Notes

### Architecture Critique

**La page [category]/page.tsx est un Server Component avec params async.**
- Next.js 16+ : `params` est une Promise (`Promise<{ category: string }>`)
- Le composant `export default async function CategoryPage({ params }: Props)` est async
- `const { category } = await params;` pour acceder au slug
- `notFound()` est appele si la categorie n'existe pas

**Les produits sont actuellement des placeholders inline.**
- Le `placeholderProducts` Record (lignes 29-57) contient des produits fictifs
- Ce n'est PAS un bug : le site ne vend pas en ligne, ces placeholders illustrent la gamme
- NE PAS supprimer ces placeholders sans instruction explicite

**Le CTA Velodeville est un lien externe specifique au revendeur.**
- URL : `https://www.velodeville.com/fr/configurateur?h_ident=10144`
- Le parametre `h_ident=10144` identifie Colombes Cycles comme revendeur
- TOUJOURS utiliser `target="_blank"` et `rel="noopener noreferrer"`

### Composants Existants a Reutiliser

| Composant | Chemin | Role |
|-----------|--------|------|
| PageHero | `@/components/ui/PageHero.tsx` | Hero de page avec tag, title, breadcrumbs |
| CtaBlock | `@/components/ui/CtaBlock.tsx` | Bloc CTA en bas de page |
| Breadcrumb | `@/components/ui/Breadcrumb.tsx` | Fil d'Ariane (via PageHero) |

### Fichiers a Creer/Modifier

| Action | Fichier | Raison |
|--------|---------|--------|
| Modifier | `app/(site)/nos-velos/[category]/page.tsx` | Ajouter CTA Velodeville, corriger template literal (si Story 1.3 pas faite) |
| Modifier | `lib/categories.ts` ou `lib/data/categories.ts` | Ajouter champ optionnel velodevilleUrl au type Category |

### Anti-patterns a EVITER

- **NE PAS hardcoder l'URL Velodeville dans le JSX** : la stocker dans les donnees Category ou dans une constante
- **NE PAS oublier `rel="noopener noreferrer"`** sur les liens `target="_blank"` : faille de securite (tabnapping)
- **NE PAS ajouter "use client"** : la page est un Server Component SSG, c'est voulu
- **NE PAS supprimer les placeholderProducts** : ils servent d'illustration en l'absence de vrai catalogue e-commerce

### Project Structure Notes

```
app/(site)/nos-velos/[category]/
  page.tsx           ← Page detail categorie (Server Component, async, generateStaticParams)

lib/
  categories.ts      ← Type Category + 5 categories + getCategoryBySlug
                       (sera deplace vers lib/data/categories.ts par Story 1.5)
```

### Dependances

- **Story 1.3** (MUST) : corrige le template literal CSS casse ligne 99
- **Story 1.5** (SHOULD) : centralise lib/categories.ts vers lib/data/categories.ts
- **Story 3.1** (relation) : la page listing pointe vers ces pages detail

### References

- FR8 : Page dediee par categorie avec description, conseil, marques
- FR12 : Marques partenaires (Orbea, Peugeot Cycles, Gitane, Velodeville, Lombardo, Sparta)
- FR22 : CTA Velodeville configurateur
- NFR22 : target="_blank" rel="noopener noreferrer" avec h_ident=10144
- NFR7 : 100% SSG via generateStaticParams

## Dev Agent Record

### Agent Model Used
(a remplir par le dev agent)

### Debug Log References
(a remplir par le dev agent)

### Completion Notes List
(a remplir par le dev agent)

### File List
(a remplir par le dev agent)
