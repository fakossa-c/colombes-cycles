# Colombes Cycles — Plan de Batches Parallèles

> Généré le 2026-03-04 par le Scrum Master (Bob)
> 30 stories réparties en 4 phases, 9 batches

---

## PHASE 1 — Foundation (Epic 1)

> **2 batches en parallèle** — Doit être terminée avant la Phase 2

### Batch 1A : Structure & Données

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **1.1** | Réorganiser app/ en route groups (site)/(admin) | review |
| 2 | **1.5** | Centraliser données dans lib/data/ | ready-for-dev |
| 3 | **1.6** | Créer pages error.tsx et not-found.tsx | ready-for-dev |

### Batch 1B : Config & Bugfixes

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **1.2** | Sécuriser variables d'environnement (.env.local) | ready-for-dev |
| 2 | **1.7** | Configurer next.config.ts (headers sécurité) | ready-for-dev |
| 3 | **1.3** | Corriger bugs CSS et composants UI | ready-for-dev |
| 4 | **1.4** | Corriger liens blog + ajouter useReveal sur /nos-velos | ready-for-dev |

> **⚠ Risque merge :** 1.3 et 1.4 touchent des fichiers que 1.1 déplace. Recommandation : terminer 1.1 avant de commencer 1.3/1.4, OU travailler sur les fichiers déjà dans leur emplacement final `app/(site)/`.

---

## PHASE 2 — Pages de contenu (Epics 2, 3, 4)

> **3 batches en parallèle** — Nécessite Phase 1 terminée

### Batch 2A : Homepage & Interactions

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **2.8** | Système animations reveal + parallax (prérequis) | ready-for-dev |
| 2 | **2.1** | Topbar, Navbar, Footer — navigation globale | ready-for-dev |
| 3 | **2.2** | Hero plein écran + animations d'entrée | ready-for-dev |
| 4 | **2.3** | Bande de confiance marquee infini | ready-for-dev |
| 5 | **2.4** | Sections Services + Processus réparation (homepage) | ready-for-dev |
| 6 | **2.5** | Section Boutique | ready-for-dev |
| 7 | **2.6** | Sections Équipe + Avis — grille/swipe Tinder | ready-for-dev |
| 8 | **2.7** | CTA final + roue vélo scroll progress | ready-for-dev |

### Batch 2B : Catalogue Vélos & Réparation

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **3.1** | Page /nos-velos — listing 5 catégories | ready-for-dev |
| 2 | **3.2** | Pages catégorie vélos — détail + conseil + marques | ready-for-dev |
| 3 | **3.3** | SVG vélo interactif — 6 hotspots cliquables | ready-for-dev |
| 4 | **3.4** | Carrousel services + grille tarifaire | ready-for-dev |
| 5 | **3.5** | Section avantages atelier "Pourquoi nous" | ready-for-dev |

### Batch 2C : Pages secondaires

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **4.1** | Page À propos — histoire, valeurs, certification BOSCH | ready-for-dev |
| 2 | **4.2** | Page Contact — formulaire, carte, infos | ready-for-dev |
| 3 | **4.3** | Formulaire contact fonctionnel (Server Action + Resend) | ready-for-dev |
| 4 | **4.4** | Page Blog — structure placeholder | ready-for-dev |

---

## PHASE 3 — SEO (Epic 5)

> **2 batches en parallèle** — Nécessite Phase 2 terminée

### Batch 3A : Meta & Données structurées

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **5.1** | Meta tags, canonical URLs, OpenGraph | ready-for-dev |
| 2 | **5.2** | Données structurées JSON-LD | ready-for-dev |

### Batch 3B : Indexation & Redirections

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **5.4** | Redirections 301 WordPress → Next.js | ready-for-dev |
| 2 | **5.3** | Sitemap XML dynamique + robots.txt | ready-for-dev |

---

## PHASE 4 — Qualité (Epic 6)

> **2 batches en parallèle** — Nécessite Phases 1-3 terminées

### Batch 4A : Conformité légale

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **6.2** | Mentions légales complètes et conformes | ready-for-dev |

### Batch 4B : Audit technique

| Ordre | Story | Résumé | Status |
|-------|-------|--------|--------|
| 1 | **6.1** | Audit accessibilité WCAG 2.1 AA | ready-for-dev |
| 2 | **6.3** | Optimisation performance — Lighthouse ≥ 95, CWV | ready-for-dev |

---

## Résumé visuel

```
PHASE 1 ─┬─ Batch 1A (1.1 → 1.5 → 1.6)
          └─ Batch 1B (1.2 → 1.7 → 1.3 → 1.4)
              │
PHASE 2 ─┬─ Batch 2A (2.8 → 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6 → 2.7)
          ├─ Batch 2B (3.1 → 3.2 → 3.3 → 3.4 → 3.5)
          └─ Batch 2C (4.1 → 4.2 → 4.3 → 4.4)
              │
PHASE 3 ─┬─ Batch 3A (5.1 → 5.2)
          └─ Batch 3B (5.4 → 5.3)
              │
PHASE 4 ─┬─ Batch 4A (6.2)
          └─ Batch 4B (6.1 → 6.3)
```

## Métriques

- **Total stories :** 30
- **Parallélisme max :** 3 développeurs simultanés (Phase 2)
- **Chemin critique :** Batch 1A → Batch 2A (11 stories séquentielles)
- **Batch la plus rapide :** Batch 4A (1 story)
- **Batch la plus lourde :** Batch 2A (8 stories)
