# Story 2.7: CTA final et roue vélo scroll progress

Status: ready-for-dev

## Story

As a visiteur,
I want voir un CTA final motivant et suivre ma progression dans la page via une roue de vélo,
So that je sois incité à agir (appeler ou prendre RDV) et que je comprenne ma position dans le récit.

## Acceptance Criteria

1. **Given** un visiteur atteint le bas de la page, **When** la section CTA finale entre dans le viewport, **Then** un bloc centré apparaît en reveal avec : tag "Dernière chose", titre "Votre vélo mérite mieux qu'un rayon d'hypermarché.", sous-titre "Passez nous voir à Colombes. Ou appelez, on répond."

2. **Given** le bloc CTA final, **When** il est visible, **Then** il affiche 2 boutons centrés : "Prendre rendez-vous" (primary, lien `/contact`) et "01 42 42 66 02" (outline, lien `tel:0142426602`). Le deuxième bouton avec stagger delay.

3. **Given** le fond, **When** la section CTA est affichée, **Then** le fond est `bg-ivory` (section claire), contenu centré max-w-4xl.

4. **Given** la roue de vélo, **When** le visiteur scroll sur la page, **Then** une roue SVG est affichée fixée sur le bord gauche de l'écran (`fixed left-5 md:left-8`). La roue **tourne proportionnellement** au scroll (`rotate = scrollY * 0.35deg`). Desktop uniquement (`hidden md:block`).

5. **Given** la barre de progression, **When** le visiteur scroll, **Then** une ligne verticale fine (`w-[2px]`) s'affiche de 10vh à 90vh du viewport. La progression est représentée par un remplissage terracotta proportionnel au scroll. La roue se déplace le long de cette ligne.

6. **Given** les waypoints, **When** le visiteur passe une section, **Then** des labels apparaissent à côté de la ligne de progression : "Métiers", "Atelier", "Boutique", "Équipe", "Avis". Le label actif est en terracotta. Les labels passés sont en anthracite/25. Les labels futurs sont invisibles (opacity 0, translateX -6px). Les ticks changent de largeur : actif 20px, passé 12px, futur 8px.

7. **Given** la roue de vélo, **When** le visiteur est dans le hero (premiers 80% du viewport), **Then** la roue et la barre sont invisibles (opacity 0). Elles apparaissent progressivement après le hero (fade-in). Elles disparaissent à 90%+ du scroll (fade-out). La transition d'opacity est de 300ms.

8. **Given** la performance, **When** le scroll est actif, **Then** tous les calculs utilisent `requestAnimationFrame` avec un flag `ticking` pour le throttle. La roue utilise `will-change: transform`. Le style `transform` est appliqué via ref directe (`wheelRef.current.style.transform`) pas via state React pour éviter les re-renders.

9. **Given** l'accessibilité, **When** la roue et la barre sont affichées, **Then** le conteneur a `aria-hidden="true"` et `pointer-events-none` (éléments purement décoratifs/informatifs, non interactifs).

## Tasks / Subtasks

- [ ] Task 1 — Auditer le composant CtaFinal existant (AC: #1, #2, #3)
  - [ ] Confirmer le reveal + reveal stagger-2 sur les CTAs
  - [ ] Confirmer les 2 boutons : "Prendre rendez-vous" (primary) et "01 42 42 66 02" (outline, `tel:`)
  - [ ] Confirmer le fond `bg-ivory`
  - [ ] Confirmer le SectionTitle inline (tag + titre h2 centré)
  - [ ] Vérifier que `useReveal(0.2)` est appliqué

- [ ] Task 2 — Auditer le composant BikeWheel / ScrollProgress (AC: #4, #5, #6, #7)
  - [ ] Confirmer la roue SVG `MiniWheel` : 10 rayons, cercle rim + hub, taille 48px
  - [ ] Confirmer la rotation `scrollY * 0.35` appliquée via `wheelRef.current.style.transform`
  - [ ] Confirmer la position fixée `fixed left-5 md:left-8 top-0 bottom-0 z-[40]`
  - [ ] Confirmer la ligne de progression : track `bg-anthracite/[0.05]` + fill `bg-terracotta/30`
  - [ ] Confirmer les waypoints : sections avec id → label, ticks variables, labels avec états actif/passé/futur
  - [ ] Confirmer le fade-in/fade-out : calcul `fadeIn` basé sur `scrollY > innerHeight * 0.8`, `fadeOut` basé sur `pct < 0.9`

- [ ] Task 3 — Vérifier les sections référencées par le ScrollProgress (AC: #6)
  - [ ] Confirmer le tableau `sections[]` : hero, services, process, boutique, equipe, avis, cta
  - [ ] Vérifier que chaque section homepage a l'id correspondant
  - [ ] Hero : `id="hero"` — pas de label
  - [ ] Services : `id="services"` — label "Métiers"
  - [ ] Process : `id="process"` — label "Atelier"
  - [ ] Boutique : `id="boutique"` — label "Boutique"
  - [ ] Equipe : `id="equipe"` — label "Équipe"
  - [ ] Avis : `id="avis"` — label "Avis"
  - [ ] CTA : `id="cta"` — pas de label

- [ ] Task 4 — Vérifier la performance (AC: #8)
  - [ ] Confirmer le pattern `ticking` + `requestAnimationFrame`
  - [ ] Confirmer `will-change: transform` sur la roue
  - [ ] Confirmer que le `style.transform` de la roue est appliqué via ref directe (pas via `setState`)
  - [ ] Les states React (`progress`, `activeIndex`, `opacity`) ne causent pas de re-render excessif — le transform de la roue est séparé

- [ ] Task 5 — Accessibilité (AC: #9)
  - [ ] Confirmer `aria-hidden="true"` sur le conteneur principal
  - [ ] Confirmer `pointer-events-none` sur le conteneur
  - [ ] Confirmer `hidden md:block` (desktop uniquement)

## Dev Notes

### Architecture Critique
- **Deux composants Client distincts** : `CtaFinal.tsx` (section CTA) et `BikeWheel.tsx` (scroll progress).
- `BikeWheel.tsx` est importé dans `app/(site)/layout.tsx` sous le nom `ScrollProgress` — il est **au niveau du layout**, pas de la page, pour être visible sur toute la navigation.
- Le ScrollProgress utilise un mélange de state React (progress, activeIndex, opacity) et de ref directe (wheelRef.current.style.transform) pour optimiser la performance.
- La roue SVG `MiniWheel` est un composant interne à `BikeWheel.tsx` — pas exporté séparément.
- Le calcul de la section active utilise `getBoundingClientRect().top <= innerHeight * 0.4` en boucle inverse (dernière section dont le top est passé à 40% du viewport).

### Composants Existants à Réutiliser

| Composant | Chemin | Type | Notes |
|-----------|--------|------|-------|
| CtaFinal | `components/home/CtaFinal.tsx` | Client | Section CTA, useReveal |
| BikeWheel (ScrollProgress) | `components/ui/BikeWheel.tsx` | Client | Roue + barre + waypoints |
| Button | `components/ui/Button.tsx` | Server | Variantes primary et outline |
| useReveal | `components/ui/useReveal.ts` | Hook | threshold 0.2 pour CtaFinal |

### Fichiers à Créer/Modifier

| Fichier | Action | Raison |
|---------|--------|--------|
| `components/home/CtaFinal.tsx` | Vérifier | Conformité AC |
| `components/ui/BikeWheel.tsx` | Vérifier | Conformité AC, performance |

### Anti-patterns à EVITER
- **NE PAS** ajouter de scroll listener sans `requestAnimationFrame` throttle
- **NE PAS** utiliser `setState` pour le transform de la roue — ref directe pour la performance
- **NE PAS** rendre le ScrollProgress interactif (cliquable) — c'est purement visuel
- **NE PAS** afficher le ScrollProgress en mobile — desktop uniquement (`hidden md:block`)
- **NE PAS** utiliser de librairie externe pour le SVG de la roue — inline SVG pur
- **NE PAS** ajouter de transition CSS sur le height du fill ou le top de la roue — `transition: "none"` est intentionnel pour la fluidité

### Calcul Scroll Progress (code existant)
```typescript
// Pourcentage de scroll global
const pct = scrollY / (docHeight);

// Fade in après le hero, fade out avant la fin
const fadeIn = Math.min(1, Math.max(0, (scrollY - innerHeight * 0.8) / (innerHeight * 0.5)));
const fadeOut = Math.min(1, Math.max(0, (1 - pct) / 0.1));
setOpacity(Math.min(fadeIn, fadeOut));

// Rotation roue proportionnelle
wheelRef.current.style.transform = `rotate(${scrollY * 0.35}deg)`;
```

### Project Structure Notes
- CtaFinal est le 8ème et dernier composant dans la séquence narrative homepage
- ScrollProgress est dans le layout `app/(site)/layout.tsx`, pas dans la page
- ID : `#cta` — référencé par ScrollProgress mais sans label (pas de waypoint visible)

### References
- [Source: components/home/CtaFinal.tsx] — code existant 37 lignes
- [Source: components/ui/BikeWheel.tsx] — code existant 183 lignes
- [Source: app/(site)/layout.tsx#L4,L66] — import ScrollProgress dans le layout
- [Source: components/ui/Button.tsx] — variantes primary et outline

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
