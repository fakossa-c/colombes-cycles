# Story 2.1: Topbar, Navbar et Footer — navigation globale

Status: ready-for-dev

## Story

As a visiteur,
I want accéder à la navigation principale, voir le téléphone et horaires en permanence, et retrouver les infos contact en footer,
So that je puisse naviguer facilement et contacter la boutique.

## Acceptance Criteria

1. **Given** un visiteur sur n'importe quelle page, **When** il regarde la topbar, **Then** il voit le téléphone 01 42 42 66 02 cliquable en `tel:0142426602` (FR19), les horaires "Mar – Sam · 9h – 19h", et le badge "Certifié BOSCH eBike" avec icône éclair terracotta.

2. **Given** un visiteur desktop (>= 1024px), **When** il regarde la navbar, **Then** il voit les liens horizontaux (Accueil, Nos Vélos, Réparations, À propos, Contact) + bouton CTA "Prendre RDV". Le lien "Nos Vélos" affiche un dropdown au hover avec 5 catégories (Vélos de ville, Vélos électriques, VTT, Vélos enfants, Accessoires). PAS de hamburger en desktop.

3. **Given** un visiteur desktop, **When** il scroll, **Then** la navbar reste sticky en haut (top-0, z-50) avec backdrop-blur.

4. **Given** un visiteur mobile (< 1024px), **When** il clique sur le hamburger, **Then** un menu plein écran s'ouvre avec animation fluide (transition translateX). Le menu contient tous les liens + sous-catégories "Nos Vélos" + CTA "Prendre RDV". Fermeture via croix animée (rotation barres).

5. **Given** un visiteur sur n'importe quelle page, **When** il scroll jusqu'au footer, **Then** il voit 4 colonnes : (1) Brand + slogan, (2) Navigation 5 liens, (3) Horaires, (4) Contact + marques. Bottom bar avec copyright dynamique et lien mentions légales.

6. **Given** les données de navigation, **When** le composant s'initialise, **Then** les liens et données proviennent de `lib/data/` (dépendance Story 1.5 — centralisation données). En attendant, les données inline existantes sont acceptées.

7. **Given** un utilisateur clavier, **When** il navigue via Tab, **Then** le dropdown "Nos Vélos" est accessible au clavier (focus-visible, Escape ferme le dropdown).

## Tasks / Subtasks

- [ ] Task 1 — Vérifier et nettoyer le composant Topbar existant (AC: #1)
  - [ ] Confirmer que `tel:0142426602` est bien un lien `<a href="tel:...">`
  - [ ] Vérifier l'affichage des horaires (masqué mobile avec `hidden md:inline`)
  - [ ] Vérifier l'icône BOSCH (éclair terracotta) et le texte "Certifié BOSCH eBike"
  - [ ] S'assurer que la topbar est un Server Component (pas de `"use client"`)

- [ ] Task 2 — Consolider le composant Navbar (AC: #2, #3, #7)
  - [ ] Vérifier le dropdown desktop : hover open/close avec `onMouseEnter/onMouseLeave`
  - [ ] Ajouter gestion clavier : `onKeyDown` Escape ferme dropdown, Enter/Space ouvre
  - [ ] Vérifier `aria-expanded`, `aria-haspopup` sur le trigger dropdown
  - [ ] Confirmer sticky top-0 z-50 avec `backdrop-blur-xl`
  - [ ] Confirmer PAS de hamburger en desktop (`hidden lg:hidden` sur le bouton, `hidden lg:flex` sur nav desktop)

- [ ] Task 3 — Perfectionner le menu mobile hamburger (AC: #4)
  - [ ] Vérifier l'animation des barres du hamburger (rotation + opacity)
  - [ ] S'assurer que les sous-catégories "Nos Vélos" sont visibles dans le menu mobile
  - [ ] Ajouter `aria-label="Ouvrir le menu"` / `aria-label="Fermer le menu"` dynamique
  - [ ] Vérifier que le click sur un lien ferme le menu (`setMobileOpen(false)`)
  - [ ] Ajouter `overflow-hidden` sur `<body>` quand menu ouvert (empêcher scroll background)

- [ ] Task 4 — Vérifier et nettoyer le Footer (AC: #5)
  - [ ] Confirmer la grille 4 colonnes (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
  - [ ] Confirmer le copyright dynamique `{new Date().getFullYear()}`
  - [ ] Confirmer le lien mentions légales
  - [ ] Confirmer le composant Server (pas de `"use client"`)

- [ ] Task 5 — Préparer la migration vers lib/data/ (AC: #6)
  - [ ] Documenter les données inline actuelles (liens navbar, items footer, horaires)
  - [ ] Quand Story 1.5 sera complète, migrer les imports vers `lib/data/navigation.ts`, `lib/data/contact.ts`

## Dev Notes

### Architecture Critique
- **Topbar** et **Footer** sont des Server Components — NE PAS ajouter `"use client"`.
- **Navbar** est un Client Component (`"use client"`) car il utilise `useState` pour le toggle mobile et dropdown.
- La topbar est rendue dans `app/(site)/layout.tsx` (le site layout, pas le root layout).
- Ordre dans le layout : `<Topbar /> → <Navbar /> → <main>{children}</main> → <Footer />`
- Le JSON-LD structuré est déjà dans le site layout — ne pas dupliquer.

### Composants Existants à Réutiliser

| Composant | Chemin | Type | Notes |
|-----------|--------|------|-------|
| Topbar | `components/layout/Topbar.tsx` | Server | Déjà fonctionnel, à vérifier |
| Navbar | `components/layout/Navbar.tsx` | Client | Dropdown + hamburger existants |
| Footer | `components/layout/Footer.tsx` | Server | 4 colonnes déjà en place |
| Button | `components/ui/Button.tsx` | Server | Utilisé pour CTA "Prendre RDV" dans navbar |

### Fichiers à Créer/Modifier

| Fichier | Action | Raison |
|---------|--------|--------|
| `components/layout/Topbar.tsx` | Modifier | Vérification accessibilité |
| `components/layout/Navbar.tsx` | Modifier | Accessibilité clavier dropdown, aria-* |
| `components/layout/Footer.tsx` | Modifier | Vérification (mineur) |
| `lib/data/navigation.ts` | Créer (Story 1.5) | Centralisation liens navigation |
| `lib/data/contact.ts` | Créer (Story 1.5) | Centralisation téléphone, horaires |

### Anti-patterns à EVITER
- **NE PAS** cacher la nav desktop derrière un hamburger (anti-pattern UX identifié dans l'audit)
- **NE PAS** utiliser de pop-up newsletter
- **NE PAS** ajouter de librairie externe pour le dropdown (CSS/JS natif suffit)
- **NE PAS** rendre Topbar ou Footer en Client Component (aucune interactivité requise)
- **NE PAS** hardcoder le numéro de téléphone en plusieurs endroits — préparer la centralisation via `lib/data/`

### Project Structure Notes
- Route groups : `app/(site)/` pour les pages publiques, `app/(admin)/` pour l'admin
- Le site layout est dans `app/(site)/layout.tsx`
- Le root layout (`app/layout.tsx`) gère les fonts (Syne, Inter) et les meta globales
- Import alias `@/` pointe vers la racine du projet

### References
- [Source: docs/architecture.md] — structure layout
- [Source: components/layout/Topbar.tsx] — composant existant
- [Source: components/layout/Navbar.tsx] — composant existant avec dropdown
- [Source: components/layout/Footer.tsx] — composant existant 4 colonnes
- [Source: app/(site)/layout.tsx] — intégration des composants layout

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
