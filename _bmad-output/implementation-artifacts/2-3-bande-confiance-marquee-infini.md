# Story 2.3: Bande de confiance marquee infini

Status: ready-for-dev

## Story

As a visiteur,
I want voir défiler les preuves de confiance en continu,
So that je sois rassuré sur l'expertise et le sérieux de Colombes Cycles.

## Acceptance Criteria

1. **Given** un visiteur sur la page d'accueil, **When** il regarde sous le hero, **Then** il voit une bande horizontale avec 6 items de confiance qui défilent en boucle infinie.

2. **Given** les 6 items de confiance, **When** ils défilent, **Then** les items sont : "4,8★ sur 271 avis Google", "Certifié BOSCH eBike", "15 ans de métier", "1ère révision offerte", "Toutes marques acceptées", "Orbea · Peugeot · Gitane · Velodeville". Séparateur : point terracotta `·` entre chaque item.

3. **Given** le marquee défile, **When** il reboucle, **Then** le défilement est **fluide sans saut** (la liste est dupliquée pour créer une boucle CSS continue : `translateX(0) → translateX(-50%)` sur 30s linear infinite).

4. **Given** le visiteur survole le marquee, **When** le hover est actif, **Then** l'animation se met en pause (`animation-play-state: paused`). PAS de boutons play/pause — pause au hover uniquement.

5. **Given** la performance, **When** le marquee tourne, **Then** l'animation est en CSS pur (`@keyframes marquee`), PAS de JavaScript pour le défilement. PAS de auto-play avec contrôles (anti-pattern).

6. **Given** les données, **When** le composant se charge, **Then** les items proviennent de `lib/data/trust-items.ts` (dépendance Story 1.5). En attendant, les données inline dans le composant sont acceptées.

7. **Given** l'accessibilité, **When** un lecteur d'écran lit le composant, **Then** la section a un `aria-label` descriptif et le contenu dupliqué est marqué `aria-hidden="true"` sur la copie.

## Tasks / Subtasks

- [ ] Task 1 — Auditer le TrustBand existant (AC: #1, #2, #3)
  - [ ] Confirmer les 6 items dans le bon ordre
  - [ ] Confirmer la duplication de la liste (`[...items, ...items]`) pour la boucle
  - [ ] Confirmer le séparateur terracotta `·`
  - [ ] Confirmer l'animation `translateX(0) → translateX(-50%)` sur 30s

- [ ] Task 2 — Vérifier l'animation CSS (AC: #3, #4, #5)
  - [ ] Confirmer la keyframe `marquee` dans `globals.css` ligne 102-104
  - [ ] Confirmer `.marquee-track` : `animation: marquee 30s linear infinite`
  - [ ] Confirmer `.marquee-track:hover` : `animation-play-state: paused`
  - [ ] Vérifier qu'il n'y a PAS de JavaScript de défilement
  - [ ] Vérifier l'absence de saut au rebouclage (la duplication des items doit couvrir exactement 200% de largeur)

- [ ] Task 3 — Accessibilité (AC: #7)
  - [ ] Ajouter `aria-label="Preuves de confiance"` sur la `<section>`
  - [ ] Marquer la copie dupliquée avec `aria-hidden="true"` (les items au-delà de l'index items.length)
  - [ ] Ajouter `role="marquee"` ou `role="region"` approprié

- [ ] Task 4 — Préparer la migration des données (AC: #6)
  - [ ] Documenter les items actuels inline
  - [ ] Quand Story 1.5 sera complète : créer `lib/data/trust-items.ts` et importer

- [ ] Task 5 — Vérifier le Server Component (performance)
  - [ ] Confirmer que TrustBand est un Server Component (pas de `"use client"`)
  - [ ] L'animation est 100% CSS, aucune interactivité JS nécessaire
  - [ ] Confirmer `overflow-hidden` sur la section pour masquer le débordement

## Dev Notes

### Architecture Critique
- **Server Component** : TrustBand n'utilise aucun hook React ni événement — c'est un Server Component pur. NE PAS ajouter `"use client"`.
- L'animation est entièrement en CSS (`@keyframes marquee` dans `globals.css`). Le composant rend simplement une liste dupliquée avec la classe `.marquee-track`.
- La bande est positionnée juste après le Hero dans l'ordre narratif de la homepage.
- Fond `bg-anthracite` avec `border-t border-white/[0.06]` — cohérent avec le thème sombre du Hero.

### Composants Existants à Réutiliser

| Composant | Chemin | Type | Notes |
|-----------|--------|------|-------|
| TrustBand | `components/home/TrustBand.tsx` | Server | Déjà fonctionnel, à vérifier accessibilité |

### Fichiers à Créer/Modifier

| Fichier | Action | Raison |
|---------|--------|--------|
| `components/home/TrustBand.tsx` | Modifier | Accessibilité (aria-label, aria-hidden) |
| `app/globals.css` | Aucune | Keyframes marquee déjà en place (L102-111) |
| `lib/data/trust-items.ts` | Créer (Story 1.5) | Centralisation données items confiance |

### Anti-patterns à EVITER
- **NE PAS** ajouter de boutons play/pause — le pause se fait au hover uniquement
- **NE PAS** utiliser de JavaScript pour le défilement — CSS `@keyframes` suffit
- **NE PAS** ajouter de slider auto-play avec contrôles (anti-pattern UX identifié dans l'audit)
- **NE PAS** convertir en Client Component — aucune raison pour du JS ici
- **NE PAS** utiliser `will-change: transform` sur le marquee sauf si des performances issues sont mesurées

### CSS Animation Pattern (existant)
```css
/* globals.css L102-111 */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 30s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```

### Project Structure Notes
- TrustBand est le 2ème composant dans la séquence narrative homepage (après Hero)
- Import dans `app/(site)/page.tsx` : `import TrustBand from "@/components/home/TrustBand"`

### References
- [Source: components/home/TrustBand.tsx] — code existant complet
- [Source: app/globals.css#L101-L111] — keyframes et classes marquee
- [Source: app/(site)/page.tsx#L2] — import dans la page d'accueil

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
