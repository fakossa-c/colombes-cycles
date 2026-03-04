# Story 3.5: Section avantages atelier "Pourquoi nous confier votre velo"

Status: ready-for-dev

## Story

As a visiteur,
I want lire les arguments convaincants de l'atelier,
So that je sois convaincu de confier mon velo a Colombes Cycles plutot qu'a un concurrent.

## Acceptance Criteria

1. **Given** le visiteur est sur /reparations (FR18)
   **When** la section "Pourquoi nous confier votre velo" entre dans le viewport
   **Then** 5 avantages s'affichent en grille (md:grid-cols-2 lg:grid-cols-3) avec icones SVG et descriptions

2. **Given** la section entre dans le viewport
   **When** les avantages apparaissent
   **Then** ils s'affichent en reveal stagger (reveal stagger-1 a stagger-5, decalage progressif)

3. **Given** les 5 avantages sont affiches
   **When** je verifie leur contenu
   **Then** les 5 avantages sont :
   - "On diagnostique avant de facturer" (icone loupe)
   - "On ne remplace pas ce qui n'est pas use" (icone check cercle)
   - "On travaille sur toutes les marques" (icone outil/cle)
   - "On est certifies BOSCH" (icone eclair)
   - "On explique ce qu'on a fait" (icone bulle discussion)

4. **Given** les donnees des avantages
   **When** je verifie leur source
   **Then** elles proviennent de `lib/data/advantages.ts` (pas inline dans le composant)

5. **Given** le composant WhyUsGrid
   **When** je verifie son implementation
   **Then** il est alimente par les donnees centralisees importees depuis lib/data/advantages.ts

6. **Given** la section avantages
   **When** le visiteur a active `prefers-reduced-motion: reduce`
   **Then** les animations reveal stagger sont desactivees (les elements apparaissent immediatement)

## Tasks / Subtasks

- [ ] Task 1 -- Creer lib/data/advantages.ts avec les donnees centralisees (AC: #4)
  - [ ] Creer le fichier `lib/data/advantages.ts`
  - [ ] Definir le type :
    ```typescript
    export type Advantage = {
      title: string;
      description: string;
      iconPath: string; // SVG path d="" pour le composant icone
    };
    ```
  - [ ] Exporter le tableau `advantages: Advantage[]` avec les 5 avantages
  - [ ] IMPORTANT : les icones SVG actuelles sont des composants JSX inline dans WhyUsGrid.tsx (lignes 12-56). Deux approches :
    - OPTION A : extraire uniquement les `d=""` paths dans les donnees, reconstruire le SVG dans le composant
    - OPTION B : garder les icones JSX inline dans le composant et n'extraire que title+description dans les donnees
    - RECOMMANDATION : Option A pour une vraie centralisation

- [ ] Task 2 -- Refactorer WhyUsGrid.tsx pour utiliser les donnees centralisees (AC: #5)
  - [ ] Importer `advantages` depuis `@/lib/data/advantages`
  - [ ] Remplacer le tableau `reasons` inline (lignes 6-57) par les donnees importees
  - [ ] Adapter le rendu pour utiliser le type Advantage :
    ```tsx
    {advantages.map((advantage, i) => (
      <div key={advantage.title} className={`reveal stagger-${Math.min(i + 1, 5)} flex gap-4`}>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={advantage.iconPath} />
          </svg>
        </div>
        <div>
          <h3 className="font-syne font-700 text-[1rem] text-anthracite mb-2">{advantage.title}</h3>
          <p className="text-anthracite/60 text-[0.875rem] leading-relaxed">{advantage.description}</p>
        </div>
      </div>
    ))}
    ```
  - [ ] NOTE : Si une icone a plusieurs `<path>`, le type devra etre `iconPaths: string[]` au lieu de `iconPath: string`

- [ ] Task 3 -- Verifier le reveal stagger (AC: #2)
  - [ ] WhyUsGrid.tsx utilise deja `useReveal(0.1)` (ligne 60)
  - [ ] Le ref est applique a la `<section>` (ligne 63)
  - [ ] Chaque avantage a `reveal stagger-${Math.min(i + 1, 5)}`
  - [ ] Le `Math.min(i + 1, 5)` cap a stagger-5 (les stagger CSS sont definis jusqu'a 5)
  - [ ] VERIFIER que les classes CSS `stagger-1` a `stagger-5` sont definies dans globals.css avec des delais progressifs

- [ ] Task 4 -- Verifier prefers-reduced-motion (AC: #6)
  - [ ] Les animations reveal sont definies en CSS (translate + opacity)
  - [ ] VERIFIER dans globals.css que la media query `@media (prefers-reduced-motion: reduce)` desactive les transitions des classes `.reveal`, `.reveal-left`, etc.
  - [ ] Si absent, ajouter :
    ```css
    @media (prefers-reduced-motion: reduce) {
      .reveal, .reveal-left, .reveal-right, .reveal-scale {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
    }
    ```

- [ ] Task 5 -- Verifier la grille responsive (AC: #1)
  - [ ] La grille actuelle : `grid md:grid-cols-2 lg:grid-cols-3 gap-8`
  - [ ] 5 avantages en grille 3 colonnes : 3 en premiere ligne, 2 en deuxieme
  - [ ] Chaque avantage : flex avec icone ronde a gauche (w-10 h-10 bg-terracotta/10) et texte a droite
  - [ ] Le fond de la section est `bg-cream` (#FAFAF7)

- [ ] Task 6 -- Verifier le build (AC: toutes)
  - [ ] Lancer `npm run build`
  - [ ] Verifier que WhyUsGrid compile sans erreur apres le refactoring
  - [ ] Verifier visuellement que les 5 avantages s'affichent correctement

## Dev Notes

### Architecture Critique

**WhyUsGrid.tsx est un Client Component.**
- `"use client"` en haut du fichier
- Utilise `useReveal(0.1)` pour observer l'intersection
- Importe `SectionTitle` (Server Component utilise dans un Client Component -- autorise)

**Les icones SVG sont actuellement des composants JSX inline.**
- Chaque icone est un `<svg>` complet avec `viewBox="0 0 24 24"`, `stroke="currentColor"`, etc.
- Les icones utilisent Heroicons 24x24 outline style
- Certaines icones ont des paths complexes (multi-segments) qui sont des strings `d=""` longues
- ATTENTION : l'icone "On travaille sur toutes les marques" (outil/cle) a un path tres long -- verifier que l'extraction du path fonctionne

**Les 5 avantages existants et leurs paths SVG :**

1. "On diagnostique avant de facturer" -- path loupe :
   `M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z`

2. "On ne remplace pas ce qui n'est pas use" -- path check cercle :
   `M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z`

3. "On travaille sur toutes les marques" -- path outil/cle :
   `M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085`

4. "On est certifies BOSCH" -- path eclair :
   `M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z`

5. "On explique ce qu'on a fait" -- path bulle discussion :
   `M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z`

### Composants Existants a Reutiliser

| Composant | Chemin | Role |
|-----------|--------|------|
| WhyUsGrid | `app/(site)/reparations/WhyUsGrid.tsx` | Grille avantages (Client Component) -- A REFACTORER |
| SectionTitle | `@/components/ui/SectionTitle.tsx` | Titre de section avec tag |
| useReveal | `@/components/ui/useReveal.ts` | Hook IntersectionObserver |

### Fichiers a Creer/Modifier

| Action | Fichier | Raison |
|--------|---------|--------|
| Creer | `lib/data/advantages.ts` | Type Advantage + tableau des 5 avantages avec icon paths |
| Modifier | `app/(site)/reparations/WhyUsGrid.tsx` | Importer depuis lib/data/advantages.ts, supprimer donnees inline |

### Anti-patterns a EVITER

- **NE PAS importer d'icones depuis une librairie externe** (react-icons, @heroicons/react) : les icones sont des SVG inline pour garder le bundle leger
- **NE PAS changer le nombre d'avantages** : 5 avantages est le choix editorial -- 3 en premiere rangee, 2 en deuxieme
- **NE PAS supprimer `"use client"`** de WhyUsGrid.tsx : le hook useReveal necessite le contexte client
- **NE PAS modifier le wording des avantages** sans validation editoriale : le ton "on" (pronom inclusif) est volontaire et fait partie de la voix de marque
- **NE PAS mettre stagger au-dela de 5** : les classes CSS stagger-N ne sont definies que jusqu'a 5

### Project Structure Notes

```
app/(site)/reparations/
  page.tsx                  ← Importe et affiche <WhyUsGrid /> entre la section tarifs et le CTA
  WhyUsGrid.tsx             ← Client Component -- grille 5 avantages

lib/data/
  advantages.ts             ← A CREER : Type Advantage + 5 avantages + icon paths
```

### Dependances

- **Story 1.5** (SHOULD) : cree le dossier lib/data/
- **Story 3.4** (relation) : la grille tarifaire est affichee juste avant cette section dans page.tsx
- Aucune dependance bloquante directe -- cette story peut etre developpee independamment

### References

- FR18 : 5 avantages atelier "Pourquoi nous confier votre velo"
- NFR18 : prefers-reduced-motion desactive les animations
- Fond section : bg-cream (#FAFAF7)
- Couleur icones : terracotta #C4622D (bg-terracotta/10 pour le cercle, text-terracotta pour l'icone)
- Typo titres avantages : font-syne font-700 text-[1rem]
- Typo descriptions : text-anthracite/60 text-[0.875rem]

## Dev Agent Record

### Agent Model Used
(a remplir par le dev agent)

### Debug Log References
(a remplir par le dev agent)

### Completion Notes List
(a remplir par le dev agent)

### File List
(a remplir par le dev agent)
