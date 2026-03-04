# Story 2.2: Hero plein écran avec animations d'entrée

Status: ready-for-dev

## Story

As a visiteur,
I want être immédiatement immergé dans l'univers Colombes Cycles,
So that je comprenne en 3 secondes l'expertise, chaleur humaine, preuve sociale.

## Acceptance Criteria

1. **Given** un visiteur charge la page d'accueil, **When** le hero s'affiche, **Then** la section occupe 100% du viewport (`min-h-[100svh]`), fond anthracite, avec le texte principal, sous-titre, CTAs et stats.

2. **Given** le hero se charge, **When** les animations d'entrée se déclenchent, **Then** les éléments apparaissent de manière séquentielle :
   - Badge ("Atelier de cycles · Colombes 92") : fade-in à 0.8s
   - Titre h1 ("Ici, on connaît votre vélo.") : slide-up 1.2s
   - Ligne terracotta : scaleX(0→1) à 0.2s delay
   - Sous-titre : slide-up 1s à 0.3s delay
   - CTAs : slide-up 1s à 0.5s delay
   - Stats (4.8/5 + 15 ans) : fade-in à 0.8s delay

3. **Given** le hero est affiché, **When** le visiteur voit les CTAs, **Then** il y a deux boutons : "Prendre RDV" (lien `/contact`, variante primary terracotta) et "Découvrir nos vélos" (lien `/nos-velos`, variante outline-light). Le CTA "Appeler" avec `tel:` doit remplacer ou compléter les CTAs existants selon le brief.

4. **Given** le visiteur scroll, **When** il descend, **Then** le hero s'estompe progressivement (opacity piloté par `--hero-fade` via `scrollY / (innerHeight * 0.6)`). Les éléments avec `data-speed` bougent à des vitesses différentes (parallax).

5. **Given** la preuve sociale, **When** le visiteur regarde le hero, **Then** il voit "4,8/5 — 271 avis Google" et "15 ans de métier" en bas droite (desktop uniquement, `hidden md:flex`).

6. **Given** les textes de fond, **When** le hero s'affiche, **Then** "CYCLES" en text-[18vw] opacity 7% est visible en parallax (`data-speed="0.08"`), et "COLOMBES" en text-[28vw] md:text-[22vw] opacity 7% en parallax opposé (`data-speed="-0.05"`).

7. **Given** l'accessibilité, **When** le visiteur utilise un lecteur d'écran, **Then** le h1 est sémantiquement correct, les CTAs ont des liens explicites, les textes décoratifs "CYCLES"/"COLOMBES" ont `aria-hidden="true"` (via `select-none` existant, ajouter `aria-hidden`).

## Tasks / Subtasks

- [ ] Task 1 — Auditer le Hero existant et valider les AC (AC: #1, #5, #6)
  - [ ] Confirmer `min-h-[100svh]` (utilise `svh` pas `vh` pour mobile)
  - [ ] Confirmer les stats "4,8/5" et "15 ans" en bas droite desktop
  - [ ] Confirmer les textes de fond "CYCLES" et "COLOMBES" avec parallax
  - [ ] Ajouter `aria-hidden="true"` aux divs de texte de fond décoratif

- [ ] Task 2 — Valider les animations d'entrée CSS (AC: #2)
  - [ ] Vérifier les keyframes dans `globals.css` : `heroSlideUp`, `heroFadeIn`, `heroLine`
  - [ ] Vérifier les classes : `.hero-title`, `.hero-subtitle`, `.hero-cta`, `.hero-line`, `.hero-badge`
  - [ ] Confirmer le séquencement des delays (0s, 0.2s, 0.3s, 0.5s, 0.8s)
  - [ ] Vérifier que `animation-fill-mode: forwards` est bien appliqué

- [ ] Task 3 — Ajuster les CTAs selon le brief (AC: #3)
  - [ ] Évaluer si "Appeler" (`tel:0142426602`) doit remplacer "Découvrir nos vélos" ou être ajouté en 3ème CTA
  - [ ] Actuellement : "Prendre RDV" (primary) + "Découvrir nos vélos" (outline-light)
  - [ ] Brief demande : CTA "Appeler" tel: + CTA "Prendre RDV"
  - [ ] Decision : remplacer "Découvrir nos vélos" par "Appeler" (`href="tel:0142426602"`, variante `outline-light`)

- [ ] Task 4 — Optimiser le fade-out au scroll (AC: #4)
  - [ ] Vérifier le calcul `opacity = Math.max(0, 1 - scrollY / (innerHeight * 0.6))`
  - [ ] Confirmer l'utilisation de `requestAnimationFrame` avec flag `ticking` (déjà en place)
  - [ ] Vérifier les data-speed parallax : titre `-0.03`, sous-titre `-0.01`, CYCLES `0.08`, COLOMBES `-0.05`, grille `0.02`

- [ ] Task 5 — Accessibilité (AC: #7)
  - [ ] Ajouter `aria-hidden="true"` sur les divs de texte de fond (CYCLES, COLOMBES)
  - [ ] Confirmer que le `<h1>` est unique sur la page
  - [ ] Vérifier que les liens CTA ont du texte explicite

## Dev Notes

### Architecture Critique
- **Client Component obligatoire** : Hero utilise `useEffect` et `useRef` pour le scroll listener + parallax.
- Le parallax du Hero est géré **inline** dans le composant (pas via `useParallax` hook) car il a un comportement spécifique (fade-out global + data-speed par élément enfant). C'est intentionnel.
- Le fade-out utilise une CSS custom property `--hero-fade` appliquée via `style={{ opacity: "var(--hero-fade, 1)" }}` sur le conteneur de contenu.
- Les animations d'entrée sont en **CSS pur** (keyframes dans `globals.css`), pas en JS — c'est le pattern voulu, pas de Framer Motion.
- L'image de fond n'existe pas encore — le hero utilise une grille subtile et du texte typographique pour créer l'ambiance. Les photos viendront plus tard.

### Composants Existants à Réutiliser

| Composant | Chemin | Type | Notes |
|-----------|--------|------|-------|
| Hero | `components/home/Hero.tsx` | Client | Composant principal, déjà fonctionnel |
| Button | `components/ui/Button.tsx` | Server | 4 variantes : primary, outline, outline-light, ghost |

### Fichiers à Créer/Modifier

| Fichier | Action | Raison |
|---------|--------|--------|
| `components/home/Hero.tsx` | Modifier | CTA "Appeler" + aria-hidden sur textes décoratifs |
| `app/globals.css` | Aucune | Keyframes hero déjà en place |

### Anti-patterns à EVITER
- **NE PAS** utiliser Framer Motion ou GSAP pour les animations d'entrée — CSS keyframes natifs
- **NE PAS** ajouter de scroll listener sans `requestAnimationFrame` throttle
- **NE PAS** ajouter `{ passive: false }` au scroll listener — garder `{ passive: true }`
- **NE PAS** charger d'images lourdes dans le hero sans lazy-loading (quand les photos arriveront)
- **NE PAS** mettre le texte "COLOMBES"/"CYCLES" en `<h2>` — ce sont des éléments décoratifs, pas sémantiques

### Project Structure Notes
- Le Hero est importé dans `app/(site)/page.tsx` comme premier composant
- L'ordre narratif de la homepage : Hero → TrustBand → Services → RepairProcess → Boutique → Team → Reviews → CtaFinal
- Le Hero a l'id `hero` utilisé par le composant `ScrollProgress` (BikeWheel) pour les waypoints

### References
- [Source: components/home/Hero.tsx] — code existant complet
- [Source: app/globals.css#L66-L99] — keyframes hero et classes d'animation
- [Source: components/ui/Button.tsx] — variantes primary, outline-light
- [Source: app/(site)/page.tsx] — intégration dans la page d'accueil

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
