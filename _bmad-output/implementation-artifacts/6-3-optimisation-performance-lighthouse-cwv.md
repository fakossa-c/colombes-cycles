# Story 6.3: Optimisation performance — Lighthouse >= 95 et Core Web Vitals

Status: ready-for-dev

## Story
As a visiteur du site,
I want un site qui charge rapidement et soit reactif,
So that j'aie une experience fluide meme sur mobile avec une connexion moyenne.

## Acceptance Criteria

1. **Given** le site deploye, **When** on lance Lighthouse en mode mobile ET desktop, **Then** le score Performance est >= 95 sur chaque page.

2. **Given** une page du site, **When** on mesure le Largest Contentful Paint (LCP), **Then** il est < 2.5 secondes.

3. **Given** une page du site, **When** on mesure le Cumulative Layout Shift (CLS), **Then** il est < 0.1.

4. **Given** une page du site, **When** on mesure l'Interaction to Next Paint (INP), **Then** il est < 200 ms.

5. **Given** une page du site, **When** on mesure le First Contentful Paint (FCP), **Then** il est < 1.8 secondes.

6. **Given** le build de production, **When** on analyse le bundle JS, **Then** le total JS gzip est < 150 KB, avec code-splitting automatique par route.

7. **Given** une animation du site (reveal, parallax, swipe), **When** on mesure les FPS, **Then** les animations tournent a >= 30 FPS et utilisent `requestAnimationFrame` avec ticking flag.

## Tasks / Subtasks

- [ ] Task 1 — Audit Lighthouse initial (AC: #1-#5)
  - [ ] Lancer `next build` et analyser la sortie (taille des bundles par route)
  - [ ] Lancer Lighthouse sur chaque page en mode mobile :
    - `/` (accueil)
    - `/nos-velos`
    - `/nos-velos/[category]` (une categorie)
    - `/reparations`
    - `/a-propos`
    - `/contact`
    - `/blog`
    - `/mentions-legales`
  - [ ] Noter les scores et les metriques CWV (LCP, CLS, FCP, INP)
  - [ ] Identifier les points d'amelioration principaux

- [ ] Task 2 — Optimisation des images (AC: #2, #5)
  - [ ] Verifier que TOUTES les images utilisent `next/image` (pas de `<img>` natif)
  - [ ] Verifier que l'image hero a `priority={true}` (preload LCP)
  - [ ] Verifier que toutes les autres images ont `loading="lazy"` (defaut next/image)
  - [ ] Configurer `next/image` pour le format WebP automatique (defaut Next.js)
  - [ ] Ajouter `sizes` explicite sur les images pour eviter le telechargement d'images trop grandes :
    ```tsx
    <Image
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      ...
    />
    ```
  - [ ] Verifier les dimensions `width`/`height` sur toutes les `<Image>` pour eviter CLS
  - [ ] Si des images sont en `fill` mode, verifier que le container parent a une taille definie

- [ ] Task 3 — Optimisation des polices (AC: #2, #5)
  - [ ] Verifier que `next/font` est utilise avec `display: "swap"` (deja OK dans `app/layout.tsx`)
  - [ ] Verifier que les polices sont preloadees (automatique avec `next/font`)
  - [ ] Verifier qu'on ne charge que les weights necessaires :
    - Syne : 400, 500, 600, 700, 800 (deja configure)
    - Inter : 400, 500, 600 (verifier si on peut reduire, actuellement tout le range est charge)
  - [ ] Ajouter `subsets: ["latin"]` (deja OK) — pas besoin de latin-ext pour un site francais

- [ ] Task 4 — Optimisation du bundle JS (AC: #6)
  - [ ] Analyser la taille du bundle avec `next build` output
  - [ ] Installer `@next/bundle-analyzer` en devDependency pour analyse detaillee :
    ```bash
    npm install -D @next/bundle-analyzer
    ```
  - [ ] Configurer dans `next.config.ts` :
    ```ts
    import bundleAnalyzer from '@next/bundle-analyzer';
    const withBundleAnalyzer = bundleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
    });
    export default withBundleAnalyzer(nextConfig);
    ```
  - [ ] Verifier que le code-splitting par route est actif (automatique Next.js App Router)
  - [ ] Verifier qu'il n'y a aucune librairie tierce lourde importee (pas de Framer Motion, GSAP, etc.)
  - [ ] S'assurer que les composants "use client" sont les plus petits possible
  - [ ] Verifier le tree-shaking : pas d'imports `* as` ou d'imports de modules entiers

- [ ] Task 5 — Optimisation des animations pour performance (AC: #7)
  - [ ] Verifier que `useParallax.ts` utilise bien le pattern rAF avec ticking flag (deja OK)
  - [ ] Verifier que `Hero.tsx` utilise bien le pattern rAF avec ticking flag (deja OK)
  - [ ] Verifier que les animations CSS utilisent uniquement `transform` et `opacity` (compositable, pas de repaint) :
    - `globals.css` : `.reveal` utilise `opacity` + `transform: translateY` — OK
    - `.reveal-left`/`.reveal-right` : `opacity` + `transform: translateX` — OK
    - `.reveal-scale` : verifier
    - `.line-grow` : verifier (probablement `transform: scaleX`)
  - [ ] Verifier qu'aucune animation ne modifie `width`, `height`, `top`, `left`, `margin`, `padding` (cause layout shift)
  - [ ] Ajouter `will-change: transform` sur les elements parallax si necessaire pour promouvoir en couche GPU
  - [ ] S'assurer que les event listeners scroll sont en mode `{ passive: true }` (deja OK dans useParallax et Hero)
  - [ ] Profiler les animations avec Chrome DevTools Performance tab pour verifier >= 30 FPS

- [ ] Task 6 — Reduction du CLS (AC: #3)
  - [ ] Verifier que toutes les `<Image>` ont `width` et `height` (ou `fill` avec container dimensionne)
  - [ ] Verifier que les polices avec `display: "swap"` ne causent pas de CLS visible (FOUT minimal grace a next/font preload)
  - [ ] Verifier que le Topbar + Navbar ont une hauteur fixe (pas de contenu dynamique qui change la hauteur)
  - [ ] Verifier que les sections `.reveal` (opacity: 0 au depart) ne causent pas de CLS quand elles deviennent visibles
    - Les `.reveal` utilisent `opacity` + `transform` qui ne causent PAS de layout shift — OK
  - [ ] Verifier que l'iframe Google Maps (`loading="lazy"`) a un container avec aspect-ratio defini (deja `aspect-[4/3]` dans contact — OK)
  - [ ] Verifier le swipe Tinder (Team, Reviews) : les cartes changent-elles la hauteur du container ?

- [ ] Task 7 — Optimisation du rendu SSG (AC: #1, #2, #5)
  - [ ] Verifier que TOUTES les pages sont en SSG (pas de `force-dynamic`, pas de `cookies()`, pas de `headers()`)
  - [ ] Verifier dans `next build` output que toutes les routes sont marquees "Static" (icone cercle vide)
  - [ ] S'assurer que `generateStaticParams` est bien utilise pour `/nos-velos/[category]` :
    ```ts
    export function generateStaticParams() {
      return [
        { category: 'velos-de-ville' },
        { category: 'velos-electriques' },
        { category: 'vtt' },
        { category: 'velos-enfants' },
        { category: 'accessoires' },
      ];
    }
    ```
  - [ ] Verifier que le formulaire de contact ne force pas le rendu dynamique (c'est un composant client dans une page SSG — OK)

- [ ] Task 8 — Preloading et resource hints (AC: #2, #5)
  - [ ] Verifier que l'image hero est preloadee via `priority` prop de next/image
  - [ ] Ajouter `<link rel="preconnect">` si des ressources externes sont utilisees :
    - Google Maps iframe : le `loading="lazy"` suffit, pas besoin de preconnect
    - Google Fonts : gere automatiquement par `next/font` (self-hosted)
  - [ ] Verifier que les scripts externes sont minimaux (aucun pour l'instant — parfait)

- [ ] Task 9 — Configuration Next.js pour performance (AC: #1, #6)
  - [ ] Dans `next.config.ts`, ajouter les optimisations :
    ```ts
    const nextConfig: NextConfig = {
      images: {
        formats: ['image/avif', 'image/webp'],
      },
      experimental: {
        optimizeCss: true, // si disponible dans Next.js 16
      },
    };
    ```
  - [ ] Verifier que la compression gzip/brotli est activee (automatique sur Vercel)
  - [ ] Verifier les headers de cache (automatique SSG sur Vercel : `Cache-Control: public, max-age=31536000, immutable` pour les assets)

- [ ] Task 10 — Tests finaux et validation (AC: #1-#7)
  - [ ] Relancer `next build` et verifier les tailles de bundle
  - [ ] Relancer Lighthouse mobile sur toutes les pages — cible >= 95
  - [ ] Relancer Lighthouse desktop sur toutes les pages — cible >= 95
  - [ ] Verifier CWV dans Chrome DevTools :
    - LCP < 2.5s
    - CLS < 0.1
    - INP < 200ms
    - FCP < 1.8s
  - [ ] Tester sur connection throttlee (3G lent) via DevTools
  - [ ] Profiler les animations : ouvrir Performance tab, enregistrer un scroll, verifier >= 30 FPS

## Dev Notes

### Architecture Critique
- Le site est deja bien optimise par nature : **Next.js 16 App Router SSG** = HTML statique servi depuis CDN.
- **Aucune librairie tierce d'animation** (pas de Framer Motion, GSAP) — uniquement CSS transitions et rAF custom.
- Les polices sont gerees par `next/font` avec `display: "swap"` et `subsets: ["latin"]` — preloadees automatiquement.
- Le bundle est deja minimaliste : `next`, `react`, `react-dom` uniquement en dependencies.
- Les hooks custom (`useReveal`, `useParallax`) sont legers et utilisent IntersectionObserver/rAF natifs.
- L'optimisation portera principalement sur les **images** (next/image, priority, sizes) et la **verification** que tout est bien en place.

### Fichiers a Creer/Modifier
| Fichier | Action |
|---|---|
| `next.config.ts` | Modifier — ajouter config images (avif/webp), bundle analyzer |
| `package.json` | Modifier — ajouter `@next/bundle-analyzer` en devDependency |
| `app/(site)/nos-velos/[category]/page.tsx` | Verifier/ajouter `generateStaticParams` |
| Tous les composants avec `<Image>` | Verifier `priority`, `sizes`, `width`/`height` |
| `components/home/Hero.tsx` | Verifier image hero `priority={true}` |
| `components/home/Team.tsx` | Verifier images equipe avec `sizes` |
| `components/home/Boutique.tsx` | Verifier images boutique avec `sizes` |

### Anti-patterns a EVITER
- **NE PAS** installer de librairies lourdes (moment.js, lodash entier, etc.)
- **NE PAS** ajouter `will-change` sur trop d'elements (surconsommation GPU/memoire)
- **NE PAS** preloader toutes les images (uniquement le hero LCP)
- **NE PAS** utiliser `loading="eager"` sauf pour l'image hero
- **NE PAS** inline des images en base64 (sauf icones < 1KB)
- **NE PAS** desactiver le code-splitting (import dynamique seulement si necessaire)
- **NE PAS** ajouter `<link rel="preload">` manuellement pour les polices (gere par next/font)
- **NE PAS** utiliser `getServerSideProps` ou `force-dynamic` — garder SSG pur
- **NE PAS** animer `width`, `height`, `top`, `left`, `margin`, `padding` — uniquement `transform` et `opacity`

### Metriques cibles
| Metrique | Cible | Seuil "Good" Google |
|---|---|---|
| Lighthouse Performance (mobile) | >= 95 | >= 90 |
| Lighthouse Performance (desktop) | >= 95 | >= 90 |
| LCP | < 2.5s | < 2.5s |
| FCP | < 1.8s | < 1.8s |
| CLS | < 0.1 | < 0.1 |
| INP | < 200ms | < 200ms |
| Bundle JS gzip total | < 150 KB | N/A (custom) |
| Animation FPS | >= 30 | N/A (custom) |

### Checklist de verification bundle
```
next build output attendu :
Route (app)                    Size     First Load JS
------------------------------------------------------
/(site)                        X kB     ~85 kB (shared)
/(site)/nos-velos              X kB     ~85 kB
/(site)/nos-velos/[category]   X kB     ~85 kB
/(site)/reparations            X kB     ~85 kB
/(site)/a-propos               X kB     ~85 kB
/(site)/contact                X kB     ~85 kB
/(site)/blog                   X kB     ~85 kB
/(site)/mentions-legales       X kB     ~85 kB

First Load JS shared: ~85 kB (objectif < 150 KB gzip)
  framework: ~45 kB (React + Next.js)
  main: ~25 kB
  webpack: ~1 kB
  css: ~5 kB
```

### Outils de mesure
- **Lighthouse** : Chrome DevTools > Lighthouse tab, ou `npx lighthouse URL --output=json`
- **Bundle Analyzer** : `ANALYZE=true next build` (apres installation @next/bundle-analyzer)
- **Chrome DevTools Performance** : enregistrer scroll, verifier FPS, identifier jank
- **WebPageTest** : https://www.webpagetest.org/ (test connexion lente)
- **Core Web Vitals** : Chrome DevTools > Performance Insights, ou web.dev/measure

### Project Structure Notes
```
next.config.ts              # Config Next.js a enrichir
package.json                # Dependencies (deja minimaliste)
app/
  layout.tsx                # Fonts next/font — deja optimise
  globals.css               # Animations CSS — deja compositable (transform/opacity)
  (site)/
    page.tsx                # Accueil — Hero = LCP, verifier priority image
    nos-velos/
      [category]/page.tsx   # Verifier generateStaticParams
components/
  ui/
    useReveal.ts            # IntersectionObserver — OK perf
    useParallax.ts          # rAF + ticking — OK perf
  home/
    Hero.tsx                # rAF + ticking — OK perf, verifier image priority
    Team.tsx                # Swipe — verifier perf animation
    Reviews.tsx             # Swipe — verifier perf animation
```

### References
- Core Web Vitals : https://web.dev/vitals/
- Next.js Image Optimization : https://nextjs.org/docs/app/building-your-application/optimizing/images
- Next.js Font Optimization : https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Bundle Analyzer : https://www.npmjs.com/package/@next/bundle-analyzer
- Lighthouse CI : https://github.com/GoogleChrome/lighthouse-ci
- Chrome DevTools Performance : https://developer.chrome.com/docs/devtools/performance/

## Dev Agent Record
### Agent Model Used
(a remplir par l'agent de dev)
### Debug Log References
(a remplir)
### Completion Notes List
(a remplir)
### File List
(a remplir apres implementation)
