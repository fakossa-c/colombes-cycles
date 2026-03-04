# Colombes Cycles — Documentation Projet

> Générée le 2026-03-03 | Scan : Deep | Mode : initial_scan

## Vue d'ensemble

| Attribut | Valeur |
|---|---|
| **Type** | Monolith — application web statique |
| **Framework** | Next.js 16.1.6 (App Router) |
| **Langage** | TypeScript (strict) |
| **UI** | React 19.2.3 + Tailwind CSS v4 |
| **Architecture** | Component-based SSG |
| **Animations** | Custom (CSS + IntersectionObserver + rAF) |
| **Données** | Statique (pas de BDD/CMS/API) |

## Référence rapide

- **Point d'entrée** : `app/layout.tsx`
- **Homepage** : `app/page.tsx` (8 sections composées)
- **Thème CSS** : `app/globals.css` (tokens Tailwind v4 + animations)
- **Données partagées** : `lib/categories.ts` (5 catégories vélos)
- **Composants** : 31 total (11 Server, 18 Client, 2 hooks)
- **Pages** : 8 routes (dont 1 dynamique avec 5 params statiques)

## Documentation générée

- [Vue d'ensemble du projet](./project-overview.md)
- [Architecture](./architecture.md)
- [Arborescence source](./source-tree-analysis.md)
- [Inventaire des composants](./component-inventory.md)
- [Guide de développement](./development-guide.md)

## Documentation existante (racine du projet)

- [Audit UX/Design](../audit.md) — Analyse complète du site WordPress actuel
- [Stratégie de marque](../brand-strategy.md) — Positionnement, personas, ton de voix
- [Copywriting](../copy.md) — Textes pour les sections du site
- [Stratégie SEO](../seo-strategy.md) — Stratégie SEO locale

## Pour démarrer

### Développement local
```bash
npm install
npm run dev
```

### Structure du projet
```
app/           → Routes et pages (App Router)
components/    → Composants partagés (layout/, home/, ui/, blog/, contact/)
lib/           → Données statiques (categories.ts)
public/        → Assets statiques (images/ — actuellement vide)
docs/          → Cette documentation
```

### Points clés pour l'IA

- **Toutes les données sont hardcodées** dans les composants — pas de BDD, pas de CMS, pas d'API
- **Le système d'animations** est entièrement custom : voir [Architecture > Animations](./architecture.md#système-danimations-6-couches)
- **Le ContactForm** existe mais n'est pas utilisé ni connecté à un backend
- **Les images** sont toutes des placeholders SVG — aucune image réelle n'est intégrée
- **Pas de tests ni de CI/CD** — le projet est en phase de développement

### Prochaines étapes recommandées

1. Créer un PRD brownfield en utilisant cette documentation comme contexte
2. Référencer `docs/index.md` comme entrée dans les workflows BMAD
3. Pour les features UI : consulter [Inventaire composants](./component-inventory.md) et [Architecture](./architecture.md)
4. Pour le contenu : consulter [Guide de développement > Ajout de données](./development-guide.md#ajout-de-données)
