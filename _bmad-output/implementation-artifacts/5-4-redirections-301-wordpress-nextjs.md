# Story 5.4: Redirections 301 WordPress vers Next.js

Status: ready-for-dev

## Story
As a visiteur arrivant via un ancien lien WordPress,
I want etre redirige automatiquement vers la bonne page du nouveau site,
So that je ne tombe pas sur une erreur 404 et que le jus SEO des anciens liens est preserve.

## Acceptance Criteria

1. **Given** un visiteur accedant a `/accueil`, **When** le serveur recoit la requete, **Then** une redirection 301 (permanente) est envoyee vers `/`.

2. **Given** un visiteur accedant a `/nos-velos-2`, **When** le serveur recoit la requete, **Then** une redirection 301 est envoyee vers `/nos-velos`.

3. **Given** un visiteur accedant a `/atelier`, **When** le serveur recoit la requete, **Then** une redirection 301 est envoyee vers `/reparations`.

4. **Given** un visiteur accedant a `/a-propos-2`, **When** le serveur recoit la requete, **Then** une redirection 301 est envoyee vers `/a-propos`.

5. **Given** un visiteur accedant a `/contact-2`, **When** le serveur recoit la requete, **Then** une redirection 301 est envoyee vers `/contact`.

6. **Given** toutes les redirections, **When** on les teste via `next dev`, **Then** chaque redirection retourne un code HTTP 301 et redirige vers la bonne destination.

7. **Given** les redirections, **When** elles sont configurees, **Then** elles sont definies dans `next.config.ts` via la fonction `redirects()`.

## Tasks / Subtasks

- [ ] Task 1 -- Configurer les redirections dans `next.config.ts` (AC: #1-#5, #7)
  - [ ] Ajouter la fonction `async redirects()` dans l'objet `nextConfig`
  - [ ] Ajouter la redirection `/accueil` vers `/` (permanent: true)
  - [ ] Ajouter la redirection `/nos-velos-2` vers `/nos-velos` (permanent: true)
  - [ ] Ajouter la redirection `/atelier` vers `/reparations` (permanent: true)
  - [ ] Ajouter la redirection `/a-propos-2` vers `/a-propos` (permanent: true)
  - [ ] Ajouter la redirection `/contact-2` vers `/contact` (permanent: true)

- [ ] Task 2 -- Identifier d'autres anciennes URLs WordPress a rediriger (AC: #1-#5)
  - [ ] Consulter l'ancien site WordPress (https://www.colombes-cycles.fr/) ou la Wayback Machine
  - [ ] Verifier les URLs dans Google Search Console (si disponible)
  - [ ] Ajouter d'eventuelles redirections supplementaires (ex: `/category/...`, `/page/...`, etc.)

- [ ] Task 3 -- Tester les redirections en local (AC: #6)
  - [ ] Lancer `next dev`
  - [ ] Tester chaque ancienne URL dans le navigateur et verifier la redirection
  - [ ] Verifier le code HTTP 301 avec les DevTools (onglet Network) ou `curl -I http://localhost:3000/accueil`

- [ ] Task 4 -- Verifier la compatibilite avec les headers de securite (AC: #7)
  - [ ] S'assurer que les redirections fonctionnent en combinaison avec d'eventuels headers de securite dans `next.config.ts` (story 1.7)
  - [ ] Verifier que `redirects()` et `headers()` coexistent sans conflit

## Dev Notes

### Architecture Critique

Le fichier `next.config.ts` est actuellement vide (seulement le squelette par defaut). Les redirections seront le premier ajout fonctionnel a ce fichier.

**Etat actuel de `next.config.ts`** :
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### Fichiers a Creer/Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `next.config.ts` | Modifier | Ajouter `async redirects()` avec le mapping WordPress vers Next.js |

### Code cible pour `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirections WordPress -> Next.js
      {
        source: "/accueil",
        destination: "/",
        permanent: true, // 301
      },
      {
        source: "/nos-velos-2",
        destination: "/nos-velos",
        permanent: true,
      },
      {
        source: "/atelier",
        destination: "/reparations",
        permanent: true,
      },
      {
        source: "/a-propos-2",
        destination: "/a-propos",
        permanent: true,
      },
      {
        source: "/contact-2",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

### Redirections supplementaires potentielles

En plus des 5 redirections specifiees, voici des patterns WordPress courants a verifier sur l'ancien site :

```typescript
// Si l'ancien site utilisait des slugs WordPress standards
{ source: "/index.php", destination: "/", permanent: true },
{ source: "/index.php/:path*", destination: "/:path*", permanent: true },

// Pages avec trailing slash
{ source: "/accueil/", destination: "/", permanent: true },
{ source: "/nos-velos-2/", destination: "/nos-velos", permanent: true },
{ source: "/atelier/", destination: "/reparations", permanent: true },
{ source: "/a-propos-2/", destination: "/a-propos", permanent: true },
{ source: "/contact-2/", destination: "/contact", permanent: true },

// Categories WordPress
{ source: "/category/:slug", destination: "/blog", permanent: true },

// Feed RSS
{ source: "/feed", destination: "/blog", permanent: true },
{ source: "/feed/", destination: "/blog", permanent: true },
```

**Important** : ne pas ajouter ces redirections supplementaires sans avoir verifie qu'elles correspondent a de vraies URLs de l'ancien site. Ajouter des redirections inutiles n'est pas nocif mais alourdit la configuration.

### Comment tester les redirections

```bash
# Avec curl (verifier le code 301 et le header Location)
curl -I http://localhost:3000/accueil
# Attendu : HTTP/1.1 308 (Next.js utilise 308 pour permanent en dev, 301 en prod)
# Location: /

curl -I http://localhost:3000/nos-velos-2
# Attendu : Location: /nos-velos

curl -I http://localhost:3000/atelier
# Attendu : Location: /reparations
```

**Note** : Next.js utilise le code 308 (Permanent Redirect) au lieu de 301 en mode `permanent: true` par defaut. Le 308 est semantiquement equivalent au 301 mais preserve la methode HTTP (GET reste GET, POST reste POST). Les moteurs de recherche traitent le 308 comme un 301. Si un 301 strict est necessaire, utiliser `statusCode: 301` au lieu de `permanent: true`.

```typescript
// Si 301 strict est requis :
{
  source: "/accueil",
  destination: "/",
  statusCode: 301,  // Au lieu de permanent: true
},
```

### Dependance avec story 1.7 (headers de securite)

La story 1.7 (Epic 1) prevoit d'ajouter des `headers()` de securite dans `next.config.ts`. Les deux fonctions (`redirects()` et `headers()`) coexistent sans probleme dans le meme objet `nextConfig`. L'ordre d'execution Next.js est : redirects -> headers -> middleware.

```typescript
const nextConfig: NextConfig = {
  async redirects() { /* ... */ },
  async headers() { /* ... story 1.7 ... */ },
};
```

### Anti-patterns a EVITER
- Ne PAS utiliser `permanent: false` (code 307) pour des redirections WordPress -- ce sont des redirections permanentes (le contenu a change d'URL definitivement)
- Ne PAS utiliser un middleware Next.js pour des redirections statiques -- `redirects()` dans `next.config.ts` est plus performant (traite au niveau du serveur Edge/Node avant le rendering)
- Ne PAS oublier les variantes avec/sans trailing slash -- Next.js gere le trailing slash via `trailingSlash` dans la config, mais les anciennes URLs WordPress peuvent avoir un slash final
- Ne PAS rediriger vers des URLs relatives dans `destination` -- utiliser des chemins absolus a partir de la racine (ex: `/` et non `https://...`)
- Ne PAS mettre des redirections circulaires (ex: `/nos-velos` vers `/nos-velos`)

### Project Structure Notes
- `next.config.ts` est a la racine du projet
- Les redirections sont evaluees avant le rendu des pages
- Next.js App Router gere automatiquement le trailing slash (pas besoin de double redirection)
- Le fichier est actuellement vide -- c'est le premier ajout fonctionnel

### References
- [Next.js redirects()](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects)
- [HTTP 301 vs 308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)
- FR33 : redirections 301 permanentes
- Dependance : story 1.7 (headers securite dans le meme fichier)

## Dev Agent Record
### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
