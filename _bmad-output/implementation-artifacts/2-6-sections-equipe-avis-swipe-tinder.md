# Story 2.6: Sections Équipe et Avis — grille desktop, swipe Tinder mobile

Status: ready-for-dev

## Story

As a visiteur,
I want découvrir l'équipe et lire les avis clients de manière engageante,
So that je ressente confiance et connexion humaine avec la boutique.

## Acceptance Criteria

1. **Given** un visiteur desktop sur la section Équipe, **When** la section entre dans le viewport, **Then** une grille 2x2 affiche les 4 membres (David Thibault, François, Mathys, Christophe) en reveal staggeré (`.reveal .stagger-1` à `.stagger-4`).

2. **Given** chaque carte équipe desktop, **When** elle est affichée, **Then** elle contient : lettre initiale géante en fond (6rem, opacity 2.5%), avatar cercle avec initiales, nom + prénom, rôle en uppercase terracotta, description, accent en italique font-medium. Hover : bordure passe à `terracotta/20`, lettre de fond passe à `terracotta/[0.06]`.

3. **Given** un visiteur mobile sur la section Équipe, **When** il interagit avec les cartes, **Then** un système de pile de cartes (Tinder-like) est affiché. Le visiteur peut swiper gauche ou droite. Seuil de déclenchement : **50px**. La carte part dans la **direction du swipe** (translateX ± 400px) avec rotation (±12deg). Les cartes en pile ont des rotations légères (0°, 3°, -2.5°, 4°) et un scale décroissant.

4. **Given** le swipe mobile, **When** l'utilisateur swipe, **Then** il n'y a PAS de conflit avec le scroll vertical — le swipe ne se déclenche que si `Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)` (delta X > delta Y). La transition de sortie dure 350ms ease-out.

5. **Given** un visiteur desktop sur la section Avis, **When** la section entre dans le viewport, **Then** une grille 3x2 (6 avis) s'affiche en reveal staggeré. En-tête avec SectionTitle "Ce que disent ceux qui roulent avec nous." et note géante "4,8" avec 5 étoiles terracotta.

6. **Given** chaque carte avis desktop, **When** elle est affichée, **Then** elle contient : 5 étoiles terracotta, texte citation entre guillemets, avatar cercle avec initiales, nom. Hover : bordure passe à `terracotta/20`.

7. **Given** un visiteur mobile sur la section Avis, **When** il interagit, **Then** le même système swipe Tinder que l'équipe est utilisé (pile de cartes, seuil 50px, rotation, pas de conflit scroll). Les 6 avis sont empilés.

8. **Given** les deux sections, **When** elles sont affichées, **Then** Équipe est sur fond `bg-ivory` et Avis sur fond `bg-anthracite` (section sombre avec texte clair). Les dots/indicateurs sont affichés en mobile sous la pile : dots cliquables + compteur "N/total".

9. **Given** les données, **When** les composants se chargent, **Then** les données proviennent de `lib/data/team.ts` et `lib/data/reviews.ts` (dépendance Story 1.5). En attendant, les données inline sont acceptées. Équipe : 4 membres. Avis : 6 avis.

10. **Given** `prefers-reduced-motion`, **When** l'utilisateur a activé cette préférence, **Then** les animations reveal sont désactivées MAIS le swipe Tinder reste fonctionnel (c'est une interaction utilisateur, pas une animation automatique).

## Tasks / Subtasks

- [ ] Task 1 — Auditer le composant Team existant (AC: #1, #2, #3, #4)
  - [ ] Confirmer la grille desktop `md:grid md:grid-cols-2 gap-4 md:gap-5`
  - [ ] Confirmer le reveal staggeré `.reveal .stagger-N` sur chaque carte
  - [ ] Confirmer le composant `TeamCard` avec tous les éléments (initiale, avatar, nom, rôle, description, accent)
  - [ ] Confirmer le `MobileCardStack` avec la logique swipe Tinder
  - [ ] Vérifier le seuil 50px : `Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)`
  - [ ] Vérifier la direction du swipe : `advance(dx < 0 ? -1 : 1)` avec `setSwipeX(dir * 400)`
  - [ ] Confirmer les rotations de pile : `[0, 3, -2.5, 4]`
  - [ ] Confirmer la transition 350ms ease-out

- [ ] Task 2 — Auditer le composant Reviews existant (AC: #5, #6, #7)
  - [ ] Confirmer la grille desktop 3 colonnes (première rangée: `reviews.slice(0, 3)`, deuxième: `reviews.slice(3, 6)`)
  - [ ] Confirmer l'en-tête avec note géante "4,8" + 5 étoiles + texte "271 avis Google"
  - [ ] Confirmer le `MobileReviewStack` avec la même logique swipe que Team
  - [ ] Vérifier le seuil 50px et la prévention conflit scroll
  - [ ] Confirmer les dots cliquables + compteur en mobile

- [ ] Task 3 — Vérifier la robustesse du swipe (AC: #3, #4, #7)
  - [ ] Confirmer que `swiping` flag empêche les swipes multiples simultanés
  - [ ] Confirmer que `onTouchStart` enregistre `startX` et `startY`
  - [ ] Confirmer que `onTouchEnd` vérifie `Math.abs(dx) > Math.abs(dy)` avant de swiper
  - [ ] Confirmer que le clic desktop avance aussi la pile (`onClick={() => !swiping && advance(-1)}`)
  - [ ] Vérifier l'absence de cartes fantômes (récents commits de fix)
  - [ ] Confirmer `visibility: hidden` + `opacity: 0` sur les cartes au-delà de l'offset 2

- [ ] Task 4 — Vérifier les fonds et le contraste (AC: #8)
  - [ ] Team : `bg-ivory`, texte anthracite, cartes `bg-cream`
  - [ ] Reviews : `bg-anthracite`, texte blanc/blanc-40%, cartes fond sombre, étoiles terracotta
  - [ ] Confirmer le SectionTitle variante `light` dans Reviews

- [ ] Task 5 — Préparer la migration des données (AC: #9, dépendance Story 1.5)
  - [ ] Documenter les données `team[]` inline (4 membres)
  - [ ] Documenter les données `reviews[]` inline (6 avis)
  - [ ] Quand Story 1.5 : créer `lib/data/team.ts` et `lib/data/reviews.ts`

- [ ] Task 6 — Accessibilité et prefers-reduced-motion (AC: #10)
  - [ ] Vérifier les dots : `aria-label="Carte N"` / `aria-label="Avis N"` déjà en place
  - [ ] S'assurer que le swipe Tinder reste fonctionnel même avec prefers-reduced-motion
  - [ ] Vérifier que les transitions CSS respectent prefers-reduced-motion pour les reveal (à implémenter dans Story 2.8 — les classes `.reveal` globales)

## Dev Notes

### Architecture Critique
- **Deux composants Client** séparés : `Team.tsx` et `Reviews.tsx` — chacun utilise `useReveal`.
- Le pattern swipe Tinder est **dupliqué** entre `MobileCardStack` (Team) et `MobileReviewStack` (Reviews). C'est un code smell intentionnel pour l'instant — une future story pourrait factoriser en hook `useSwipeStack`.
- Les composants swipe utilisent `useState` + `useRef` + `useCallback` — pas de librairie externe.
- La logique swipe clé :
  - `touchRef.current` stocke `startX` et `startY`
  - `onTouchEnd` calcule `dx` et `dy`, vérifie seuil 50px ET direction horizontale dominante
  - `advance(dir)` : met `swiping = true`, `swipeX = dir * 400`, après 350ms remet tout et avance l'index
  - La carte active a `pointerEvents: "auto"`, les autres `"none"`
- Récents commits (voir git log) : correction de la direction du swipe et suppression des cartes fantômes.

### Composants Existants à Réutiliser

| Composant | Chemin | Type | Notes |
|-----------|--------|------|-------|
| Team | `components/home/Team.tsx` | Client | Grille desktop + MobileCardStack |
| Reviews | `components/home/Reviews.tsx` | Client | Grille desktop + MobileReviewStack |
| SectionTitle | `components/ui/SectionTitle.tsx` | Server | Variante `light` pour Reviews |
| useReveal | `components/ui/useReveal.ts` | Hook | threshold 0.08 pour Team et Reviews |

### Fichiers à Créer/Modifier

| Fichier | Action | Raison |
|---------|--------|--------|
| `components/home/Team.tsx` | Vérifier | Conformité AC, tests swipe |
| `components/home/Reviews.tsx` | Vérifier | Conformité AC, tests swipe |
| `lib/data/team.ts` | Créer (Story 1.5) | Centralisation données équipe |
| `lib/data/reviews.ts` | Créer (Story 1.5) | Centralisation données avis |

### Anti-patterns à EVITER
- **NE PAS** utiliser un slider auto-play avec contrôles pour les avis — swipe Tinder mobile + grille desktop
- **NE PAS** ajouter de librairie externe pour le swipe (react-swipeable, etc.) — touch natif
- **NE PAS** bloquer le scroll vertical pendant le swipe horizontal — seule la condition `dx > dy` détermine le comportement
- **NE PAS** fusionner Team et Reviews en un seul composant — ce sont deux sections narratives distinctes
- **NE PAS** supprimer le clic desktop sur la pile — c'est une affordance tactile utile aussi au trackpad
- **NE PAS** réduire le seuil de 50px — testé et optimisé pour éviter les faux positifs

### Swipe Tinder Pattern (code existant)
```typescript
// Seuil 50px + priorité horizontale
if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
  advance(dx < 0 ? -1 : 1);
}

// Direction du swipe
const advance = (dir: -1 | 1) => {
  setSwiping(true);
  setSwipeX(dir * 400); // carte part dans la direction du swipe
  setTimeout(() => {
    setActive((prev) => (prev + 1) % items.length);
    setSwipeX(0);
    setSwiping(false);
  }, 350);
};
```

### Project Structure Notes
- Team est le 6ème composant dans la séquence narrative (après Boutique)
- Reviews est le 7ème composant
- IDs : `#equipe`, `#avis` — référencés par ScrollProgress waypoints
- Team : fond `bg-ivory`, Reviews : fond `bg-anthracite` (alternance clair/sombre)

### References
- [Source: components/home/Team.tsx] — code existant 236 lignes
- [Source: components/home/Reviews.tsx] — code existant 252 lignes
- [Source: git log] — commits récents : "fix: carte part dans la direction du swipe", "fix: swipe unidirectionnel — supprime le bug carte fantôme"
- [Source: app/globals.css#L16-L64] — classes reveal et stagger

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
