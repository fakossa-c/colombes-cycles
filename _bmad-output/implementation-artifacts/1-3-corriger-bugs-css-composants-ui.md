# Story 1.3: Corriger les bugs CSS et composants UI

Status: ready-for-dev

## Story

As a visiteur,
I want que les pages s'affichent correctement sans bugs visuels,
So that mon expérience de navigation soit fluide et professionnelle.

## Acceptance Criteria

1. **Given** la page /nos-velos/[category] a un template literal CSS casse (FR38)
   **When** je corrige le template literal
   **Then** les classes CSS dynamiques s'appliquent correctement sur les 5 pages categorie

2. **Given** le composant Button avec fleche SVG (FR40)
   **When** j'ajoute la classe `group` au parent
   **Then** l'effet hover sur la fleche SVG fonctionne correctement

3. **Given** l'animation du menu hamburger mobile (FR44)
   **When** je connecte le toggle d'animation au state mobileOpen de Navbar
   **Then** l'icone hamburger s'anime en croix et revient

## Tasks / Subtasks

- [ ] Task 1 — Corriger le template literal CSS casse dans [category]/page.tsx (AC: #1)
  - [ ] Ligne 99 : remplacer `className="reveal stagger-${index + 1}` (string literal JS non interprete dans JSX) par une interpolation correcte avec backticks : `` className={`reveal stagger-${index + 1} group rounded-sm overflow-hidden`} ``
  - [ ] Verifier que les 5 categories (velos-de-ville, velos-electriques, vtt, velos-enfants, accessoires) affichent les animations stagger correctement
  - [ ] Meme verification dans `app/(site)/nos-velos/page.tsx` ligne 44 : verifier que le template literal y est correct (celui-ci utilise deja les backticks mais confirmer)

- [ ] Task 2 — Ajouter la classe `group` au composant Button pour l'effet hover fleche (AC: #2)
  - [ ] Dans `components/ui/Button.tsx`, le SVG fleche utilise `group-hover:translate-x-1` mais le `<Link>` parent n'a PAS la classe `group`
  - [ ] Ajouter `group` a la string `base` dans la constante des classes
  - [ ] Verifier visuellement que la fleche se deplace de 4px vers la droite au hover sur tous les boutons variant="primary"

- [ ] Task 3 — Verifier l'animation hamburger mobile dans Navbar (AC: #3)
  - [ ] Inspecter `components/layout/Navbar.tsx` : l'animation est deja connectee au state `mobileOpen` via les classes conditionnelles aux lignes 96-98
  - [ ] Les classes `rotate-45 translate-y-[7px]`, `opacity-0 scale-x-0`, `-rotate-45 -translate-y-[7px]` sont deja appliquees conditionnellement
  - [ ] Tester sur mobile (ou responsive mode) que le hamburger s'anime en croix au tap et revient a l'etat normal au retap
  - [ ] Si le bug persiste, verifier que `transition-all duration-300` est bien present sur chaque `<span>`

- [ ] Task 4 — Verifier le build (AC: #1, #2, #3)
  - [ ] Lancer `npm run build`
  - [ ] Verifier qu'aucune nouvelle erreur n'est introduite
  - [ ] Tester visuellement les 3 corrections sur les pages concernees

## Dev Notes

### Architecture Critique

**Bug 1 — Template literal CSS (CRITIQUE)**

Le bug se trouve a la ligne 99 de `app/(site)/nos-velos/[category]/page.tsx` :

```tsx
// BUG ACTUEL (ligne 99) — les guillemets doubles au lieu de backticks
className="reveal stagger-${index + 1} group rounded-sm overflow-hidden"
```

Ceci produit litteralement la string `"reveal stagger-${index + 1} group rounded-sm overflow-hidden"` sans interpolation. Tailwind ne genere donc AUCUNE classe `stagger-1`, `stagger-2`, etc. Les animations stagger sont silencieusement cassees.

```tsx
// CORRECTION — utiliser backticks + accolades JSX
className={`reveal stagger-${index + 1} group rounded-sm overflow-hidden`}
```

**IMPORTANT** : Ce meme pattern est utilise correctement dans d'autres fichiers (`BlogGrid.tsx` ligne 50, `Team.tsx` ligne 229, `Reviews.tsx` ligne 205, `Services.tsx` ligne 85). Il n'y a que `[category]/page.tsx` qui a le bug.

**Tailwind CSS v4 et classes dynamiques** : Les classes `stagger-1` a `stagger-5` doivent exister dans la configuration CSS. Verifier dans `globals.css` que ces classes sont definies. Si elles sont generees dynamiquement, Tailwind ne les detectera pas au build. Solution : utiliser la directive `@safelist` ou definir les classes en CSS pur.

**Bug 2 — Classe `group` manquante sur Button**

Dans `components/ui/Button.tsx`, le SVG fleche (ligne 34) utilise `group-hover:translate-x-1`, mais le parent `<Link>` (ligne 31) ne contient pas `group` dans ses classes. La constante `base` doit inclure `group` :

```tsx
// AVANT
const base = "relative inline-flex items-center justify-center gap-2 px-7 py-4 ...";

// APRES
const base = "group relative inline-flex items-center justify-center gap-2 px-7 py-4 ...";
```

**Bug 3 — Animation hamburger**

Apres inspection, l'animation hamburger dans `Navbar.tsx` semble deja correctement implementee (lignes 96-98). Les classes conditionnelles `${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}` sont bien connectees au state. **Ce bug pourrait etre un faux positif** ou un probleme de specificite CSS. Le dev doit tester et confirmer. Si le probleme est un manque de `origin-center` sur les spans, ajouter `origin-center` aux classes de base de chaque span.

### Fichiers a Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `app/(site)/nos-velos/[category]/page.tsx` | MODIFIER | Ligne 99 : corriger template literal — remplacer guillemets par backticks |
| `components/ui/Button.tsx` | MODIFIER | Ajouter `group` a la constante `base` (ligne 17) |
| `components/layout/Navbar.tsx` | VERIFIER | Confirmer que l'animation hamburger fonctionne — corriger si necessaire |

### Anti-patterns a EVITER

- NE PAS utiliser de librairie d'animation tierce (Framer Motion, GSAP, etc.)
- NE PAS modifier la logique metier des composants — uniquement les classes CSS
- NE PAS changer les noms de classes existants (stagger-1, stagger-2, etc.) car ils sont utilises partout
- NE PAS ajouter de nouveaux fichiers — ces corrections sont purement inline
- NE PAS oublier de verifier les classes `stagger-*` dans globals.css — si elles n'y sont pas, les ajouter

### Project Structure Notes

- Les corrections sont localisees : 2 fichiers a modifier, 1 a verifier
- Pas de nouveau composant, pas de nouvelle dependance
- Le pattern `reveal stagger-${index + 1}` est un pattern recurrent du projet — la correction dans [category] aligne ce fichier avec le reste

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3]
- [Source: app/(site)/nos-velos/[category]/page.tsx#ligne 99 — template literal casse]
- [Source: components/ui/Button.tsx#ligne 17, 34 — group manquant]
- [Source: components/layout/Navbar.tsx#lignes 95-99 — animation hamburger]

## Dev Agent Record

### Agent Model Used
{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### Change Log

### File List
