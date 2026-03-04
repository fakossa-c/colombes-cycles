# Story 3.3: SVG velo interactif avec 6 hotspots cliquables

Status: ready-for-dev

## Story

As a visiteur,
I want explorer les services de reparation en cliquant sur les zones d'un velo interactif,
So that je comprenne visuellement quels services sont proposes.

## Acceptance Criteria

1. **Given** le visiteur est sur /reparations en desktop (FR14)
   **When** la page se charge
   **Then** un SVG velo (viewBox 600x380) s'affiche avec 6 hotspots cliquables : revision, roues, freinage, transmission, electrique, urgences

2. **Given** le SVG velo est affiche
   **When** le visiteur observe les hotspots
   **Then** chaque hotspot a un cercle pulsant (animation CSS `zonePulse` keyframe) pour indiquer l'interactivite

3. **Given** le SVG velo est affiche
   **When** le visiteur clique sur un hotspot (ex: "roues")
   **Then** le service correspondant est selectionne dans le carrousel lateral (via callback `onSelect`)

4. **Given** le SVG velo est affiche
   **When** le visiteur utilise le clavier (Tab pour naviguer, Enter pour selectionner) (NFR19)
   **Then** chaque hotspot est focusable et activable au clavier

5. **Given** le visiteur est sur mobile (largeur <= 960px) (FR15)
   **When** la page se charge
   **Then** le SVG interactif est masque (affiche via `hidden lg:flex` sur le conteneur parent)
   **And** le carrousel horizontal swipable remplace le SVG

6. **Given** le SVG velo est affiche avec un service actif
   **When** le service "electrique" est selectionne
   **Then** le hotspot correspondant affiche un etat actif (stroke terracotta plein, remplissage plus intense, marker-ring visible)

7. **Given** le visiteur a active `prefers-reduced-motion: reduce`
   **When** la page se charge
   **Then** les animations de pulse sur les hotspots sont desactivees

## Tasks / Subtasks

- [ ] Task 1 -- Extraire les donnees des hotspots vers lib/data/services.ts (AC: #1)
  - [ ] Les 6 services et les labels/positions des hotspots sont actuellement inline dans `ServicesGrid.tsx` (lignes 17-85)
  - [ ] Creer `lib/data/services.ts` avec :
    - Type `ServiceKey = "revision" | "freinage" | "transmission" | "roues" | "electrique" | "urgences"`
    - Type `Service = { key: ServiceKey; title: string; tagline: string; description: string; tarif: string }`
    - Export `services: Service[]` (les 6 services)
    - Type `HotspotLabel = { key: ServiceKey; label: string; style: React.CSSProperties }`
    - Export `hotspotLabels: HotspotLabel[]` (les 5 labels flottants desktop)
  - [ ] Importer depuis `@/lib/data/services` dans ServicesGrid.tsx et BikeInteractiveSvg.tsx

- [ ] Task 2 -- Verifier l'accessibilite clavier des hotspots SVG (AC: #4)
  - [ ] Actuellement les hotspots utilisent `<g>` avec `onClick` : ce n'est PAS focusable au clavier par defaut
  - [ ] OPTION A (recommandee) : Ajouter `role="button"`, `tabIndex={0}`, `aria-label="Service {title}"` sur chaque `<g>` du composant Hotspot
  - [ ] Ajouter un handler `onKeyDown` sur chaque Hotspot :
    ```tsx
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(service);
      }
    }}
    ```
  - [ ] Verifier visuellement le focus ring : ajouter un style `:focus-visible` sur les groupes SVG hotspots
  - [ ] Tester : Tab parcourt les 6 hotspots, Enter selectionne, la selection met a jour le carrousel

- [ ] Task 3 -- Verifier les labels flottants desktop (AC: #1)
  - [ ] Les labels sont des `<button>` positionnes en absolute au-dessus du SVG (lignes 216-234 de ServicesGrid.tsx)
  - [ ] 5 labels sur 6 (pas de label pour "urgences" car le hotspot contient deja "SOS")
  - [ ] Chaque label change d'opacite selon l'etat actif
  - [ ] Les labels sont deja `<button>` donc accessibles au clavier : VERIFIER que le focus est visible

- [ ] Task 4 -- Verifier le fallback mobile (AC: #5)
  - [ ] Le conteneur SVG+labels utilise `hidden lg:flex` ou equivalent pour masquer en mobile
  - [ ] Actuellement dans ServicesGrid.tsx, le SVG est dans un conteneur `flex-1` sans masquage explicite mobile
  - [ ] VERIFIER : le conteneur parent du SVG (ligne 210) a `max-w-[500px] lg:max-w-none`
  - [ ] Le carrousel horizontal (track) a `flex lg:block` : en mobile c'est un flex horizontal scroll
  - [ ] CONFIRMER que le layout fonctionne : SVG visible uniquement en desktop, carrousel horizontal en mobile

- [ ] Task 5 -- Verifier les etats actifs des hotspots (AC: #6)
  - [ ] Le composant `Hotspot` (lignes 8-66 de BikeInteractiveSvg.tsx) gere les styles via CSS inline `<style>`
  - [ ] L'etat `.active` est applique via la classe conditionnelle : `hs-${service}${isActive ? " active" : ""}`
  - [ ] Les styles actifs : fill terracotta 10%, stroke plein #C4622D, stroke-width 1.5, marker-ring opacity 1
  - [ ] Verifier visuellement que le changement d'etat est perceptible

- [ ] Task 6 -- Ajouter prefers-reduced-motion (AC: #7)
  - [ ] L'animation `zonePulse` est definie en CSS inline dans le SVG (ligne 85-88 de BikeInteractiveSvg.tsx)
  - [ ] Ajouter dans le `<style>` du SVG :
    ```css
    @media (prefers-reduced-motion: reduce) {
      .animate-\\[zonePulse_3s_ease-out_infinite\\] {
        animation: none !important;
      }
    }
    ```
  - [ ] OU utiliser la classe Tailwind `motion-reduce:animate-none` sur les elements concernes
  - [ ] Verifier que les pulses s'arretent avec prefers-reduced-motion active

## Dev Notes

### Architecture Critique

**Le composant BikeInteractiveSvg est un Server Component.**
- Il n'a pas `"use client"` en haut du fichier
- Il recoit `active` et `onSelect` comme props depuis `ServicesGrid` (qui est un Client Component)
- C'est correct : un Server Component peut etre passe comme children/props a un Client Component
- NE PAS ajouter "use client" a BikeInteractiveSvg.tsx sauf si necessaire

**Le SVG utilise des styles inline `<style>` pour les animations.**
- Chaque hotspot a sa propre section `<style>` avec des selectors `.hs-{service}`
- L'animation `zonePulse` est un keyframe CSS defini dans le SVG
- Les transitions sont en `cubic-bezier(0.22,1,0.36,1)` -- la courbe signature du projet

**Le composant Hotspot est interne a BikeInteractiveSvg.tsx.**
- C'est une fonction locale (pas exportee) qui wraps les elements SVG de chaque zone
- Il gere : hit areas (transparents pour le clic), zone-fill (fond colore), part-line (traits du velo), markers (cercles pulsants)

**Le layout SVG + Carrousel est gere par ServicesGrid.tsx.**
- ServicesGrid est "use client" et gere tout l'etat : activeIndex, isMobile, scroll, wheel, keyboard
- Il passe `active` (ServiceKey) et `onSelect` (callback) au SVG
- Le carrousel est dans le meme composant, a droite du SVG en desktop

### Composants Existants a Reutiliser

| Composant | Chemin | Role |
|-----------|--------|------|
| BikeInteractiveSvg | `app/(site)/reparations/BikeInteractiveSvg.tsx` | SVG velo avec 6 hotspots (Server Component) |
| ServicesGrid | `app/(site)/reparations/ServicesGrid.tsx` | Conteneur SVG + carrousel (Client Component) |
| Hotspot (interne) | dans BikeInteractiveSvg.tsx | Wrapper de zone interactive SVG |
| Marker (interne) | dans BikeInteractiveSvg.tsx | Cercle pulsant sur un hotspot |
| useReveal | `@/components/ui/useReveal.ts` | Hook IntersectionObserver |
| SectionTitle | `@/components/ui/SectionTitle.tsx` | Titre de section avec tag |

### Fichiers a Creer/Modifier

| Action | Fichier | Raison |
|--------|---------|--------|
| Modifier | `app/(site)/reparations/BikeInteractiveSvg.tsx` | Ajouter accessibilite clavier (role, tabIndex, onKeyDown, aria-label), prefers-reduced-motion |
| Creer | `lib/data/services.ts` | Centraliser les donnees des 6 services et les types ServiceKey/Service |
| Modifier | `app/(site)/reparations/ServicesGrid.tsx` | Importer depuis lib/data/services.ts au lieu des donnees inline |

### Anti-patterns a EVITER

- **NE PAS utiliser de librairie d'animation** : les animations sont CSS keyframes pures
- **NE PAS rendre le SVG responsive en changeant viewBox** : le viewBox 600x380 est fixe, le SVG est `w-full h-auto` donc il s'adapte naturellement
- **NE PAS ajouter de `<foreignObject>` dans le SVG** : les labels flottants sont en HTML absolu au-dessus du SVG, pas dedans
- **NE PAS supprimer les hit areas transparents** : ils agrandissent la zone cliquable de chaque hotspot
- **NE PAS ignorer l'accessibilite clavier** : c'est un NFR critique (NFR19)

### Project Structure Notes

```
app/(site)/reparations/
  page.tsx                  ← Page principale reparations (Server Component)
  BikeInteractiveSvg.tsx    ← SVG velo avec hotspots (Server Component)
  BlueprintBg.tsx           ← Background technique blueprint (Client Component)
  ServicesGrid.tsx           ← Conteneur SVG + carrousel (Client Component)
  WhyUsGrid.tsx             ← Section avantages (Client Component)

lib/data/
  services.ts               ← A CREER : types et donnees des 6 services
```

### Code Patterns a Suivre

**Animation pulse des hotspots :**
```css
@keyframes zonePulse {
  0% { r: 8; opacity: 0.5; }
  100% { r: 22; opacity: 0; }
}
```

**Courbe de transition signature :**
```css
transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
```

**Breakpoint mobile/desktop :**
```ts
const check = () => setIsMobile(window.innerWidth <= 960);
```

### Dependances

- **Story 1.5** (SHOULD) : centralise les donnees dans lib/data/ (cree le dossier)
- **Story 3.4** (relation) : le carrousel services est gere dans le meme composant ServicesGrid

### References

- FR14 : SVG velo interactif avec hotspots cliquables
- FR15 : Carrousel horizontal mobile (fallback SVG)
- NFR19 : Accessibilite clavier (Tab + Enter) pour les hotspots SVG
- NFR18 : prefers-reduced-motion desactive les animations
- Couleur terracotta : #C4622D
- Couleur anthracite : #1C1C1E

## Dev Agent Record

### Agent Model Used
(a remplir par le dev agent)

### Debug Log References
(a remplir par le dev agent)

### Completion Notes List
(a remplir par le dev agent)

### File List
(a remplir par le dev agent)
