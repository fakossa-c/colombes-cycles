# Story 2.8: Système d'animations reveal et parallax

Status: ready-for-dev

## Story

As a visiteur,
I want que les éléments apparaissent progressivement avec des effets de profondeur au scroll,
So that l'expérience soit immersive et narrative.

## Acceptance Criteria

1. **Given** le hook `useReveal`, **When** un élément avec la classe `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` ou `.line-grow` entre dans le viewport, **Then** la classe `visible` est ajoutée via IntersectionObserver. Le threshold est configurable (par défaut 0.15).

2. **Given** les animations reveal, **When** `.visible` est ajouté, **Then** les transitions suivantes se produisent :
   - `.reveal` : opacity 0→1, translateY(40px→0), 0.8s cubic-bezier(0.16, 1, 0.3, 1)
   - `.reveal-left` : opacity 0→1, translateX(-60px→0), même timing
   - `.reveal-right` : opacity 0→1, translateX(60px→0), même timing
   - `.reveal-scale` : opacity 0→1, scale(0.9→1), même timing
   - `.line-grow` : width 0→80px, 1.2s cubic-bezier

3. **Given** un conteneur avec plusieurs éléments reveal, **When** ils deviennent visibles, **Then** les classes `.stagger-1` à `.stagger-5` ajoutent un délai progressif : 0.08s, 0.16s, 0.24s, 0.32s, 0.4s. L'effet est un reveal en cascade.

4. **Given** le hook `useParallax`, **When** un élément parent a des enfants avec `data-speed="N"`, **Then** chaque enfant se déplace verticalement en fonction de sa position relative au centre du viewport : `translateY = offset * speed`. Vitesse positive = même direction, négative = opposée.

5. **Given** la parallax, **When** le calcul est exécuté, **Then** le throttle est assuré par `requestAnimationFrame` avec flag `ticking` (NFR9 — max 60fps). Les styles sont appliqués directement via `child.style.transform` (pas de React state).

6. **Given** un utilisateur avec `prefers-reduced-motion: reduce`, **When** il visite le site, **Then** TOUTES les animations reveal (opacity, translate, scale) et la parallax sont désactivées. Les éléments sont immédiatement visibles sans animation. **EXCEPTION** : le swipe Tinder (Stories 2.6) reste fonctionnel car c'est une interaction utilisateur volontaire, pas une animation automatique.

7. **Given** le hero, **When** les animations d'entrée se jouent, **Then** elles utilisent des keyframes CSS séparés (`heroSlideUp`, `heroFadeIn`, `heroLine`) avec des delays séquentiels. Le parallax du hero est géré inline (pas via `useParallax`) avec un fade-out global via CSS custom property `--hero-fade`.

8. **Given** le marquee trust band, **When** il tourne, **Then** c'est une animation CSS pure `@keyframes marquee` — 30s linear infinite, pause au hover. Pas de JavaScript.

9. **Given** les performances globales, **When** toutes les animations sont actives, **Then** aucune librairie externe n'est utilisée (pas de Framer Motion, GSAP, Lenis, AOS). Tout est en CSS natif + IntersectionObserver + rAF.

## Tasks / Subtasks

- [ ] Task 1 — Auditer le hook useReveal (AC: #1)
  - [ ] Confirmer IntersectionObserver avec threshold configurable
  - [ ] Confirmer le sélecteur : `.reveal, .reveal-left, .reveal-right, .reveal-scale, .line-grow`
  - [ ] Confirmer l'ajout de la classe `visible` sur intersection
  - [ ] Confirmer le cleanup `observer.disconnect()` dans le return du useEffect
  - [ ] Vérifier que l'observation est faite sur l'élément parent (pas sur chaque enfant)

- [ ] Task 2 — Auditer le hook useParallax (AC: #4, #5)
  - [ ] Confirmer la sélection des enfants `[data-speed]`
  - [ ] Confirmer le calcul : `offset = centerElement - centerViewport`, `translateY = offset * speed`
  - [ ] Confirmer le pattern `ticking` + `requestAnimationFrame`
  - [ ] Confirmer l'application directe via `child.style.transform`
  - [ ] Confirmer le scroll listener avec `{ passive: true }`
  - [ ] Confirmer le cleanup `removeEventListener` dans le return

- [ ] Task 3 — Auditer les classes CSS reveal et stagger (AC: #2, #3)
  - [ ] Confirmer les 4 classes reveal + leurs états `.visible` dans `globals.css`
  - [ ] Confirmer les 5 classes stagger avec les bons delays
  - [ ] Confirmer le cubic-bezier `(0.16, 1, 0.3, 1)` — c'est un ease-out très prononcé
  - [ ] Confirmer `.line-grow` : width 0 → 80px

- [ ] Task 4 — Implémenter prefers-reduced-motion (AC: #6)
  - [ ] Ajouter une media query dans `globals.css` :
    ```css
    @media (prefers-reduced-motion: reduce) {
      .reveal, .reveal-left, .reveal-right, .reveal-scale {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .line-grow {
        width: 80px !important;
        transition: none !important;
      }
      .marquee-track {
        animation: none !important;
      }
      .hero-title, .hero-subtitle, .hero-cta, .hero-line, .hero-badge {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
      }
    }
    ```
  - [ ] Dans `useParallax`, vérifier `window.matchMedia('(prefers-reduced-motion: reduce)')` et ne pas appliquer le parallax si activé
  - [ ] NE PAS désactiver le swipe Tinder (interaction utilisateur)

- [ ] Task 5 — Vérifier les animations Hero spécifiques (AC: #7)
  - [ ] Confirmer les keyframes `heroSlideUp`, `heroFadeIn`, `heroLine`
  - [ ] Confirmer les classes `.hero-title`, `.hero-subtitle`, `.hero-cta`, `.hero-line`, `.hero-badge`
  - [ ] Confirmer le fade-out via `--hero-fade` CSS custom property
  - [ ] Confirmer que le Hero gère son propre parallax (pas via `useParallax` hook)

- [ ] Task 6 — Vérifier le marquee CSS (AC: #8)
  - [ ] Confirmer `@keyframes marquee { 0% translateX(0); 100% translateX(-50%) }`
  - [ ] Confirmer `animation: marquee 30s linear infinite`
  - [ ] Confirmer `animation-play-state: paused` au hover

- [ ] Task 7 — Audit de conformité NFR9 et performance (AC: #9)
  - [ ] Confirmer l'absence de Framer Motion, GSAP, Lenis, AOS dans `package.json`
  - [ ] Confirmer que toutes les animations sont CSS natif ou rAF
  - [ ] Mesurer le FPS pendant le scroll avec 8 sections chargées (objectif : 60fps stable)
  - [ ] Vérifier `will-change: transform` n'est utilisé que sur la roue vélo (pas sur les reveals)

## Dev Notes

### Architecture Critique
- Le système d'animations est composé de **3 couches** :
  1. **CSS Classes** (globals.css) : définissent les transitions reveal, stagger, parallax, hero, marquee
  2. **Hooks React** (useReveal.ts, useParallax.ts) : orchestrent l'IntersectionObserver et les calculs scroll
  3. **Code inline** (Hero.tsx) : gère le cas spécifique du Hero (fade-out + parallax custom)

- **useReveal** observe l'élément parent et ajoute `visible` à TOUS les enfants qui ont une classe reveal. C'est un pattern "observe once, reveal all children" — efficace car un seul observer par section.

- **useParallax** calcule l'offset par rapport au centre du viewport pour chaque enfant `[data-speed]`. Le speed multiplier détermine l'amplitude et la direction.

- Le **cubic-bezier(0.16, 1, 0.3, 1)** est un ease-out très agressif — l'animation démarre vite et décélère fortement. C'est la signature visuelle du site.

- **prefers-reduced-motion** n'est PAS encore implémenté — c'est la tâche principale de cette story.

### Composants Existants à Réutiliser

| Composant | Chemin | Type | Notes |
|-----------|--------|------|-------|
| useReveal | `components/ui/useReveal.ts` | Hook Client | 26 lignes, IntersectionObserver |
| useParallax | `components/ui/useParallax.ts` | Hook Client | 45 lignes, rAF scroll |
| globals.css | `app/globals.css` | CSS | 219 lignes, toutes les animations |

### Fichiers à Créer/Modifier

| Fichier | Action | Raison |
|---------|--------|--------|
| `app/globals.css` | Modifier | Ajouter `@media (prefers-reduced-motion: reduce)` |
| `components/ui/useParallax.ts` | Modifier | Respecter prefers-reduced-motion |
| `components/ui/useReveal.ts` | Vérifier | Conformité, éventuellement prefers-reduced-motion |

### Anti-patterns à EVITER
- **NE PAS** installer Framer Motion, GSAP, Lenis, AOS ou toute librairie d'animation
- **NE PAS** utiliser `will-change: transform` partout — seulement sur les éléments qui en ont vraiment besoin (roue vélo)
- **NE PAS** déclencher des animations sur chaque frame sans throttle rAF
- **NE PAS** utiliser `{ passive: false }` sur les scroll listeners
- **NE PAS** réduire le cubic-bezier à un ease/ease-out standard — le `(0.16, 1, 0.3, 1)` est la signature
- **NE PAS** désactiver le swipe Tinder avec prefers-reduced-motion
- **NE PAS** observer chaque enfant individuellement avec IntersectionObserver — observer le parent et révéler les enfants
- **NE PAS** utiliser `transform: translate3d(0,0,0)` comme hack GPU — les navigateurs modernes gèrent cela automatiquement

### Inventory of All Animations in the Project

| Animation | Type | Fichier CSS | Fichier JS | Notes |
|-----------|------|-------------|------------|-------|
| reveal (fade-up) | CSS transition | globals.css L16-25 | useReveal.ts | IntersectionObserver |
| reveal-left | CSS transition | globals.css L27-36 | useReveal.ts | IntersectionObserver |
| reveal-right | CSS transition | globals.css L38-47 | useReveal.ts | IntersectionObserver |
| reveal-scale | CSS transition | globals.css L49-58 | useReveal.ts | IntersectionObserver |
| stagger-1 to 5 | CSS delay | globals.css L60-64 | - | Combiné avec reveal |
| heroSlideUp | CSS keyframe | globals.css L67-70 | - | Automatique au chargement |
| heroFadeIn | CSS keyframe | globals.css L71-73 | - | Automatique au chargement |
| heroLine | CSS keyframe | globals.css L74-77 | - | scaleX auto |
| hero parallax | JS + CSS | - | Hero.tsx | data-speed, rAF inline |
| hero fade-out | JS + CSS var | - | Hero.tsx | --hero-fade via scrollY |
| marquee | CSS keyframe | globals.css L102-104 | - | 30s linear infinite |
| line-grow | CSS transition | globals.css L180-186 | useReveal.ts | IntersectionObserver |
| parallax data-speed | JS | - | useParallax.ts | rAF throttled |
| roue vélo scroll | JS | - | BikeWheel.tsx | rAF, ref directe |
| magnetic-btn hover | CSS | globals.css L132-151 | - | scale + glow |
| swipe Tinder | JS | - | Team.tsx, Reviews.tsx | Touch events |

### Project Structure Notes
- Cette story est **transversale** — elle concerne le système d'animations utilisé par toutes les autres stories de l'Epic 2.
- L'implémentation principale est déjà faite — cette story consiste à auditer, documenter, et ajouter `prefers-reduced-motion`.
- L'ordre de développement recommandé : cette story peut être faite en parallèle des autres, car elle n'ajoute pas de nouvelles fonctionnalités mais solidifie le système existant.

### References
- [Source: components/ui/useReveal.ts] — code existant 26 lignes
- [Source: components/ui/useParallax.ts] — code existant 45 lignes
- [Source: app/globals.css] — code existant 219 lignes, toutes les animations CSS
- [Source: components/home/Hero.tsx] — parallax et fade-out inline
- [Source: components/ui/BikeWheel.tsx] — scroll progress avec rAF
- NFR9 (exigence non-fonctionnelle) : animations rAF-throttled, 60fps objectif

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
