# Story 6.1: Audit et corrections accessibilite WCAG 2.1 AA

Status: ready-for-dev

## Story
As a visiteur en situation de handicap,
I want un site pleinement accessible au clavier, avec contrastes suffisants, structure semantique correcte,
So that je puisse naviguer et acceder a toutes les informations sans obstacle.

## Acceptance Criteria

1. **Given** un utilisateur naviguant au clavier, **When** il utilise Tab/Shift+Tab, **Then** tous les elements interactifs (liens, boutons, inputs, select, dropdown) recoivent le focus dans un ordre logique et aucun element n'est saute.

2. **Given** un element focusable, **When** il recoit le focus, **Then** un outline/ring visible apparait (minimum 2px, contraste suffisant avec le fond) — jamais `outline: none` sans remplacement.

3. **Given** le dropdown "Nos Velos" dans la Navbar (desktop), **When** l'utilisateur appuie sur Escape, **Then** le dropdown se ferme et le focus revient sur le bouton/lien parent.

4. **Given** le menu mobile hamburger ouvert, **When** l'utilisateur appuie sur Escape, **Then** le menu se ferme et le focus revient sur le bouton hamburger.

5. **Given** tout texte sur le site, **When** on mesure le ratio de contraste, **Then** le contraste est >= 4.5:1 pour le texte normal et >= 3:1 pour le texte large (>= 18pt ou >= 14pt bold).

6. **Given** une image decorative (grille hero, background parallax, etc.), **When** on inspecte le HTML, **Then** elle a `alt=""` ou `role="presentation"`.

7. **Given** une image informative (photo equipe, photo boutique, icone fonctionnelle), **When** on inspecte le HTML, **Then** elle a un `alt` descriptif en francais.

8. **Given** chaque page du site, **When** on analyse la hierarchie de titres, **Then** il y a exactement un `h1`, et les niveaux suivent h1 > h2 > h3 sans saut (pas de h1 puis h3).

9. **Given** un utilisateur avec `prefers-reduced-motion: reduce`, **When** il visite le site, **Then** toutes les animations CSS (reveal, parallax, fade) sont desactivees ou reduites a des transitions instantanees.

10. **Given** le formulaire de contact, **When** on inspecte le HTML, **Then** chaque input a un `<label>` associe via `htmlFor`/`id`, les erreurs ont `role="alert"` ou `aria-live="polite"`, et les champs obligatoires ont `aria-required="true"`.

11. **Given** les SVG interactifs (BikeInteractiveSvg hotspots), **When** on inspecte le HTML, **Then** chaque zone cliquable a `role="button"`, `aria-label` descriptif, et `tabIndex={0}` + gestion `onKeyDown` Enter/Space.

12. **Given** l'attribut `lang` de la page, **When** on inspecte `<html>`, **Then** il contient `lang="fr"` (deja present dans `app/layout.tsx`).

## Tasks / Subtasks

- [ ] Task 1 — Audit initial automatise avec axe-core et Lighthouse (AC: #1-#12)
  - [ ] Installer `@axe-core/react` en devDependency pour l'audit dev
  - [ ] Lancer Lighthouse Accessibility sur chaque page et noter les scores
  - [ ] Documenter toutes les violations dans un fichier de suivi temporaire
  - [ ] Verifier le contraste de chaque combinaison texte/fond du design system

- [ ] Task 2 — Focus visible global et styles outline (AC: #2)
  - [ ] Ajouter dans `app/globals.css` un style global de focus visible :
    ```css
    :focus-visible {
      outline: 2px solid var(--color-terracotta);
      outline-offset: 2px;
    }
    ```
  - [ ] Verifier que le focus ring est visible sur fond anthracite (hero), fond cream, fond ivory
  - [ ] Supprimer tout `outline-none` qui n'est pas remplace par un style focus custom
  - [ ] Pour les inputs du formulaire (`ContactForm.tsx`), remplacer `outline-none` par un style `focus-visible:ring-2 focus-visible:ring-terracotta`

- [ ] Task 3 — Navigation clavier Navbar + Dropdown (AC: #1, #3, #4)
  - [ ] Dans `components/layout/Navbar.tsx`, ajouter gestion clavier au dropdown "Nos Velos" :
    - `onKeyDown` sur le lien parent : Enter/Space ouvre le dropdown
    - Fleches Haut/Bas naviguent dans les items du dropdown
    - Escape ferme le dropdown et remet le focus sur le parent
    - `aria-expanded`, `aria-haspopup="true"` sur le lien parent
    - `role="menu"` sur le container dropdown, `role="menuitem"` sur chaque lien enfant
  - [ ] Ajouter gestion Escape au menu mobile :
    - `onKeyDown` Escape sur le container mobile ferme le menu
    - Le focus revient sur le bouton hamburger
    - Ajouter `aria-expanded={mobileOpen}` sur le bouton hamburger
    - Ajouter `aria-controls="mobile-menu"` et `id="mobile-menu"` sur le container
  - [ ] Verifier que le bouton hamburger a deja `aria-label="Menu"` (OK, present)

- [ ] Task 4 — Contrastes couleurs (AC: #5)
  - [ ] Verifier et corriger les combinaisons problematiques :
    - `text-anthracite/50` sur `bg-cream` : ratio ~ 3.2:1 — INSUFFISANT pour texte normal
    - `text-anthracite/70` sur `bg-cream` : ratio ~ 5.2:1 — OK
    - `text-white/45` sur `bg-anthracite` : ratio ~ 2.8:1 — INSUFFISANT
    - `text-white/50` sur `bg-anthracite` : ratio ~ 3.1:1 — INSUFFISANT pour texte normal
    - `text-white/30` sur `bg-anthracite` : ratio ~ 1.9:1 — INSUFFISANT
    - `text-anthracite/30` (placeholder) : exempte si identifie comme placeholder
    - `text-anthracite/40` (sous-liens mobile) : ratio ~ 2.5:1 — INSUFFISANT
    - `text-anthracite/60` sur `bg-cream` : ratio ~ 4.3:1 — LIMITE, augmenter a /70
    - `bg-terracotta` (#C4622D) sur `bg-cream` (#FAFAF7) : ratio ~ 3.5:1 — OK pour large text
  - [ ] Augmenter les opacites insuffisantes :
    - Liens Navbar desktop : `text-anthracite/50` -> `text-anthracite/65` minimum
    - Hero subtitle `text-white/45` -> `text-white/70` minimum
    - Hero `text-white/30` -> `text-white/60` minimum
    - Hero badge `text-white/50` -> `text-white/70` minimum
    - Sous-liens mobile `text-anthracite/40` -> `text-anthracite/65`
    - Horaires `text-anthracite/60` -> `text-anthracite/70`
  - [ ] Re-verifier chaque correction avec un outil (WebAIM Contrast Checker)

- [ ] Task 5 — Images : alt textes (AC: #6, #7)
  - [ ] Auditer toutes les balises `<img>`, `<Image>`, et `<svg>` decoratives :
    - Grille hero background : `alt=""` ou `aria-hidden="true"`
    - Background parallax textes (CYCLES, COLOMBES) : `aria-hidden="true"` + `select-none` (deja present)
    - BikeWheel SVG decoratif : `aria-hidden="true"`
  - [ ] Auditer toutes les images informatives :
    - Photos equipe (Team.tsx) : `alt="David Thibault, gerant de Colombes Cycles"`
    - Photos boutique (Boutique.tsx) : alt descriptif
    - Logos marques (si presentes) : `alt="Logo Orbea"` etc.
  - [ ] Verifier `next/image` : s'assurer que `alt` est obligatoire (TypeScript le force deja)

- [ ] Task 6 — Hierarchie des titres h1-h6 (AC: #8)
  - [ ] Auditer chaque page :
    - `page.tsx` (accueil) : h1 dans Hero, verifier pas de doublon
    - `nos-velos/page.tsx` : h1 via PageHero, sous-titres h2
    - `reparations/page.tsx` : h1 via PageHero, sections h2, sous-sections h3
    - `a-propos/page.tsx` : h1 via PageHero
    - `contact/page.tsx` : h1 via PageHero, sections h3 -> corriger en h2
    - `blog/page.tsx` : h1 via PageHero
    - `mentions-legales/page.tsx` : h1 via PageHero, sections h2
  - [ ] Dans `contact/page.tsx` : les `h3` ("Appelez-nous", "Nos horaires", "Passez nous voir") devraient etre `h2` (pas de h2 intermediaire = saut de niveau)
  - [ ] Verifier `PageHero` contient bien un `h1`
  - [ ] S'assurer que Hero.tsx (accueil) a un seul h1

- [ ] Task 7 — prefers-reduced-motion (AC: #9)
  - [ ] Ajouter dans `app/globals.css` :
    ```css
    @media (prefers-reduced-motion: reduce) {
      .reveal, .reveal-left, .reveal-right, .reveal-scale {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .line-grow {
        transform: scaleX(1) !important;
        transition: none !important;
      }
    }
    ```
  - [ ] Dans `components/ui/useParallax.ts` : detecter `prefers-reduced-motion` et skip le parallax
    ```ts
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    ```
  - [ ] Dans `components/home/Hero.tsx` : meme detection pour le parallax hero
  - [ ] Verifier que le swipe Tinder (Team, Reviews) reste fonctionnel (interaction, pas animation) en reduced-motion
  - [ ] Verifier la BikeWheel : desactiver la rotation en reduced-motion

- [ ] Task 8 — Formulaire ContactForm accessibilite (AC: #10)
  - [ ] Ajouter `aria-required="true"` sur les champs obligatoires (nom, email, type, message)
  - [ ] Ajouter `role="alert"` sur les paragraphes d'erreur (`<p className="mt-1 text-[0.75rem] text-red-600">`)
  - [ ] Ajouter `aria-describedby` sur chaque input pointant vers son message d'erreur (avec `id` unique)
  - [ ] Ajouter `aria-invalid="true"` sur les champs en erreur
  - [ ] Verifier que le `<select>` a bien un label associe (OK, `htmlFor="type"`)

- [ ] Task 9 — SVG interactifs BikeInteractiveSvg (AC: #11)
  - [ ] Verifier que chaque hotspot cliquable a :
    - `role="button"`
    - `aria-label="Voir le service : [nom du service]"`
    - `tabIndex={0}`
    - `onKeyDown` qui reagit a Enter et Space
  - [ ] Ajouter `aria-label` descriptif sur le SVG global si decoratif/interactif

- [ ] Task 10 — Tests finaux et validation (AC: #1-#12)
  - [ ] Relancer Lighthouse Accessibility : cible >= 95
  - [ ] Tester manuellement navigation clavier complete (Tab through toutes les pages)
  - [ ] Tester avec un lecteur d'ecran (NVDA ou VoiceOver) sur la page d'accueil
  - [ ] Verifier `lang="fr"` (deja OK dans `app/layout.tsx` ligne 50)

## Dev Notes

### Architecture Critique
- Le site utilise Next.js 16 App Router avec SSG. Toutes les corrections sont cote client (composants) ou CSS.
- Les hooks custom `useReveal` et `useParallax` sont les points d'entree principaux pour le `prefers-reduced-motion`.
- Le formulaire `ContactForm.tsx` est un composant client ("use client") avec validation cote client.
- La Navbar est un composant client avec gestion d'etat pour dropdown et menu mobile.

### Fichiers a Creer/Modifier
| Fichier | Action |
|---|---|
| `app/globals.css` | Ajouter `:focus-visible` global + `prefers-reduced-motion` |
| `components/layout/Navbar.tsx` | Ajouter gestion clavier dropdown + Escape mobile + ARIA |
| `components/contact/ContactForm.tsx` | Ajouter `aria-required`, `aria-invalid`, `aria-describedby`, `role="alert"` |
| `components/ui/useParallax.ts` | Ajouter detection `prefers-reduced-motion` |
| `components/home/Hero.tsx` | Ajouter detection `prefers-reduced-motion` pour parallax |
| `components/ui/BikeWheel.tsx` | Ajouter `aria-hidden="true"` si decoratif, reduced-motion |
| `app/(site)/contact/page.tsx` | Corriger h3 -> h2 pour hierarchie |
| `app/(site)/reparations/BikeInteractiveSvg.tsx` | Ajouter ARIA + keyboard sur hotspots |
| Tous les composants avec images | Auditer et corriger alt textes |
| Tous les composants avec opacite texte | Corriger contrastes insuffisants |

### Anti-patterns a EVITER
- **NE PAS** utiliser `outline: none` sans fournir un style de focus alternatif visible
- **NE PAS** ajouter `tabIndex` sur des elements non-interactifs (div, span) sauf si necessaire
- **NE PAS** mettre `role="button"` sur un `<a>` ou `<button>` (redondant)
- **NE PAS** cacher les elements au lecteur d'ecran avec `aria-hidden="true"` s'ils contiennent du contenu informatif
- **NE PAS** utiliser `!important` sauf pour les overrides `prefers-reduced-motion`
- **NE PAS** supprimer les animations pour reduced-motion sur les interactions (swipe Tinder doit rester fonctionnel)

### Project Structure Notes
```
app/
  layout.tsx                 # lang="fr", fonts Syne+Inter
  globals.css                # Design tokens, animations reveal
  (site)/
    page.tsx                 # Accueil (Hero, TrustBand, Services, etc.)
    contact/page.tsx         # h3 a corriger en h2
    mentions-legales/page.tsx
    reparations/
      BikeInteractiveSvg.tsx # SVG hotspots a rendre accessible
    ...
components/
  layout/
    Navbar.tsx               # Dropdown + mobile menu a rendre accessible clavier
  contact/
    ContactForm.tsx          # Formulaire a enrichir ARIA
  ui/
    useReveal.ts             # Hook reveal (IntersectionObserver)
    useParallax.ts           # Hook parallax (rAF) — ajouter reduced-motion
    BikeWheel.tsx            # SVG decoratif
    PageHero.tsx             # Contient probablement le h1 des sous-pages
  home/
    Hero.tsx                 # h1 accueil + parallax propre — ajouter reduced-motion
    Team.tsx                 # Swipe Tinder — verifier reduced-motion
    Reviews.tsx              # Swipe Tinder — verifier reduced-motion
```

### References
- WCAG 2.1 AA : https://www.w3.org/WAI/WCAG21/quickref/?levels=aaa
- WebAIM Contrast Checker : https://webaim.org/resources/contrastchecker/
- axe-core : https://github.com/dequelabs/axe-core
- MDN prefers-reduced-motion : https://developer.mozilla.org/fr/docs/Web/CSS/@media/prefers-reduced-motion
- ARIA Authoring Practices (menu) : https://www.w3.org/WAI/ARIA/apg/patterns/menubar/

### Combinaisons de contraste a valider
| Texte | Fond | Ratio estime | Verdict |
|---|---|---|---|
| `#1C1C1E` (anthracite) | `#FAFAF7` (cream) | ~17.5:1 | OK |
| `#1C1C1E` @ 50% opacity | `#FAFAF7` | ~3.2:1 | ECHEC (normal) |
| `#1C1C1E` @ 70% opacity | `#FAFAF7` | ~5.2:1 | OK |
| `#FFFFFF` @ 45% opacity | `#1C1C1E` | ~2.8:1 | ECHEC |
| `#FFFFFF` @ 70% opacity | `#1C1C1E` | ~7.5:1 | OK |
| `#C4622D` (terracotta) | `#FAFAF7` (cream) | ~3.5:1 | OK large only |
| `#C4622D` (terracotta) | `#1C1C1E` (anthracite) | ~3.1:1 | OK large only |
| `#FFFFFF` | `#C4622D` (terracotta btn) | ~3.8:1 | OK large (btn text is bold) |

## Dev Agent Record
### Agent Model Used
(a remplir par l'agent de dev)
### Debug Log References
(a remplir)
### Completion Notes List
(a remplir)
### File List
(a remplir apres implementation)
