# Story 3.4: Carrousel services et grille tarifaire

Status: ready-for-dev

## Story

As a visiteur,
I want naviguer entre les 6 services de reparation et consulter les tarifs indicatifs,
So that je puisse estimer le cout avant de prendre rendez-vous.

## Acceptance Criteria

1. **Given** le visiteur est sur /reparations en desktop (FR15)
   **When** il interagit avec le carrousel vertical (a droite du SVG velo)
   **Then** le detail du service selectionne s'affiche avec titre, tagline, description et tarif indicatif

2. **Given** le visiteur est sur /reparations en desktop
   **When** il scrolle avec la molette dans le carrousel OU clique sur les fleches haut/bas
   **Then** la navigation entre services est fluide (transition CSS cubic-bezier, translateY sur le track)

3. **Given** le visiteur est sur /reparations en mobile (largeur <= 960px)
   **When** il swipe horizontalement le carrousel
   **Then** le carrousel deplace les cartes horizontalement (scroll snap, snap-center)

4. **Given** le visiteur est sur /reparations
   **When** il utilise les fleches du clavier (ArrowDown/ArrowRight pour avancer, ArrowUp/ArrowLeft pour reculer)
   **Then** la navigation entre services fonctionne au clavier

5. **Given** le visiteur scrolle vers la section "Tarifs indicatifs" (FR16)
   **When** la section entre dans le viewport
   **Then** une grille tarifaire indicative s'affiche avec les 14 prestations et leurs tarifs dans un tableau HTML semantique

6. **Given** les donnees des services et tarifs
   **When** je verifie leur source
   **Then** les services proviennent de `lib/data/services.ts` et les tarifs de `lib/data/pricing.ts`

7. **Given** le carrousel affiche un service actif
   **When** le visiteur observe la carte active vs les cartes voisines
   **Then** la carte active a : opacite 100%, scale 1, fond terracotta/4%, barre laterale terracotta visible (scale-y 100%); les voisines : opacite 55%, blur legers, scale reduit, barre laterale invisible

## Tasks / Subtasks

- [ ] Task 1 -- Extraire les donnees services vers lib/data/services.ts (AC: #6)
  - [ ] Creer `lib/data/services.ts` (si pas deja fait dans Story 3.3)
  - [ ] Deplacer le tableau `services` de ServicesGrid.tsx (lignes 17-72) vers ce fichier
  - [ ] Exporter le type `ServiceKey` et le type `Service`
  - [ ] Exporter le tableau `services: Service[]`
  - [ ] Mettre a jour l'import dans ServicesGrid.tsx : `import { services, type ServiceKey } from "@/lib/data/services"`

- [ ] Task 2 -- Extraire les donnees tarifs vers lib/data/pricing.ts (AC: #6)
  - [ ] Creer `lib/data/pricing.ts`
  - [ ] Deplacer le tableau `pricingData` de `app/(site)/reparations/page.tsx` (lignes 17-32) vers ce fichier
  - [ ] Type : `PricingRow = { service: string; tarif: string }`
  - [ ] Export : `pricingData: PricingRow[]`
  - [ ] Mettre a jour l'import dans page.tsx : `import { pricingData } from "@/lib/data/pricing"`

- [ ] Task 3 -- Verifier le carrousel vertical desktop (AC: #1, #2, #7)
  - [ ] Le carrousel est deja implemente dans ServicesGrid.tsx (lignes 237-376)
  - [ ] Le track utilise `translateY` pour positionner la carte active au centre (lignes 106-118)
  - [ ] Les cartes utilisent des classes conditionnelles pour l'etat actif/voisin/distant (lignes 319-325)
  - [ ] La transition est `duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]`
  - [ ] Fleches haut/bas (lignes 251-284) : masquees quand au premier/dernier element
  - [ ] Fade masks en haut et bas du conteneur (lignes 247-248) : gradient de cream vers transparent
  - [ ] VERIFIER que le conteneur a `lg:h-[520px] lg:overflow-hidden` pour le clipping

- [ ] Task 4 -- Verifier le carrousel horizontal mobile (AC: #3)
  - [ ] Le track a `flex lg:block` : en mobile les cartes sont en ligne
  - [ ] `overflow-x-auto` + `snap-x snap-mandatory` + `snap-center` sur chaque carte
  - [ ] `scrollbar-none` + `scrollbarWidth: "none"` pour masquer la scrollbar
  - [ ] Chaque carte a `flex-[0_0_280px] lg:flex-none` : largeur fixe 280px en mobile
  - [ ] Le `scrollIntoView` est declenche par `useEffect` quand `activeIndex` change en mobile (lignes 122-125)

- [ ] Task 5 -- Verifier la navigation clavier (AC: #4)
  - [ ] Le handler global `keydown` est deja implemente (lignes 128-141)
  - [ ] ArrowDown/ArrowRight : avance, ArrowUp/ArrowLeft : recule
  - [ ] `e.preventDefault()` empeche le scroll natif
  - [ ] ATTENTION : le handler est global (window.addEventListener) -- il intercepte les fleches partout sur la page
  - [ ] AMELIORATION POSSIBLE : limiter le handler a quand la section est en focus/visible (optionnel pour cette story)

- [ ] Task 6 -- Verifier la molette dans le carrousel (AC: #2)
  - [ ] Le handler `onWheel` est sur le conteneur carousel (lignes 144-153)
  - [ ] Seuil de 20px de deltaY pour eviter les faux positifs
  - [ ] Desactive en mobile (`if (isMobile) return`)
  - [ ] `e.preventDefault()` empeche le scroll natif du conteneur

- [ ] Task 7 -- Verifier la grille tarifaire (AC: #5)
  - [ ] La table HTML est dans page.tsx (lignes 111-148)
  - [ ] Table semantique : `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
  - [ ] Colonnes : "Prestation" (gauche) et "Tarif indicatif" (droite, aligne a droite)
  - [ ] Alternance de fond : `i % 2 === 0 ? "bg-anthracite/[0.02]" : ""`
  - [ ] Note en bas : "Les tarifs sont donnes a titre indicatif..."
  - [ ] La section a un fond `bg-ivory` et est separee visuellement du carrousel

- [ ] Task 8 -- Verifier le build (AC: toutes)
  - [ ] Lancer `npm run build`
  - [ ] Verifier que la page /reparations est SSG
  - [ ] Verifier zero erreur TypeScript apres les migrations de donnees

## Dev Notes

### Architecture Critique

**ServicesGrid.tsx est un Client Component complexe (380 lignes).**
- "use client" en haut du fichier
- Gere tout l'etat interactif : activeIndex, isMobile, refs pour scroll
- Importe et utilise BikeInteractiveSvg, BlueprintBg, SectionTitle, useReveal
- Le composant gere a la fois le SVG interactif ET le carrousel -- ils sont couples par l'etat `activeIndex`

**Le carrousel desktop et mobile sont le MEME composant.**
- Le track `<div ref={trackRef}>` change de layout via `flex lg:block`
- Desktop : block layout, translateY pour positionner, overflow hidden, h-520px
- Mobile : flex layout, scroll horizontal natif, snap-x, scroll-snap-align center
- Les cartes ont des tailles differentes : `flex-[0_0_280px] lg:flex-none`

**Les cartes service ont une structure riche.**
- Numero en watermark (filigrane) : `01`, `02`, etc. en font-syne font-800 text-[3.5rem] opacite 4-6%
- Barre laterale gauche : pseudo-element `before:` avec scale-y conditionnelle
- Description qui s'expande/collapse en desktop : `lg:max-h-[200px]` vs `lg:max-h-0`
- Badge tarif : pill avec couleur conditionnelle (terracotta actif, anthracite inactif)

**La grille tarifaire est dans page.tsx, pas dans ServicesGrid.**
- C'est une section separee dans le Server Component page.tsx
- Elle utilise SectionTitle avec tag="Tarifs indicatifs"
- Les donnees pricingData sont inline (a extraire vers lib/data/pricing.ts)

### Composants Existants a Reutiliser

| Composant | Chemin | Role |
|-----------|--------|------|
| ServicesGrid | `app/(site)/reparations/ServicesGrid.tsx` | Carrousel + SVG (Client Component) |
| BikeInteractiveSvg | `app/(site)/reparations/BikeInteractiveSvg.tsx` | SVG velo |
| BlueprintBg | `app/(site)/reparations/BlueprintBg.tsx` | Background technique (Client Component) |
| SectionTitle | `@/components/ui/SectionTitle.tsx` | Titre de section |
| useReveal | `@/components/ui/useReveal.ts` | Hook IntersectionObserver |

### Fichiers a Creer/Modifier

| Action | Fichier | Raison |
|--------|---------|--------|
| Creer | `lib/data/services.ts` | Types ServiceKey, Service + tableau des 6 services |
| Creer | `lib/data/pricing.ts` | Type PricingRow + tableau des 14 tarifs |
| Modifier | `app/(site)/reparations/ServicesGrid.tsx` | Importer services depuis lib/data/services.ts |
| Modifier | `app/(site)/reparations/page.tsx` | Importer pricingData depuis lib/data/pricing.ts |

### Anti-patterns a EVITER

- **NE PAS separer le SVG et le carrousel en deux composants independants** : ils partagent l'etat activeIndex et DOIVENT rester synchronises
- **NE PAS utiliser de librairie de carrousel** (Swiper, Embla, etc.) : le carrousel est CSS natif (scroll-snap + translateY)
- **NE PAS supprimer les fade masks** : elles masquent le debordement haut/bas du carrousel desktop
- **NE PAS modifier le seuil onWheel de 20px** : c'est le bon seuil pour eviter les faux positifs sur trackpad
- **NE PAS changer la courbe cubic-bezier** : `0.22, 1, 0.36, 1` est la courbe signature du projet

### Project Structure Notes

```
app/(site)/reparations/
  page.tsx                  ← Page principale (Server Component) : Hero + ServicesGrid + Tarifs + WhyUsGrid + CTA
  ServicesGrid.tsx           ← SVG + Carrousel (Client Component, 380 lignes)
  BikeInteractiveSvg.tsx    ← SVG velo interactif (Server Component)
  BlueprintBg.tsx           ← Background technique (Client Component)
  WhyUsGrid.tsx             ← Section avantages (Client Component)

lib/data/
  services.ts               ← A CREER : ServiceKey, Service, services[]
  pricing.ts                ← A CREER : PricingRow, pricingData[]
```

### Donnees des 6 services (a extraire)

```typescript
export type ServiceKey = "revision" | "freinage" | "transmission" | "roues" | "electrique" | "urgences";

export type Service = {
  key: ServiceKey;
  title: string;
  tagline: string;
  description: string;
  tarif: string;
};

export const services: Service[] = [
  { key: "revision", title: "Revision complete", tagline: "Un point sur tout.", description: "...", tarif: "85 - 120 EUR" },
  { key: "freinage", title: "Freinage", tagline: "Quand ca ne mord plus assez.", description: "...", tarif: "15 - 45 EUR" },
  { key: "transmission", title: "Transmission", tagline: "Quand ca grince, saute ou deraille.", description: "...", tarif: "20 - 80 EUR" },
  { key: "roues", title: "Roues & pneus", tagline: "Crevaison, voile, jante.", description: "...", tarif: "10 - 35 EUR" },
  { key: "electrique", title: "Electrique", tagline: "La specialite BOSCH.", description: "...", tarif: "Devis apres diagnostic" },
  { key: "urgences", title: "Urgences", tagline: "Quand vous avez besoin de rouler vite.", description: "...", tarif: "Selon intervention" },
];
```

### Dependances

- **Story 1.5** (SHOULD) : cree le dossier lib/data/ pour la centralisation
- **Story 3.3** (MUST) : le SVG interactif et le carrousel sont dans le meme composant -- les deux stories se chevauchent sur ServicesGrid.tsx

### References

- FR15 : Carrousel services desktop vertical / mobile horizontal
- FR16 : Grille tarifaire indicative
- NFR7 : SSG
- NFR9 : Animations throttlees via rAF
- Courbe signature : cubic-bezier(0.22, 1, 0.36, 1)
- Palette : anthracite #1C1C1E, terracotta #C4622D, cream #FAFAF7, ivory #F5F0E8

## Dev Agent Record

### Agent Model Used
(a remplir par le dev agent)

### Debug Log References
(a remplir par le dev agent)

### Completion Notes List
(a remplir par le dev agent)

### File List
(a remplir par le dev agent)
