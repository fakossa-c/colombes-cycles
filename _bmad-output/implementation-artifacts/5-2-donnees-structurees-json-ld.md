# Story 5.2: Donnees structurees JSON-LD sur toutes les pages

Status: ready-for-dev

## Story
As a moteur de recherche,
I want lire des donnees structurees JSON-LD sur chaque page,
So that le site obtient des rich results dans Google (fiche etablissement, fil d'Ariane, services).

## Acceptance Criteria

1. **Given** la page d'accueil `/` et la page `/contact`, **When** Google crawle ces pages, **Then** un bloc JSON-LD `LocalBusiness` + `BikeStore` est present avec : nom, adresse (rue, ville, CP, region, pays), telephone, horaires d'ouverture, coordonnees geo, note Google aggregee (4.8/5, 271 avis), fondateur, marques, zone desservie.

2. **Given** la page `/reparations`, **When** Google crawle la page, **Then** un ou plusieurs blocs JSON-LD `Service` sont presents avec : nom du service, description, provider (reference `@id` vers LocalBusiness), serviceType, areaServed, et catalogue d'offres (OfferCatalog).

3. **Given** toute page interne avec un fil d'Ariane (toutes sauf `/`), **When** Google crawle la page, **Then** un bloc JSON-LD `BreadcrumbList` est present avec la liste ordonnee des elements du fil d'Ariane, chacun avec `position`, `name` et `item` (URL absolue).

4. **Given** toute page interne avec un fil d'Ariane, **When** l'utilisateur visite la page, **Then** un fil d'Ariane visuel est affiche via le composant `PageHero` avec le composant `Breadcrumb`.

5. **Given** les blocs JSON-LD de chaque page, **When** on les valide avec le Rich Results Test de Google, **Then** aucune erreur n'est remontee (des warnings sont acceptables).

## Tasks / Subtasks

- [ ] Task 1 -- Auditer le JSON-LD LocalBusiness existant (AC: #1)
  - [ ] Verifier `app/(site)/layout.tsx` : le JSON-LD LocalBusiness+BikeStore est deja present
  - [ ] Verifier qu'il contient tous les champs requis : nom, adresse, telephone, horaires, geo, rating, fondateur, marques, areaServed
  - [ ] **Ajouter les champs manquants** : `geo` (GeoCoordinates latitude/longitude) n'est pas present actuellement
  - [ ] Ajouter `streetAddress` dans `address` (adresses des 2 boutiques ou adresse principale)
  - [ ] Verifier que `sameAs` est present (liens reseaux sociaux / Google Maps)

- [ ] Task 2 -- Ajouter JSON-LD specifique sur `/contact` si necessaire (AC: #1)
  - [ ] Le LocalBusiness est deja dans le layout `(site)` donc present sur `/contact`
  - [ ] Evaluer si un JSON-LD supplementaire est pertinent sur `/contact` (ContactPage, ou suffisant via LocalBusiness)

- [ ] Task 3 -- Auditer le JSON-LD Service sur `/reparations` (AC: #2)
  - [ ] Verifier `app/(site)/reparations/page.tsx` : le JSON-LD Service est deja present
  - [ ] Verifier que `provider` reference `@id: "https://www.colombes-cycles.fr/#business"`
  - [ ] Verifier que `hasOfferCatalog` contient tous les services du tableau `pricingData`
  - [ ] Verifier les `priceSpecification` sur chaque offre

- [ ] Task 4 -- Auditer le JSON-LD BreadcrumbList (AC: #3)
  - [ ] Verifier `components/ui/Breadcrumb.tsx` : le JSON-LD BreadcrumbList est deja present
  - [ ] Verifier que chaque `item` utilise une URL absolue (`https://www.colombes-cycles.fr/...`)
  - [ ] Verifier que le dernier element (page courante) n'a pas de `item` URL (conforme schema.org)

- [ ] Task 5 -- Verifier la presence du fil d'Ariane visuel sur toutes les pages internes (AC: #4)
  - [ ] `app/(site)/nos-velos/page.tsx` : breadcrumbs present dans PageHero
  - [ ] `app/(site)/nos-velos/[category]/page.tsx` : breadcrumbs present dans PageHero
  - [ ] `app/(site)/reparations/page.tsx` : verifier si breadcrumbs est dans PageHero (peut etre manquant)
  - [ ] `app/(site)/a-propos/page.tsx` : verifier si breadcrumbs est dans PageHero (peut etre manquant)
  - [ ] `app/(site)/contact/page.tsx` : breadcrumbs present dans PageHero
  - [ ] `app/(site)/blog/page.tsx` : breadcrumbs present dans PageHero
  - [ ] `app/(site)/mentions-legales/page.tsx` : breadcrumbs present dans PageHero

- [ ] Task 6 -- Enrichir le JSON-LD LocalBusiness avec les champs manquants (AC: #1, #5)
  - [ ] Ajouter `geo: { "@type": "GeoCoordinates", latitude: "48.9234", longitude: "2.2528" }`
  - [ ] Ajouter `streetAddress` dans `address`
  - [ ] Ajouter `sameAs` (lien Google Maps, eventuellement Facebook/Instagram)
  - [ ] Ajouter `image` (URL vers photo de la boutique)
  - [ ] Ajouter `paymentAccepted`, `currenciesAccepted: "EUR"`

- [ ] Task 7 -- Validation Rich Results Test (AC: #5)
  - [ ] Deployer ou lancer en local + ngrok
  - [ ] Tester chaque page avec https://search.google.com/test/rich-results
  - [ ] Corriger les erreurs signalees

## Dev Notes

### Architecture Critique

**JSON-LD deja implemente** : l'essentiel est deja en place dans le codebase actuel. Cette story est principalement un audit + enrichissement.

1. **LocalBusiness + BikeStore** (`app/(site)/layout.tsx` lignes 7-58) :
   - Deja present avec : `@type: ["LocalBusiness", "BikeStore"]`, `@id`, nom, description, URL, telephone, adresse (ville, CP, region, pays), horaires, priceRange, fondateur, aggregateRating, marques, areaServed
   - **Manque** : `geo` (GeoCoordinates), `streetAddress`, `sameAs`, `image`, `paymentAccepted`

2. **Service JSON-LD** (`app/(site)/reparations/page.tsx` lignes 35-77+) :
   - Deja present avec : Service, provider `@id`, serviceType, areaServed, hasOfferCatalog
   - A verifier : completude du catalogue par rapport a `pricingData`

3. **BreadcrumbList JSON-LD** (`components/ui/Breadcrumb.tsx` lignes 15-24) :
   - Deja present, genere dynamiquement a partir des items passes en props
   - Utilise `baseUrl` pour URLs absolues
   - Dernier element sans `item` URL (correct)

### Fichiers a Creer/Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `app/(site)/layout.tsx` | Modifier | Ajouter `geo`, `streetAddress`, `sameAs`, `image`, `paymentAccepted` au JSON-LD |
| `app/(site)/reparations/page.tsx` | Verifier | Confirmer que le JSON-LD Service est complet |
| `components/ui/Breadcrumb.tsx` | Verifier | Confirmer le format BreadcrumbList |
| `app/(site)/reparations/page.tsx` | Modifier (si besoin) | Ajouter breadcrumbs dans PageHero si manquant |
| `app/(site)/a-propos/page.tsx` | Modifier (si besoin) | Ajouter breadcrumbs dans PageHero si manquant |

### JSON-LD LocalBusiness enrichi (cible)

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "BikeStore"],
  "@id": "https://www.colombes-cycles.fr/#business",
  name: "Colombes Cycles",
  description: "Magasin de velos a Colombes (92700)...",
  url: "https://www.colombes-cycles.fr",
  telephone: "0142426602",
  image: "https://www.colombes-cycles.fr/images/boutique-colombes-cycles.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue de l'Independance", // A confirmer avec le gerant
    addressLocality: "Colombes",
    postalCode: "92700",
    addressRegion: "Hauts-de-Seine",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "48.9234",
    longitude: "2.2528",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "EUR EUR",
  founder: { "@type": "Person", name: "David Thibault" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "271",
    bestRating: "5",
    worstRating: "1",
  },
  brand: [
    { "@type": "Brand", name: "Orbea" },
    { "@type": "Brand", name: "Peugeot Cycles" },
    { "@type": "Brand", name: "Gitane" },
    { "@type": "Brand", name: "Velodeville" },
    { "@type": "Brand", name: "BOSCH eBike Systems" },
  ],
  areaServed: [/* ... existant ... */],
  sameAs: [
    "https://www.google.com/maps/place/Colombes+Cycles/...",
    // Ajouter Facebook, Instagram si existants
  ],
  paymentAccepted: "Cash, Credit Card",
  currenciesAccepted: "EUR",
};
```

### Breadcrumbs attendus par page

| Page | Breadcrumbs |
|------|-------------|
| `/nos-velos` | Accueil > Nos Velos |
| `/nos-velos/[cat]` | Accueil > Nos Velos > {Categorie} |
| `/reparations` | Accueil > Reparations |
| `/a-propos` | Accueil > A propos |
| `/contact` | Accueil > Contact |
| `/blog` | Accueil > Blog |
| `/mentions-legales` | Accueil > Mentions legales |

### Anti-patterns a EVITER
- Ne PAS dupliquer le JSON-LD LocalBusiness sur chaque page individuellement -- il est dans le layout `(site)` et s'applique a toutes les pages publiques
- Ne PAS utiliser des URLs relatives dans les JSON-LD (toujours absolues)
- Ne PAS hardcoder des `@id` differents pour le meme business -- toujours `https://www.colombes-cycles.fr/#business`
- Ne PAS mettre de JSON-LD dans `<head>` -- Next.js le gere via `dangerouslySetInnerHTML` dans le body (c'est valide pour schema.org)
- Ne PAS inventer des avis ou des notes -- utiliser les vraies donnees Google (4.8/5, 271 avis)

### Project Structure Notes
- `app/(site)/layout.tsx` : layout des pages publiques, contient le JSON-LD LocalBusiness global
- `components/ui/Breadcrumb.tsx` : composant Server qui genere le breadcrumb visuel + JSON-LD BreadcrumbList
- `components/ui/PageHero.tsx` : composant qui affiche le hero de page + breadcrumb optionnel
- Le JSON-LD Service est local a `app/(site)/reparations/page.tsx`

### References
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Schema.org BikeStore](https://schema.org/BikeStore)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- [Schema.org Service](https://schema.org/Service)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- FR30 : JSON-LD LocalBusiness+BikeStore
- FR32 : JSON-LD BreadcrumbList + fil d'Ariane visuel
- NFR24 : valide Rich Results Test

## Dev Agent Record
### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
