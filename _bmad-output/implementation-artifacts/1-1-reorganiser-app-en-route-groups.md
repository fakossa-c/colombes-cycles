# Story 1.1: Réorganiser app/ en route groups (site) et (admin)

Status: review

## Story

As a développeur,
I want déplacer toutes les routes existantes sous app/(site)/ et créer un app/(admin)/ vide,
So that le bundle public et le bundle admin soient isolés et la structure soit prête pour la V2.

## Acceptance Criteria

1. **Given** le répertoire app/ contient les routes directement (page.tsx, nos-velos/, reparations/, etc.)
   **When** je déplace toutes les routes publiques sous app/(site)/
   **Then** toutes les pages publiques existantes restent accessibles aux mêmes URLs qu'avant

2. **Given** la réorganisation est complète
   **When** je vérifie la structure
   **Then** un dossier app/(admin)/ est créé avec un layout.tsx placeholder contenant un commentaire "V2 — authentification requise"

3. **Given** la réorganisation est complète
   **When** je vérifie app/(site)/layout.tsx
   **Then** il reprend le layout actuel (Topbar, Navbar, Footer, ScrollProgress, JSON-LD LocalBusiness)

4. **Given** la réorganisation est complète
   **When** je vérifie app/layout.tsx
   **Then** il ne contient plus que le html/body wrapper minimal et les font declarations

5. **Given** la réorganisation est complète
   **When** je lance `npm run build`
   **Then** le build réussit sans erreur et toutes les pages sont statiquement générées (SSG)

6. **Given** la réorganisation est complète
   **When** je vérifie les bundles
   **Then** NFR7 (SSG) et NFR8 (isolation bundle admin) sont respectés

## Tasks / Subtasks

- [x] Task 1 — Créer app/(site)/layout.tsx (AC: #3)
  - [x] Déplacer le contenu du layout actuel (Topbar, Navbar, Footer, ScrollProgress, JSON-LD) dans app/(site)/layout.tsx
  - [x] Ce layout wraps seulement `<main>{children}</main>` avec les composants de navigation
  - [x] NE PAS inclure `<html>`, `<body>`, ou les font declarations — c'est le rôle du root layout
- [x] Task 2 — Simplifier app/layout.tsx en root layout minimal (AC: #4)
  - [x] Garder uniquement : `<html lang="fr">`, `<head>`, `<body>` avec les classes font
  - [x] Garder les font declarations (Syne, Inter) et `import "./globals.css"`
  - [x] Garder le `export const metadata` global (metadataBase, title template, robots)
  - [x] Supprimer : Topbar, Navbar, Footer, ScrollProgress, JSON-LD inline
- [x] Task 3 — Déplacer toutes les routes publiques dans app/(site)/ (AC: #1)
  - [x] Déplacer : page.tsx, nos-velos/, reparations/, a-propos/, contact/, blog/, mentions-legales/
  - [x] NE PAS déplacer : globals.css, layout.tsx, sitemap.ts, robots.ts (restent à la racine app/)
- [x] Task 4 — Créer app/(admin)/layout.tsx placeholder (AC: #2)
  - [x] Créer le dossier app/(admin)/
  - [x] Créer layout.tsx avec commentaire `// V2 — authentification requise` et un wrapper minimal
- [x] Task 5 — Vérifier que le build passe (AC: #5, #6)
  - [x] Lancer `npm run build`
  - [x] Vérifier que toutes les routes sont SSG (output: Static)
  - [x] Vérifier que les URLs publiques sont inchangées (pas de /site/ dans les URLs)

## Dev Notes

### Architecture Critique — Ce que tu DOIS savoir

**Les route groups Next.js `(site)` et `(admin)` n'apparaissent PAS dans les URLs.**
- `app/(site)/page.tsx` → URL `/`
- `app/(site)/nos-velos/page.tsx` → URL `/nos-velos`
- `app/(admin)/admin/page.tsx` → URL `/admin`
- Les parenthèses dans le nom du dossier sont la syntaxe Next.js pour les route groups

**Le root layout (`app/layout.tsx`) est OBLIGATOIRE et UNIQUE.**
- Il DOIT contenir `<html>` et `<body>`
- Chaque route group peut avoir son propre layout imbriqué
- Le layout `(site)` ne doit PAS redéclarer `<html>` ou `<body>`

**Le JSON-LD LocalBusiness est actuellement dans le root layout.**
- Il doit migrer vers `app/(site)/layout.tsx` car c'est du contenu site public uniquement
- Le root layout ne doit contenir que le wrapper HTML minimal

### Structure Actuelle (AVANT)

```
app/
├── globals.css
├── layout.tsx          ← Contient TOUT : fonts, metadata, Topbar, Navbar, Footer, ScrollProgress, JSON-LD
├── page.tsx            ← Homepage
├── sitemap.ts
├── robots.ts
├── nos-velos/
├── reparations/
├── a-propos/
├── contact/
├── blog/
└── mentions-legales/
```

### Structure Cible (APRÈS)

```
app/
├── globals.css                ← RESTE ICI (importé par root layout)
├── layout.tsx                 ← SIMPLIFIÉ : <html>, <body>, fonts, metadata globale
├── sitemap.ts                 ← RESTE ICI (génération globale)
├── robots.ts                  ← RESTE ICI (génération globale)
│
├── (site)/                    ← NOUVEAU route group
│   ├── layout.tsx             ← NOUVEAU : Topbar, Navbar, Footer, ScrollProgress, JSON-LD
│   ├── page.tsx               ← DÉPLACÉ depuis app/
│   ├── nos-velos/             ← DÉPLACÉ depuis app/
│   ├── reparations/           ← DÉPLACÉ depuis app/
│   ├── a-propos/              ← DÉPLACÉ depuis app/
│   ├── contact/               ← DÉPLACÉ depuis app/
│   ├── blog/                  ← DÉPLACÉ depuis app/
│   └── mentions-legales/      ← DÉPLACÉ depuis app/
│
└── (admin)/                   ← NOUVEAU route group (placeholder V2)
    └── layout.tsx             ← Placeholder avec commentaire
```

### Fichiers à Modifier

| Fichier | Action | Détail |
|---------|--------|--------|
| `app/layout.tsx` | MODIFIER | Retirer Topbar, Navbar, Footer, ScrollProgress, JSON-LD. Garder html/body/fonts/metadata |
| `app/(site)/layout.tsx` | CRÉER | Reprendre Topbar, Navbar, Footer, ScrollProgress, JSON-LD du layout actuel |
| `app/(site)/page.tsx` | DÉPLACER | Depuis app/page.tsx (aucune modification de contenu) |
| `app/(site)/nos-velos/` | DÉPLACER | Dossier entier avec [category]/ |
| `app/(site)/reparations/` | DÉPLACER | Dossier entier avec composants page-locaux |
| `app/(site)/a-propos/` | DÉPLACER | Dossier entier avec StorySection, ValuesGrid |
| `app/(site)/contact/` | DÉPLACER | Dossier entier |
| `app/(site)/blog/` | DÉPLACER | Dossier entier |
| `app/(site)/mentions-legales/` | DÉPLACER | Dossier entier |
| `app/(admin)/layout.tsx` | CRÉER | Placeholder V2 |

### Imports — Aucun changement nécessaire

Les composants dans `components/` utilisent des alias `@/components/...` qui ne changent pas.
Les données dans `lib/` utilisent des alias `@/lib/...` qui ne changent pas.
Seuls les fichiers déplacés DANS `app/` changent de chemin physique, mais les imports VERS `components/` et `lib/` restent identiques.

**Vérifier quand même :** les imports relatifs dans les pages (ex: `./ServicesGrid` dans `reparations/page.tsx`) resteront valides car le dossier entier est déplacé.

### Anti-patterns à ÉVITER

- ❌ NE PAS créer `<html>` ou `<body>` dans `(site)/layout.tsx`
- ❌ NE PAS dupliquer les font declarations dans le layout (site)
- ❌ NE PAS déplacer `globals.css`, `sitemap.ts`, ou `robots.ts` dans `(site)/`
- ❌ NE PAS modifier le contenu des pages déplacées — cette story est UNIQUEMENT une réorganisation de structure
- ❌ NE PAS installer de dépendances — cette story ne nécessite aucun package

### Contenu exact du nouveau app/(site)/layout.tsx

```typescript
import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/BikeWheel";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BikeStore"],
    "@id": "https://www.colombes-cycles.fr/#business",
    name: "Colombes Cycles",
    // ... (copier intégralement le JSON-LD depuis le layout actuel)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Topbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### Contenu exact du nouveau app/layout.tsx (root)

```typescript
import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.colombes-cycles.fr"),
  title: {
    template: "%s | Colombes Cycles",
    default: "Colombes Cycles — Vélos & Réparations à Colombes (92)",
  },
  description: "Votre magasin vélo à Colombes (92)...",
  openGraph: { /* ... garder tel quel */ },
  twitter: { /* ... garder tel quel */ },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://www.colombes-cycles.fr" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-inter bg-cream text-anthracite antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
```

### Contenu exact du app/(admin)/layout.tsx

```typescript
// V2 — authentification requise
// Ce route group contiendra le dashboard admin Colombes Cycles
// Auth.js v5 middleware + session-based authentication

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### Project Structure Notes

- La réorganisation suit exactement la décision AD-1 (architecture.md)
- Les route groups sont la fonctionnalité native Next.js App Router pour isoler les bundles
- La boundary `(site)` / `(admin)` est documentée dans architecture.md §Architectural Boundaries
- Aucun conflit avec la structure existante — c'est un déplacement pur

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions — AD-1]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/architecture.md#Architectural Boundaries — Boundary 1]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]
- [Source: docs/architecture.md] (documentation brownfield)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- OneDrive lock issue on `mv` command → resolved with `cp -r` + `rm -rf`
- Pre-existing lint errors in Services.tsx (react-hooks/immutability) and Team.tsx (unused var) — NOT introduced by this story

### Completion Notes List

- Created app/(site)/layout.tsx with Topbar, Navbar, Footer, ScrollProgress, JSON-LD LocalBusiness (migrated from root layout)
- Simplified app/layout.tsx to minimal root layout: html/body/fonts/metadata only
- Moved 7 route directories (page.tsx, nos-velos, reparations, a-propos, contact, blog, mentions-legales) into app/(site)/
- Created app/(admin)/layout.tsx placeholder with V2 auth comments
- Build passes: 16/16 pages SSG, all URLs unchanged (no /site/ prefix)
- No new lint errors introduced (3 pre-existing errors in Services.tsx and Team.tsx)

### Change Log

- 2026-03-04: Story 1.1 implemented — route group reorganization complete

### File List

- app/layout.tsx (MODIFIED — simplified to root layout)
- app/(site)/layout.tsx (CREATED — site layout with nav components + JSON-LD)
- app/(site)/page.tsx (MOVED from app/page.tsx)
- app/(site)/nos-velos/ (MOVED from app/nos-velos/)
- app/(site)/reparations/ (MOVED from app/reparations/)
- app/(site)/a-propos/ (MOVED from app/a-propos/)
- app/(site)/contact/ (MOVED from app/contact/)
- app/(site)/blog/ (MOVED from app/blog/)
- app/(site)/mentions-legales/ (MOVED from app/mentions-legales/)
- app/(admin)/layout.tsx (CREATED — V2 placeholder)
