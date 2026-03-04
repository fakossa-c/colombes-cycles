---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2026-03-04'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# Colombes-cycles - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Colombes-cycles, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Le visiteur peut accéder à toutes les pages via une navigation principale sticky avec dropdown "Nos Vélos" (5 catégories)
FR2: Le visiteur peut naviguer via un menu hamburger sur mobile avec animation d'ouverture/fermeture
FR3: Le visiteur peut voir le numéro de téléphone et les horaires dans une barre utilitaire (topbar) toujours visible
FR4: Le visiteur peut accéder au pied de page avec liens de navigation, horaires, adresse et informations de contact
FR5: Le visiteur peut suivre sa progression de scroll via un indicateur visuel (roue vélo rotative)
FR6: Le visiteur peut parcourir la page d'accueil composée de 8 sections distinctes : hero, bande de confiance, services, processus réparation, boutique, équipe, avis clients, CTA final
FR7: Le visiteur peut voir les 5 catégories de vélos (ville, électrique, VTT, enfants, accessoires) sur la page "Nos Vélos"
FR8: Le visiteur peut accéder à une page dédiée par catégorie de vélos avec description, angle conseil et marques distribuées
FR9: Le visiteur peut découvrir les membres de l'équipe avec leurs bios et spécialités — en grille desktop et en swipe Tinder sur mobile
FR10: Le visiteur peut lire les avis clients Google — en grille desktop et en swipe Tinder sur mobile
FR11: Le visiteur peut parcourir l'histoire du fondateur, les valeurs de la boutique et la certification BOSCH sur la page À propos
FR12: Le visiteur peut voir les marques partenaires distribuées (Orbea, Peugeot Cycles, Gitane, Velodeville, Lombardo, Sparta)
FR13: Le visiteur peut consulter une grille d'articles blog (structure prête, contenu placeholder)
FR14: Le visiteur peut explorer les 6 services de réparation via un SVG vélo interactif avec hotspots cliquables
FR15: Le visiteur peut naviguer les services via un carrousel vertical (desktop) ou horizontal (mobile) alternatif au SVG
FR16: Le visiteur peut consulter la grille tarifaire indicative des réparations
FR17: Le visiteur peut visualiser le processus de réparation en 4 étapes avec connecteur horizontal
FR18: Le visiteur peut lire les 5 avantages de l'atelier ("Pourquoi nous confier votre vélo")
FR19: Le visiteur peut cliquer sur un CTA "Appeler" qui déclenche un appel téléphonique (lien tel:)
FR20: Le visiteur peut cliquer sur un CTA "Prendre RDV" visible à plusieurs endroits du site
FR21: Le visiteur peut accéder à la page contact avec téléphone, horaires, adresse et localisation
FR22: Le visiteur peut accéder au configurateur Velodeville via un CTA externe intégré dans le design system
FR23: Le visiteur peut voir des animations de révélation (fade-in, slide-left, slide-right, scale-in) au scroll via IntersectionObserver
FR24: Le visiteur peut percevoir des effets parallax multi-vitesse sur les éléments décoratifs et textes
FR25: Le visiteur peut interagir avec les cartes équipe et avis en swipe Tinder sur mobile (drag-to-dismiss avec retour tactile)
FR26: Le visiteur peut voir un hero plein écran avec animations d'entrée et fade-out au scroll
FR27: Le visiteur peut voir une bande de confiance en défilement marquee infini
FR28: Le visiteur peut désactiver toutes les animations si prefers-reduced-motion est activé dans ses préférences système
FR29: Les moteurs de recherche peuvent indexer toutes les pages publiques via un sitemap XML dynamique
FR30: Les moteurs de recherche peuvent lire les données structurées JSON-LD (LocalBusiness + BikeStore, Service, BreadcrumbList) sur chaque page
FR31: Chaque page publique possède des meta title, meta description, canonical URL et OpenGraph/Twitter Cards
FR32: Le visiteur peut naviguer via un fil d'Ariane (breadcrumb) sur toutes les pages intérieures
FR33: Le visiteur arrivant sur une ancienne URL WordPress est redirigé (301) vers la page correspondante
FR34: Le visiteur arrivant sur une URL inexistante voit une page 404 custom dans le design system avec navigation de secours
FR35: Le site respecte les exigences d'accessibilité WCAG 2.1 AA (contraste, focus management, alt text)
FR36: Le visiteur peut consulter les mentions légales complètes (SIRET, forme juridique, hébergeur, RGPD)
FR37: La route /mentions-legales est incluse dans le sitemap
FR38: Les classes CSS dynamiques dans les pages catégorie vélos fonctionnent correctement (correction du template literal cassé dans /nos-velos/[category])
FR39: Les animations reveal fonctionnent sur la page /nos-velos (ajout de useReveal — conversion en client component ou refactoring)
FR40: Le composant Button avec flèche SVG fonctionne avec l'effet hover (ajout de la classe group au parent)
FR41: Le ContactForm est importé et affiché sur la page /contact
FR42: Le ContactForm soumet effectivement les données (via server action, Resend ou autre backend)
FR43: Les liens blog pointent vers des routes fonctionnelles (ou sont désactivés si les routes /blog/[slug] ne sont pas encore créées)
FR44: L'animation du menu mobile hamburger est connectée et fonctionnelle
FR45: La clé API est déplacée de .env vers .env.local (gitignored)
FR46: Les mentions légales contiennent les informations obligatoires (SIRET, forme juridique) — cf. FR36

### NonFunctional Requirements

NFR1: Le site public atteint un score Lighthouse Performance ≥ 95 sur mobile et desktop
NFR2: Le Largest Contentful Paint (LCP) est inférieur à 2.5 secondes
NFR3: Le Cumulative Layout Shift (CLS) est inférieur à 0.1
NFR4: L'Interaction to Next Paint (INP) est inférieur à 200ms
NFR5: Le bundle JavaScript total du site public est inférieur à 150 KB gzipped
NFR6: Le First Contentful Paint est inférieur à 1.8 secondes
NFR7: 100% des pages publiques sont statiquement générées (SSG) — aucun rendu serveur au runtime
NFR8: Le code du route group (admin) ne contamine jamais le bundle du site public
NFR9: Les animations sont throttlées via requestAnimationFrame et n'impactent pas le frame rate en dessous de 30 FPS
NFR10: Aucune clé API, secret ou credential n'est commité dans le dépôt Git
NFR11: Les variables d'environnement sensibles sont stockées dans .env.local (gitignored)
NFR12: Le formulaire de contact collecte uniquement les données nécessaires (nom, email, message) et informe l'utilisateur de leur traitement
NFR13: Les mentions légales contiennent toutes les informations obligatoires (SIRET, forme juridique, directeur de publication, hébergeur, politique de données personnelles)
NFR14: Le dashboard admin (V2) requiert une authentification avant tout accès
NFR15: Les données collectées via le formulaire de contact sont transmises via HTTPS uniquement
NFR16: Le site public respecte WCAG 2.1 niveau AA
NFR17: Le ratio de contraste entre le texte et l'arrière-plan respecte le minimum AA (4.5:1 normal, 3:1 large)
NFR18: Toutes les animations sont désactivées lorsque prefers-reduced-motion: reduce est activé
NFR19: Tous les éléments interactifs sont accessibles au clavier (navigation, liens, CTA, SVG hotspots)
NFR20: Toutes les images décoratives ont un alt="" vide et toutes les images informatives ont un alt descriptif
NFR21: La structure des headings est hiérarchiquement correcte sur chaque page (un seul h1, pas de saut de niveau)
NFR22: Le lien vers le configurateur Velodeville s'ouvre dans un nouvel onglet et identifie le revendeur Colombes Cycles (h_ident=10144)
NFR23: L'intégration Google Maps sur la page contact se charge sans bloquer le rendu de la page
NFR24: Les données structurées JSON-LD sont validées sans erreur par le Rich Results Test de Google
NFR25: Le score Lighthouse SEO est ≥ 95 sur toutes les pages publiques
NFR26: Le fichier robots.txt autorise le crawl de toutes les pages publiques et bloque le route group admin
NFR27: Le sitemap XML est généré dynamiquement et contient toutes les routes publiques, y compris /mentions-legales
NFR28: Les URLs canoniques sont correctes sur chaque page (pas de duplicate content)

### Additional Requirements

**From Architecture:**

- Réorganiser app/ en route group (site)/ — déplacer toutes les routes existantes sous app/(site)/
- Centraliser les données dans lib/data/ — extraire les données inline de 12+ composants vers des modules TypeScript typés
- Pas de starter template (brownfield) — le code existant (31 composants, 8 routes) est la fondation
- Configurer next.config.ts avec redirects() pour les 301 WordPress → Next.js
- Ajouter headers de sécurité via next.config.ts : X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- Créer .env.example comme template des variables d'environnement
- Page error.tsx et not-found.tsx dans le route group (site)
- Server Action pour le formulaire contact (V1.1) avec Resend API
- Préparer la structure (admin)/ vide pour la V2 (layout.tsx placeholder)

**From UX Design:**

- Hero doit communiquer en 3 secondes : expertise, chaleur humaine, preuve sociale
- Le scroll homepage est un récit narratif en 8 chapitres (reveal séquentiel)
- Swipe Tinder : seuil 50px, feedback physique (rotation + opacité), aucun conflit avec scroll natif
- SVG vélo interactif : accessible au clavier (Tab + Enter), fallback carrousel sur mobile
- Topbar téléphone : un tap = appel direct (lien tel:), toujours visible
- Palette émotionnelle : anthracite = premium, ivoire = chaleur, terracotta = énergie/action
- Micro-interactions signature : roue vélo au scroll, parallax discret, reveal staggeré
- Anti-patterns à éviter : slider auto-play, hamburger desktop, pop-up newsletter, carte Maps qui capture le scroll
- Sections alternées clair/sombre pour le rythme visuel
- Touch = engagement : chaque geste physique crée une micro-connexion émotionnelle

### FR Coverage Map

| FR | Epic | Justification |
|----|------|---------------|
| FR1 | Epic 2 | Navigation sticky — composant homepage |
| FR2 | Epic 2 | Menu hamburger mobile — composant homepage |
| FR3 | Epic 2 | Topbar téléphone — composant homepage |
| FR4 | Epic 2 | Footer — composant homepage |
| FR5 | Epic 2 | Roue vélo scroll — micro-interaction homepage |
| FR6 | Epic 2 | 8 sections homepage — structure narrative |
| FR7 | Epic 3 | Page Nos Vélos — catégories |
| FR8 | Epic 3 | Pages catégorie vélos — détail |
| FR9 | Epic 2 | Grille/swipe équipe — section homepage |
| FR10 | Epic 2 | Grille/swipe avis — section homepage |
| FR11 | Epic 4 | Page À propos — histoire fondateur |
| FR12 | Epic 3 | Marques partenaires — catalogue |
| FR13 | Epic 4 | Grille blog — structure prête |
| FR14 | Epic 3 | SVG vélo interactif — réparation |
| FR15 | Epic 3 | Carrousel services — réparation |
| FR16 | Epic 3 | Grille tarifaire — réparation |
| FR17 | Epic 3 | Processus 4 étapes — réparation |
| FR18 | Epic 3 | 5 avantages atelier — réparation |
| FR19 | Epic 2 | CTA Appeler — homepage |
| FR20 | Epic 2 | CTA Prendre RDV — homepage |
| FR21 | Epic 4 | Page Contact — formulaire et carte |
| FR22 | Epic 3 | CTA Velodeville — catalogue |
| FR23 | Epic 2 | Animations reveal — homepage |
| FR24 | Epic 2 | Effets parallax — homepage |
| FR25 | Epic 2 | Swipe Tinder — homepage mobile |
| FR26 | Epic 2 | Hero plein écran — homepage |
| FR27 | Epic 2 | Bande de confiance marquee — homepage |
| FR28 | Epic 2 | prefers-reduced-motion — animations |
| FR29 | Epic 5 | Sitemap XML — SEO |
| FR30 | Epic 5 | JSON-LD — SEO |
| FR31 | Epic 5 | Meta tags — SEO |
| FR32 | Epic 5 | Breadcrumb — SEO |
| FR33 | Epic 5 | Redirections 301 WordPress — SEO |
| FR34 | Epic 1 | Page 404 custom — fondation |
| FR35 | Epic 6 | WCAG 2.1 AA — accessibilité |
| FR36 | Epic 6 | Mentions légales — conformité |
| FR37 | Epic 5 | /mentions-legales dans sitemap — SEO |
| FR38 | Epic 1 | Bug CSS template literal — code health |
| FR39 | Epic 1 | Bug animations reveal /nos-velos — code health |
| FR40 | Epic 1 | Bug Button hover group — code health |
| FR41 | Epic 4 | ContactForm import — page contact |
| FR42 | Epic 4 | ContactForm soumission — page contact |
| FR43 | Epic 1 | Bug liens blog — code health |
| FR44 | Epic 1 | Bug menu hamburger — code health |
| FR45 | Epic 1 | Clé API .env.local — code health |
| FR46 | Epic 6 | Mentions légales SIRET — conformité |

**Couverture : 46/46 FRs (100%)**

## Epic List

### Epic 1: Foundation & Code Health
**Goal:** Assainir le codebase existant — corriger les 7 bugs connus, réorganiser la structure en route groups, centraliser les données, et préparer les fondations pour les epics suivants.
**FRs:** FR34, FR38, FR39, FR40, FR43, FR44, FR45
**NFRs:** NFR7, NFR8, NFR10, NFR11
**Additional:** Route group (site)/, centralisation lib/data/, .env.example, error.tsx, not-found.tsx, structure (admin)/ vide, headers sécurité

### Epic 2: Homepage & Scroll Narrative
**Goal:** Construire l'expérience homepage complète — le récit narratif en 8 chapitres avec toutes les micro-interactions signature (reveal, parallax, swipe Tinder, roue vélo, hero cinématique).
**FRs:** FR1, FR2, FR3, FR4, FR5, FR6, FR9, FR10, FR19, FR20, FR23, FR24, FR25, FR26, FR27, FR28
**NFRs:** NFR9
**Additional:** Hero 3 secondes, scroll narratif 8 chapitres, swipe Tinder seuil 50px, topbar tel:, palette émotionnelle, micro-interactions signature, anti-patterns, sections alternées, touch = engagement

### Epic 3: Catalogue Vélos & Atelier Réparation
**Goal:** Livrer les pages catalogue vélos (listing + 5 catégories) et la section réparation complète (SVG interactif, carrousel services, grille tarifaire, processus 4 étapes, avantages atelier).
**FRs:** FR7, FR8, FR12, FR14, FR15, FR16, FR17, FR18, FR22
**NFRs:** NFR22
**Additional:** SVG vélo accessible clavier (Tab + Enter), fallback carrousel mobile

### Epic 4: À Propos, Contact & Blog
**Goal:** Finaliser les pages secondaires — À propos (histoire fondateur, valeurs, certification BOSCH), Contact (formulaire fonctionnel, carte Maps, Server Action), Blog (structure prête avec placeholders).
**FRs:** FR11, FR13, FR21, FR41, FR42
**NFRs:** NFR12, NFR15, NFR23
**Additional:** Server Action formulaire contact avec Resend API, carte Maps sans capture scroll

### Epic 5: SEO & Discoverabilité Google
**Goal:** Maximiser la visibilité Google — sitemap XML dynamique, JSON-LD validé, meta tags complets, breadcrumbs, redirections 301 WordPress, robots.txt.
**FRs:** FR29, FR30, FR31, FR32, FR33, FR37
**NFRs:** NFR24, NFR25, NFR26, NFR27, NFR28
**Additional:** Redirections WordPress → Next.js via next.config.ts

### Epic 6: Accessibilité, Conformité Légale & Performance
**Goal:** Atteindre les standards de qualité — WCAG 2.1 AA complet, mentions légales conformes, Lighthouse ≥ 95, Core Web Vitals dans les seuils, bundle < 150 KB.
**FRs:** FR35, FR36, FR46
**NFRs:** NFR1, NFR2, NFR3, NFR4, NFR5, NFR6, NFR13, NFR16, NFR17, NFR18, NFR19, NFR20, NFR21

### Dependency Flow

```
Epic 1 (Foundation) ──→ Epic 2 (Homepage)
                    ──→ Epic 3 (Catalogue & Réparation)
                    ──→ Epic 4 (À Propos, Contact & Blog)
Epic 2 + 3 + 4     ──→ Epic 5 (SEO)
Epic 1 → 5          ──→ Epic 6 (Accessibilité & Performance)
```

---

## Epic 1: Foundation & Code Health

**Goal:** Assainir le codebase existant — corriger les 7 bugs connus, réorganiser la structure en route groups, centraliser les données, et préparer les fondations pour les epics suivants.

### Story 1.1: Réorganiser app/ en route groups (site) et (admin)

As a développeur,
I want déplacer toutes les routes existantes sous app/(site)/ et créer un app/(admin)/ vide,
So that le bundle public et le bundle admin soient isolés et la structure soit prête pour la V2.

**Acceptance Criteria:**

**Given** le répertoire app/ contient les routes directement (page.tsx, nos-velos/, reparations/, etc.)
**When** je déplace toutes les routes publiques sous app/(site)/
**Then** toutes les pages publiques existantes restent accessibles aux mêmes URLs qu'avant
**And** un dossier app/(admin)/ est créé avec un layout.tsx placeholder contenant un commentaire "V2 — authentification requise"
**And** app/(site)/layout.tsx reprend le layout actuel (fonts, Topbar, Navbar, Footer)
**And** app/layout.tsx ne contient plus que le html/body wrapper minimal et les fonts
**And** `npm run build` réussit sans erreur
**And** NFR7 (SSG) et NFR8 (isolation bundle admin) sont respectés

### Story 1.2: Sécuriser les variables d'environnement

As a développeur,
I want déplacer la clé API de .env vers .env.local et créer .env.example,
So that aucun secret ne soit commité dans le dépôt Git.

**Acceptance Criteria:**

**Given** le fichier .env contient une clé API CRM
**When** je déplace les variables sensibles vers .env.local
**Then** .env.local est listé dans .gitignore
**And** .env est supprimé ou vidé de ses secrets
**And** un fichier .env.example est créé avec les noms de variables et des valeurs placeholder (ex: `CRM_API_KEY=your_key_here`)
**And** le fichier .env.example est commité dans le dépôt
**And** NFR10 (aucun secret dans Git) et NFR11 (.env.local gitignored) sont respectés

### Story 1.3: Corriger les bugs CSS et composants UI

As a visiteur,
I want que les pages s'affichent correctement sans bugs visuels,
So that mon expérience de navigation soit fluide et professionnelle.

**Acceptance Criteria:**

**Given** la page /nos-velos/[category] a un template literal CSS cassé (FR38)
**When** je corrige le template literal dans le composant de page catégorie
**Then** les classes CSS dynamiques s'appliquent correctement sur les 5 pages catégorie

**Given** le composant Button avec flèche SVG (FR40)
**When** j'ajoute la classe `group` au parent du Button
**Then** l'effet hover sur la flèche SVG fonctionne correctement sur tous les boutons primary

**Given** l'animation du menu hamburger mobile (FR44)
**When** je connecte le toggle d'animation au state mobileOpen de Navbar
**Then** l'icône hamburger s'anime en croix à l'ouverture et revient en hamburger à la fermeture
**And** l'animation est fluide (transition CSS, pas de saut)

### Story 1.4: Corriger les liens blog et ajouter useReveal sur /nos-velos

As a visiteur,
I want que les liens blog ne mènent pas à des pages 404 et que les animations reveal fonctionnent sur /nos-velos,
So that le site ne semble pas cassé ou inachevé.

**Acceptance Criteria:**

**Given** les liens blog pointent vers /blog/[slug] qui n'existe pas (FR43)
**When** je désactive les liens blog (pointeur vers /blog avec ancre, ou href="#" avec style désactivé)
**Then** cliquer sur un article blog ne provoque pas une erreur 404
**And** l'apparence des cartes blog indique visuellement qu'elles sont en "bientôt disponible"

**Given** la page /nos-velos n'a pas useReveal activé (FR39)
**When** j'ajoute useReveal au composant page ou je le convertis en client component partiel
**Then** les éléments avec classes reveal-* s'animent au scroll sur /nos-velos
**And** les animations respectent prefers-reduced-motion

### Story 1.5: Centraliser les données dans lib/data/

As a développeur,
I want extraire les données hardcodées des composants vers des modules TypeScript typés dans lib/data/,
So that les données soient maintenables, typées et prêtes pour une future migration vers une BDD.

**Acceptance Criteria:**

**Given** les données d'équipe, avis, services, horaires, etc. sont inline dans 12+ composants
**When** je crée des modules dans lib/data/ (team.ts, reviews.ts, services.ts, trust-items.ts, repair-process.ts, advantages.ts, horaires.ts, contact.ts)
**Then** chaque module exporte un type TypeScript et un array const de données
**And** les composants importent les données depuis lib/data/ au lieu de les définir inline
**And** lib/categories.ts existant est déplacé vers lib/data/categories.ts (avec mise à jour des imports)
**And** `npm run build` réussit et toutes les pages affichent les mêmes données qu'avant
**And** aucune donnée métier n'est dupliquée entre les modules

### Story 1.6: Créer les pages error.tsx et not-found.tsx

As a visiteur,
I want voir une page 404 personnalisée quand j'arrive sur une URL inexistante,
So that je puisse facilement revenir vers le contenu du site au lieu de voir une page d'erreur générique.

**Acceptance Criteria:**

**Given** un visiteur accède à une URL inexistante (FR34)
**When** la page not-found.tsx du route group (site) s'affiche
**Then** la page utilise le design system (couleurs anthracite/ivoire/terracotta, typo Syne/Inter)
**And** elle affiche un message clair "Page introuvable"
**And** elle propose des liens vers : Accueil, Nos Vélos, Réparations, Contact
**And** une page error.tsx existe pour capturer les erreurs runtime avec un message générique et un bouton "Retour à l'accueil"

### Story 1.7: Configurer next.config.ts (headers sécurité)

As a développeur,
I want configurer next.config.ts avec les headers de sécurité,
So that le site soit protégé contre les attaques XSS, clickjacking et MIME sniffing.

**Acceptance Criteria:**

**Given** next.config.ts est actuellement vide
**When** j'ajoute la configuration des headers de sécurité
**Then** toutes les réponses incluent `X-Content-Type-Options: nosniff`
**And** toutes les réponses incluent `X-Frame-Options: DENY`
**And** toutes les réponses incluent `Referrer-Policy: strict-origin-when-cross-origin`
**And** `npm run build` réussit sans erreur

---

## Epic 2: Homepage & Scroll Narrative

**Goal:** Construire l'expérience homepage complète — le récit narratif en 8 chapitres avec toutes les micro-interactions signature (reveal, parallax, swipe Tinder, roue vélo, hero cinématique).

### Story 2.1: Topbar, Navbar et Footer — navigation globale

As a visiteur,
I want accéder à la navigation principale, voir le numéro de téléphone et les horaires en permanence, et retrouver les informations de contact dans le pied de page,
So that je puisse naviguer facilement et contacter la boutique à tout moment.

**Acceptance Criteria:**

**Given** le visiteur est sur n'importe quelle page du site (FR1, FR3, FR4)
**When** la page se charge
**Then** la Topbar affiche le numéro de téléphone (01 42 42 66 02) cliquable en lien tel: (FR19), les horaires et le badge BOSCH
**And** la Navbar est sticky et contient un dropdown "Nos Vélos" avec les 5 catégories
**And** le dropdown ne s'affiche PAS en hamburger sur desktop (anti-pattern)
**And** le Footer affiche 4 colonnes : brand, navigation, horaires, contact
**And** les données Topbar/Footer proviennent de lib/data/ (créé en Story 1.5)

**Given** le visiteur est sur mobile (FR2)
**When** il clique sur l'icône hamburger
**Then** le menu mobile s'ouvre avec une animation fluide (FR44, corrigé en Story 1.3)
**And** le menu affiche tous les liens de navigation incluant les sous-catégories vélos
**And** un second tap ferme le menu avec animation inverse

### Story 2.2: Hero plein écran avec animations d'entrée

As a visiteur,
I want être immédiatement immergé dans l'univers Colombes Cycles dès l'arrivée sur le site,
So that je comprenne en 3 secondes l'expertise, la chaleur humaine et la preuve sociale.

**Acceptance Criteria:**

**Given** le visiteur arrive sur la homepage (FR26)
**When** la page se charge
**Then** le hero s'affiche en plein écran (100vh)
**And** les éléments du hero apparaissent avec des animations d'entrée séquentielles (titre, sous-titre, CTA)
**And** le hero communique : expertise (métier vélo), chaleur humaine (photo/visuel artisanal), preuve sociale (note Google 4.8/5)
**And** le CTA "Appeler" déclenche un appel téléphonique (lien tel:, FR19)
**And** le CTA "Prendre RDV" est visible et fonctionnel (FR20)

**Given** le visiteur scrolle vers le bas
**When** le scroll dépasse le hero
**Then** le hero disparaît avec un effet de fade-out progressif
**And** l'effet fade-out est piloté par le scroll position (pas d'animation temporelle)

### Story 2.3: Bande de confiance en marquee infini

As a visiteur,
I want voir défiler les preuves de confiance (certifications, années d'expérience, note Google),
So that je sois rassuré sur le professionnalisme de la boutique.

**Acceptance Criteria:**

**Given** le visiteur scrolle sous le hero (FR27)
**When** la bande de confiance entre dans le viewport
**Then** les 6 items de preuve sociale défilent en boucle infinie (marquee CSS)
**And** le défilement est fluide et continu, sans saut visible au rebouclage
**And** le défilement n'est PAS en auto-play avec contrôles (anti-pattern) — c'est un marquee décoratif
**And** les données de la bande proviennent de lib/data/trust-items.ts

### Story 2.4: Sections Services et Processus Réparation (homepage)

As a visiteur,
I want découvrir les 3 services principaux et le processus de réparation en 4 étapes sur la homepage,
So that je comprenne rapidement ce que la boutique propose.

**Acceptance Criteria:**

**Given** le visiteur scrolle vers la section Services (FR6)
**When** la section entre dans le viewport
**Then** les 3 services (Vente, Réparation, Conseil) apparaissent avec animation reveal staggerée
**And** le texte "MÉTIER" en arrière-plan a un effet parallax subtil (FR24)
**And** chaque service est cliquable et mène vers la page appropriée

**Given** le visiteur continue de scroller vers la section Processus (FR17)
**When** la section entre dans le viewport
**Then** les 4 étapes de réparation apparaissent en reveal séquentiel avec un connecteur horizontal
**And** les sections alternent entre fond clair et fond sombre pour le rythme visuel

### Story 2.5: Section Boutique

As a visiteur,
I want voir la boutique physique avec des photos et une description chaleureuse,
So that j'aie envie de me déplacer en magasin.

**Acceptance Criteria:**

**Given** le visiteur scrolle vers la section Boutique (FR6)
**When** la section entre dans le viewport
**Then** le texte apparaît en reveal-left et la grille photos en reveal-right
**And** les données proviennent de lib/data/
**And** la mise en page est responsive (2 colonnes desktop, empilé mobile)

### Story 2.6: Sections Équipe et Avis — grille desktop, swipe Tinder mobile

As a visiteur,
I want découvrir l'équipe et lire les avis clients de manière engageante,
So that je me sente en confiance et connecté aux personnes de la boutique.

**Acceptance Criteria:**

**Given** le visiteur est sur desktop (FR9, FR10)
**When** les sections Équipe et Avis entrent dans le viewport
**Then** l'équipe s'affiche en grille 2×2 avec les 4 membres (David, François, Mathys, Christophe)
**And** les avis s'affichent en grille 2×3 avec 6 avis Google
**And** les cartes apparaissent avec reveal staggeré

**Given** le visiteur est sur mobile (FR25)
**When** les sections Équipe et Avis entrent dans le viewport
**Then** les cartes sont empilées en mode Tinder swipe
**And** le swipe se déclenche après un seuil de 50px de déplacement horizontal
**And** la carte swipée affiche une rotation (max ±15°) et une opacité décroissante
**And** la carte part dans la direction du swipe (gauche ou droite)
**And** le swipe n'entre PAS en conflit avec le scroll vertical natif
**And** les données proviennent de lib/data/team.ts et lib/data/reviews.ts

### Story 2.7: CTA final et roue vélo scroll progress

As a visiteur,
I want voir un CTA final fort en bas de page et suivre ma progression de scroll,
So that je sois incité à agir et que je sache où j'en suis dans la page.

**Acceptance Criteria:**

**Given** le visiteur scrolle vers le bas de la homepage (FR6)
**When** la section CTA final entre dans le viewport
**Then** un bloc centré avec 2 boutons (Appeler tel:, Prendre RDV) apparaît en reveal
**And** le CTA "Appeler" déclenche un appel téléphonique (FR19)
**And** le CTA "Prendre RDV" est visible (FR20)

**Given** le visiteur scrolle la page (FR5)
**When** le scroll progresse
**Then** la roue vélo rotative tourne proportionnellement à la progression
**And** la barre de progression se remplit
**And** des waypoints de section sont visibles sur la barre de progression
**And** la roue est fixée sur le bord droit de l'écran

### Story 2.8: Système d'animations reveal et parallax

As a visiteur,
I want que les éléments apparaissent progressivement au scroll avec des effets de profondeur,
So that l'expérience de navigation soit immersive et narrative.

**Acceptance Criteria:**

**Given** le visiteur scrolle la homepage (FR23)
**When** un élément avec une classe reveal-* entre dans le viewport
**Then** l'animation correspondante se joue : fade-in, slide-left, slide-right, ou scale-in
**And** le hook useReveal utilise IntersectionObserver pour détecter l'entrée
**And** les animations reveal sont staggerées quand plusieurs éléments sont dans le même conteneur

**Given** des éléments décoratifs ont un attribut data-speed (FR24)
**When** le visiteur scrolle
**Then** ces éléments se déplacent à des vitesses différentes (parallax multi-vitesse)
**And** le parallax est piloté par requestAnimationFrame (rAF-throttled, NFR9)

**Given** le visiteur a activé prefers-reduced-motion (FR28)
**When** la page se charge
**Then** toutes les animations reveal sont instantanées (pas de transition)
**And** tous les effets parallax sont désactivés
**And** le swipe Tinder fonctionne toujours (c'est une interaction, pas une animation décorative)

---

## Epic 3: Catalogue Vélos & Atelier Réparation

**Goal:** Livrer les pages catalogue vélos (listing + 5 catégories) et la section réparation complète (SVG interactif, carrousel services, grille tarifaire, processus 4 étapes, avantages atelier).

### Story 3.1: Page Nos Vélos — listing des 5 catégories

As a visiteur,
I want voir les 5 catégories de vélos disponibles sur une page dédiée,
So that je puisse choisir la catégorie qui correspond à mon besoin.

**Acceptance Criteria:**

**Given** le visiteur accède à /nos-velos (FR7)
**When** la page se charge
**Then** 5 catégories sont affichées : ville, électrique, VTT, enfants, accessoires
**And** chaque catégorie est cliquable et mène vers /nos-velos/[category]
**And** les animations reveal fonctionnent (FR39, corrigé en Story 1.4)
**And** les classes CSS dynamiques fonctionnent (FR38, corrigé en Story 1.3)
**And** les données proviennent de lib/data/categories.ts
**And** la page est statiquement générée (SSG)

### Story 3.2: Pages catégorie vélos — détail avec conseil et marques

As a visiteur,
I want accéder à une page dédiée par catégorie avec description détaillée, angle conseil et marques distribuées,
So that je puisse m'informer avant de me déplacer en boutique.

**Acceptance Criteria:**

**Given** le visiteur accède à /nos-velos/ville (ou toute autre catégorie) (FR8)
**When** la page se charge
**Then** la page affiche le titre de la catégorie, une description détaillée, un angle conseil et les marques distribuées
**And** les marques partenaires (Orbea, Peugeot Cycles, Gitane, Velodeville, Lombardo, Sparta) sont affichées avec leurs logos quand applicable (FR12)
**And** un CTA Velodeville ouvre le configurateur dans un nouvel onglet avec h_ident=10144 (FR22, NFR22)
**And** les 5 pages catégorie sont statiquement générées via generateStaticParams
**And** un CtaBlock est présent en bas de page

### Story 3.3: SVG vélo interactif avec 6 hotspots cliquables

As a visiteur,
I want explorer les services de réparation en cliquant sur les zones d'un vélo interactif,
So that je comprenne visuellement quels services sont proposés.

**Acceptance Criteria:**

**Given** le visiteur est sur /reparations en desktop (FR14)
**When** la page se charge
**Then** un SVG vélo (600×380) s'affiche avec 6 hotspots cliquables : révision, roues, freinage, transmission, électrique, urgences
**And** chaque hotspot a un cercle pulsant pour indiquer l'interactivité
**And** cliquer sur un hotspot sélectionne le service correspondant dans le carrousel/détail
**And** les hotspots sont accessibles au clavier : Tab pour naviguer entre eux, Enter pour sélectionner (NFR19)

**Given** le visiteur est sur mobile (FR15)
**When** la page se charge
**Then** le SVG interactif est remplacé par un carrousel horizontal des 6 services
**And** le carrousel est swipable au doigt

### Story 3.4: Carrousel services et grille tarifaire

As a visiteur,
I want naviguer entre les 6 services de réparation et consulter les tarifs indicatifs,
So that je puisse estimer le coût avant de prendre rendez-vous.

**Acceptance Criteria:**

**Given** le visiteur est sur /reparations (FR15, FR16)
**When** il interagit avec le carrousel (desktop: vertical, mobile: horizontal)
**Then** le détail du service sélectionné s'affiche avec description et tarif indicatif
**And** la navigation entre services est fluide (transition CSS)
**And** la grille tarifaire indicative est affichée dans une section dédiée
**And** les données des services et tarifs proviennent de lib/data/services.ts

### Story 3.5: Section avantages atelier "Pourquoi nous confier votre vélo"

As a visiteur,
I want lire les arguments convaincants de l'atelier,
So that je sois convaincu de confier mon vélo à Colombes Cycles plutôt qu'à un concurrent.

**Acceptance Criteria:**

**Given** le visiteur est sur /reparations (FR18)
**When** la section avantages entre dans le viewport
**Then** 5 avantages s'affichent en grille avec icônes SVG
**And** les avantages apparaissent en reveal staggeré
**And** les données proviennent de lib/data/advantages.ts
**And** le composant WhyUsGrid existant est utilisé et alimenté par les données centralisées

---

## Epic 4: À Propos, Contact & Blog

**Goal:** Finaliser les pages secondaires — À propos (histoire fondateur, valeurs, certification BOSCH), Contact (formulaire fonctionnel, carte Maps, Server Action), Blog (structure prête avec placeholders).

### Story 4.1: Page À propos — histoire, valeurs et certification

As a visiteur,
I want découvrir l'histoire de David, les valeurs de la boutique et la certification BOSCH,
So that je me sente en confiance et connecté à des passionnés authentiques.

**Acceptance Criteria:**

**Given** le visiteur accède à /a-propos (FR11)
**When** la page se charge
**Then** l'histoire du fondateur est racontée via le composant StorySection avec blockquotes terracotta
**And** les 5 valeurs (Franchise, Maîtrise, Ancrage, Soin, Caractère) sont affichées via ValuesGrid
**And** la certification BOSCH eBike est mise en avant
**And** les marques partenaires sont listées (FR12)
**And** un CtaBlock invite à visiter la boutique ou appeler
**And** les animations reveal fonctionnent sur tous les éléments

### Story 4.2: Page Contact — formulaire, carte et informations

As a visiteur,
I want accéder à toutes les informations de contact et pouvoir envoyer un message,
So that je puisse contacter la boutique par le moyen de mon choix.

**Acceptance Criteria:**

**Given** le visiteur accède à /contact (FR21, FR41)
**When** la page se charge
**Then** le numéro de téléphone est affiché et cliquable (lien tel:)
**And** les horaires d'ouverture sont affichés
**And** l'adresse physique est affichée
**And** une carte Google Maps s'affiche en lazy-loading (iframe, NFR23)
**And** la carte Maps ne capture PAS le scroll (pointer-events: none par défaut, activé au clic)
**And** le composant ContactForm est importé et affiché sur la page

### Story 4.3: Formulaire contact fonctionnel avec Server Action

As a visiteur,
I want soumettre un message via le formulaire de contact et recevoir une confirmation,
So that je puisse communiquer avec la boutique sans passer par le téléphone.

**Acceptance Criteria:**

**Given** le visiteur remplit le formulaire contact (FR42)
**When** il soumet le formulaire avec nom, email et message
**Then** une Server Action traite la soumission
**And** les données sont envoyées via Resend API (ou équivalent) en HTTPS (NFR15)
**And** le formulaire collecte uniquement nom, email, message (NFR12)
**And** un message de confirmation s'affiche en cas de succès
**And** un message d'erreur explicite s'affiche en cas d'échec
**And** le formulaire informe l'utilisateur du traitement de ses données (mention RGPD)
**And** la validation côté client empêche la soumission de champs vides ou d'email invalide

### Story 4.4: Page Blog — structure placeholder

As a visiteur,
I want voir la page blog avec des articles en attente,
So that je sache que du contenu est à venir.

**Acceptance Criteria:**

**Given** le visiteur accède à /blog (FR13)
**When** la page se charge
**Then** une grille de 4 articles placeholder s'affiche via BlogGrid
**And** les liens des articles sont désactivés (FR43, corrigé en Story 1.4)
**And** un message indique que le contenu arrive prochainement
**And** un CtaBlock est présent en bas de page

---

## Epic 5: SEO & Discoverabilité Google

**Goal:** Maximiser la visibilité Google — sitemap XML dynamique, JSON-LD validé, meta tags complets, breadcrumbs, redirections 301 WordPress, robots.txt.

### Story 5.1: Meta tags, canonical URLs et OpenGraph sur toutes les pages

As a moteur de recherche,
I want lire des meta title, description, canonical URL et OpenGraph/Twitter Cards sur chaque page,
So that les pages soient correctement indexées et affichées dans les résultats.

**Acceptance Criteria:**

**Given** chaque page publique du site (FR31)
**When** la page est chargée
**Then** elle possède un meta title unique et descriptif (< 60 caractères)
**And** elle possède une meta description unique (< 160 caractères)
**And** elle possède une canonical URL absolue pointant vers elle-même (NFR28)
**And** elle possède des balises OpenGraph (og:title, og:description, og:image, og:url)
**And** elle possède des balises Twitter Card (twitter:card, twitter:title, twitter:description)
**And** les metadata sont générées via l'API metadata de Next.js (export const metadata ou generateMetadata)

### Story 5.2: Données structurées JSON-LD sur toutes les pages

As a moteur de recherche,
I want lire les données structurées JSON-LD sur chaque page,
So that les rich results s'affichent dans les résultats Google.

**Acceptance Criteria:**

**Given** la page d'accueil et la page contact (FR30)
**When** la page est chargée
**Then** un JSON-LD LocalBusiness + BikeStore est injecté dans le head
**And** il contient : nom, adresse, téléphone, horaires, note Google, géolocalisation

**Given** la page /reparations
**When** la page est chargée
**Then** un JSON-LD Service est injecté pour chaque service de réparation

**Given** toutes les pages intérieures (FR32)
**When** la page est chargée
**Then** un JSON-LD BreadcrumbList est injecté via le composant Breadcrumb existant
**And** le fil d'Ariane visuel est affiché via le composant PageHero/Breadcrumb

**Given** les données JSON-LD (NFR24)
**When** elles sont testées via le Rich Results Test de Google
**Then** aucune erreur n'est remontée

### Story 5.3: Sitemap XML dynamique et robots.txt

As a moteur de recherche,
I want accéder à un sitemap XML complet et un robots.txt configuré,
So that toutes les pages publiques soient indexées et les pages admin exclues.

**Acceptance Criteria:**

**Given** le fichier app/sitemap.ts existe déjà (FR29)
**When** le sitemap est généré
**Then** il contient toutes les routes publiques : /, /nos-velos, /nos-velos/ville, /nos-velos/electrique, /nos-velos/vtt, /nos-velos/enfants, /nos-velos/accessoires, /reparations, /a-propos, /contact, /blog, /mentions-legales (FR37)
**And** chaque URL a une lastModified, changeFrequency et priority appropriées

**Given** le fichier app/robots.ts existe déjà (NFR26)
**When** le robots.txt est généré
**Then** il autorise le crawl de toutes les pages publiques
**And** il bloque le crawl de /admin/* (Disallow: /admin)
**And** il référence le sitemap XML

### Story 5.4: Redirections 301 WordPress → Next.js

As a visiteur arrivant depuis un ancien lien,
I want être automatiquement redirigé vers la bonne page du nouveau site,
So that je ne tombe pas sur une page 404.

**Acceptance Criteria:**

**Given** un visiteur accède à une ancienne URL WordPress (FR33)
**When** le serveur reçoit la requête
**Then** une redirection 301 permanente est émise vers la page Next.js correspondante
**And** les redirections sont configurées dans next.config.ts via redirects()
**And** les principales anciennes URLs sont couvertes : /accueil → /, /nos-velos-2 → /nos-velos, /atelier → /reparations, /a-propos-2 → /a-propos, /contact-2 → /contact
**And** les redirections sont testables en local via `next dev`

---

## Epic 6: Accessibilité, Conformité Légale & Performance

**Goal:** Atteindre les standards de qualité — WCAG 2.1 AA complet, mentions légales conformes, Lighthouse ≥ 95, Core Web Vitals dans les seuils, bundle < 150 KB.

### Story 6.1: Audit et corrections accessibilité WCAG 2.1 AA

As a visiteur en situation de handicap,
I want que le site soit pleinement accessible au clavier, avec des contrastes suffisants et une structure sémantique correcte,
So that je puisse naviguer et accéder à toutes les informations.

**Acceptance Criteria:**

**Given** tous les éléments interactifs du site (FR35, NFR19)
**When** je navigue au clavier (Tab, Shift+Tab, Enter, Escape)
**Then** tous les liens, boutons, CTA et hotspots SVG sont atteignables et activables
**And** le focus est visible sur chaque élément (outline ou ring)
**And** le menu dropdown se ferme avec Escape

**Given** tous les textes et arrière-plans (NFR17)
**When** je vérifie les contrastes
**Then** le ratio est ≥ 4.5:1 pour le texte normal et ≥ 3:1 pour le texte large

**Given** toutes les images (NFR20)
**When** je vérifie les attributs alt
**Then** les images décoratives ont alt="" et les images informatives ont un alt descriptif

**Given** chaque page (NFR21)
**When** je vérifie la hiérarchie des headings
**Then** il y a un seul h1 par page et aucun saut de niveau (h1 → h2 → h3)

### Story 6.2: Mentions légales complètes et conformes

As a visiteur,
I want consulter des mentions légales complètes et conformes à la loi française,
So that je sache qui est derrière le site et comment mes données sont traitées.

**Acceptance Criteria:**

**Given** le visiteur accède à /mentions-legales (FR36, FR46, NFR13)
**When** la page se charge
**Then** les mentions contiennent : raison sociale, forme juridique, SIRET, adresse du siège, directeur de publication
**And** les mentions contiennent : nom et adresse de l'hébergeur
**And** les mentions contiennent : politique de données personnelles (données collectées, finalité, durée de conservation, droits RGPD)
**And** les mentions contiennent : conditions d'utilisation du site
**And** la page utilise le design system (PageHero, typographie Syne/Inter, couleurs du thème)

### Story 6.3: Optimisation performance — Lighthouse ≥ 95 et Core Web Vitals

As a visiteur,
I want que le site se charge rapidement et soit réactif,
So that mon expérience soit fluide, même sur mobile avec une connexion moyenne.

**Acceptance Criteria:**

**Given** toutes les pages publiques (NFR1)
**When** je lance un audit Lighthouse en mode mobile et desktop
**Then** le score Performance est ≥ 95

**Given** la page d'accueil (NFR2, NFR3, NFR4, NFR6)
**When** je mesure les Core Web Vitals
**Then** LCP < 2.5 secondes
**And** CLS < 0.1
**And** INP < 200ms
**And** FCP < 1.8 secondes

**Given** le bundle JavaScript du site public (NFR5)
**When** je mesure sa taille après build
**Then** le bundle total est < 150 KB gzipped
**And** chaque route est code-splittée (pas de chargement monolithique)

**Given** les animations (NFR9)
**When** elles sont actives pendant le scroll
**Then** le frame rate ne descend pas en dessous de 30 FPS
**And** toutes les animations scroll sont throttlées via requestAnimationFrame
