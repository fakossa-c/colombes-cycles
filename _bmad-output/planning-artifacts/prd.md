---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain-skipped
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
classification:
  projectType: web_app
  projectTypeDetail: "Site vitrine SSG + dashboard admin SSR (même app Next.js, route groups séparés)"
  domain: general
  domainDetail: "Commerce local cycles — pas de contrainte réglementaire forte"
  complexity: medium
  complexityDetail: "Domaine simple, mais SSG + admin dashboard + BDD + gestion media = complexité technique réelle"
  projectContext: brownfield
  projectContextDetail: "Code Next.js 16 existant avec 31 composants, 8 routes, système d'animations 6 couches"
  architectureDecision: "Monolithe Next.js App Router avec route groups (site) et (admin) séparés — zéro impact bundle côté site"
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-Colombes-cycles-2026-03-03.md
  - audit.md
  - brand-strategy.md
  - copy.md
  - seo-strategy.md
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/component-inventory.md
  - docs/development-guide.md
  - docs/source-tree-analysis.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 10
workflowType: 'prd'
date: 2026-03-03
author: Fakos
projectName: Colombes-cycles
---

# Product Requirements Document - Colombes-cycles

**Author:** Fakos
**Date:** 2026-03-03

## Executive Summary

Colombes Cycles est un commerce de cycles indépendant à Colombes (92700), fondé par David Thibault — vélociste formé dès 14 ans, 22 ans d'expérience terrain, certification BOSCH eBike. L'équipe de 4 techniciens (David, François, Mathys, Christophe) cumule une note Google de 4.8/5 sur 271 avis. La réputation en boutique est excellente ; la présence web est un frein.

Le site WordPress actuel (thème OceanWP) est non responsive, visuellement générique (palette turquoise, slider lent, typo sans identité), avec une navigation à 3 liens dont un en 404, aucune meta description, aucun catalogue vélos, et 114 images non optimisées. Le fossé entre la qualité de l'expérience en magasin et la pauvreté du site est le problème central. Les cyclistes cherchant un vélociste à Colombes en ligne n'ont aucune raison de choisir cette boutique plutôt qu'une autre — alors que 271 clients satisfaits disent exactement le contraire.

Ce projet est une refonte intégrale vers un site Next.js 16 (App Router) statique, mobile-first, avec une direction artistique forte (anthracite/ivoire/terracotta/crème, Syne + Inter) et un système de 6 couches d'animations 100% custom (parallax rAF, reveal IntersectionObserver, swipe Tinder mobile, SVG interactif à hotspots, marquee infini, utilitaires CSS). Aucune librairie d'animation tierce. Le contenu intégral est rédigé (copy, SEO, brand strategy) — pas de lorem ipsum.

L'architecture est un monolithe Next.js avec route groups : `(site)` pour le vitrine public en SSG et `(admin)` pour un dashboard futur en SSR. Cette séparation garantit zéro impact sur le bundle et les performances du site public. La base de données et la gestion média alimenteront à terme un CMS intégré, puis des outils métier pour l'atelier (scope à définir).

### What Makes This Special

1. **Démo commerciale vivante** — Le site est d'abord un outil de vente destiné à convaincre David Thibault d'acheter la refonte. Chaque animation et interaction vise le moment "wow" de la présentation.
2. **Craft sans dépendance** — 6 couches d'animations custom, zéro librairie tierce (pas de Framer Motion, pas de GSAP). Résultat premium, stack minimale, Lighthouse > 95.
3. **Contenu prêt au lancement** — Audit UX, stratégie de marque avec 4 personas, copywriting intégral de toutes les pages, stratégie SEO locale avec 10 mots-clés prioritaires et 10 articles blog planifiés.
4. **Trajectoire produit** — Le site vitrine est le MVP. Le dashboard admin (V2) donnera l'autonomie sur le contenu. L'outil métier atelier (V3+) transformera l'app en solution business complète. L'architecture monolithe Next.js supporte cette croissance sans refactoring.
5. **Configurateur Velodeville intégré** — Le fabricant Velo de Ville propose un configurateur vélo en ligne (`konfigurator.velo-de-ville.com`) avec Colombes Cycles identifié comme revendeur (`h_ident=10144`). MVP : lien externe avec CTA dans le design system. Investigation en cours pour intégration iframe ou embed. Scope exact à déterminer.

## Project Classification

| Attribut | Valeur |
|---|---|
| **Type** | Web app — Site vitrine SSG + dashboard admin SSR (même app Next.js, route groups séparés) |
| **Domaine** | Commerce local (cycles) — pas de contrainte réglementaire forte |
| **Complexité** | Moyenne — domaine simple, mais SSG + admin + BDD + gestion media + animations custom |
| **Contexte** | Brownfield — code Next.js 16 existant (31 composants, 8 routes, animations 6 couches) |
| **Stack** | Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, SSG |

## Success Criteria

### User Success

| Critère | Indicateur mesurable | Cible |
|---|---|---|
| **Première impression** | Temps passé sur la page d'accueil | > 45 secondes |
| **Exploration** | Pages vues par session | > 2.5 |
| **Engagement mobile** | Taux de rebond mobile | < 50% |
| **Parcours complet** | Visiteurs atteignant le CTA final | > 30% |
| **Conversion** | Clics "Appeler" / "Prendre RDV" | Mesurable via GA4 events |
| **Confiance instantanée** | Le visiteur identifie en < 10s : certification BOSCH, note 4.8/5, 15 ans d'expérience | Vérifié par test utilisateur |

### Business Success

| Objectif | Horizon | Cible |
|---|---|---|
| **Décrocher le contrat** | Présentation | David Thibault veut acheter la refonte — critère n°1 |
| **Visibilité Google locale** | 6 mois | Top 10 sur "magasin vélo Colombes", "réparation vélo Colombes" |
| **Trafic organique** | 6 mois | +50% d'impressions vs. site actuel |
| **Appels via le site** | 3 mois | Hausse mesurable via GA4 / call tracking |
| **Indexation complète** | 1 mois | 100% des pages indexées dans Search Console |

### Technical Success

> Détails et outils de vérification → voir NFR1–NFR9 (Performance), NFR16–NFR21 (Accessibilité), NFR25–NFR28 (SEO)

| Métrique | Cible |
|---|---|
| **Lighthouse Performance** | > 95/100 (mobile + desktop) |
| **Lighthouse SEO** | > 95/100 |
| **Core Web Vitals** | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| **Bundle site public** | Zéro code admin dans le bundle SSG |
| **SSG** | 100% des pages publiques statiquement générées |
| **Accessibilité** | WCAG 2.1 AA sur les pages publiques |

### Measurable Outcomes

- **Moment "wow"** : La réaction de David Thibault à la présentation du site est le KPI émotionnel. Il doit avoir envie de le montrer à ses fournisseurs et à l'association Les Vitrines de Colombes.
- **Zéro lorem ipsum** : 100% du contenu visible est le vrai contenu rédigé (copy.md).
- **Mobile impeccable** : Les animations Tinder-swipe, le responsive, la navigation fonctionnent parfaitement sur iOS Safari et Android Chrome.
- **SEO prêt au lancement** : Toutes les meta, le schema.org (LocalBusiness + BikeStore, Service, BreadcrumbList), le sitemap, les canonicals sont en place et validés via Rich Results Test.

## Product Scope & Phased Development

### MVP Strategy & Philosophy

**Approche : Experience MVP** — Le MVP n'est pas un produit minimal fonctionnel, c'est une **démo commerciale à haute valeur expérientielle**. L'objectif est de **vendre une prestation** en montrant un résultat fini spectaculaire. Chaque feature MVP contribue au moment "wow" de la présentation à David Thibault.

**Resource :** 1 développeur full-stack (Fakos) + contenu déjà rédigé (copy, SEO, brand). Design intégré au développement.

### MVP — Phase 1

**8 pages complètes avec contenu rédigé :**
1. **Accueil** (`/`) — Hero parallax + bande de confiance marquee + services + processus réparation + boutique + équipe (swipe Tinder mobile) + avis clients (swipe Tinder mobile) + CTA final
2. **Nos Vélos** (`/nos-velos`) — Grille des 5 catégories avec navigation visuelle
3. **Pages catégories** (`/nos-velos/[category]`) — 5 pages SSG (ville, électrique, VTT, enfants, accessoires)
4. **Réparations** (`/reparations`) — SVG vélo interactif avec hotspots, carrousel services, grille tarifaire, avantages atelier
5. **À propos** (`/a-propos`) — Histoire de David, grille valeurs, certification BOSCH, marques partenaires
6. **Contact** (`/contact`) — Téléphone, horaires, adresse, Google Maps iframe
7. **Blog** (`/blog`) — Grille d'articles (structure prête, contenu placeholder)
8. **Mentions légales** (`/mentions-legales`)

**Système d'animations (6 couches)** — CSS hero, reveal IntersectionObserver, parallax rAF, swipe Tinder, SVG interactif, utilitaires CSS

**SEO technique complet** — Metadata, canonical, OpenGraph, JSON-LD, sitemap.ts, robots.ts

**Configurateur Velodeville** — CTA avec lien externe vers `konfigurator.velo-de-ville.com` (h_ident=10144), intégré dans le design system

**Infrastructure** — Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, SSG, route group `(site)`

> Détail des capabilities MVP → voir FR1–FR46

**Core User Journeys Supported au MVP :**

| Journey | Supporté ? | Justification |
|---|---|---|
| Marc (VAE) — parcours principal | Oui | Toutes les pages et interactions nécessaires |
| Camille (primo) — mobile-first | Oui | Swipe Tinder, catégories, responsive |
| Thierry (expert) — expertise | Oui | Pages marques, bios équipe, histoire |
| Sophie (budget) — tarifs | Oui | Grille tarifaire, arguments anti-sur-vente |
| David (acheteur) — wow | Oui | Critère n°1 |
| David (admin) — dashboard | Non | V2 |
| Visiteur (erreur) — 404 | Oui | 301 redirects + 404 custom |

**Explicitly Out of MVP :** Dashboard admin (V2), base de données (V2), formulaire contact fonctionnel (V1.1), routes blog individuelles (V1.1), images réelles (pré-lancement), GA4/Search Console (pré-lancement), PWA (V2+), outil atelier (V3+)

### Phase 1.1 — Pré-lancement / Quick wins

- Formulaire contact connecté (server action ou Resend)
- Routes `/blog/[slug]` avec articles SEO
- Images réelles (photos magasin, équipe, vélos)
- GA4 + Google Search Console configurés
- Déploiement Vercel + domaine colombes-cycles.fr
- CI/CD basique

### Phase 2 — Dashboard Admin

- Route group `(admin)` avec authentification
- BDD (PostgreSQL via Prisma ou Drizzle)
- CRUD contenu : textes, tarifs, images
- Gestion média (upload, optimisation, affectation)
- Rebuild/revalidation automatique du site public
- Configurateur Velodeville en iframe (si faisable)
- Tests automatisés (Vitest + Testing Library)

### Phase 3 — Outil Métier & PWA

- PWA scopée au dashboard admin
- Outil atelier (gestion réparations, suivi vélos, RDV, historique) — scope à co-définir avec David
- Catalogue vélos dynamique alimenté par le dashboard
- Système de prise de RDV intégré
- Espace client fidélité
- Google Business Profile API (avis en temps réel)

## User Journeys

### Journey 1 — Marc, 44 ans, "Le Converti au VAE" (parcours principal)

**Scène d'ouverture :** Mardi 18h, Marc rentre du bureau à La Défense sur son VAE Bosch à 3 200€. L'assistance coupe brusquement en pleine côte. Il sort son iPhone, tape "réparation vélo électrique Colombes" en marchant à côté de son vélo.

**Action montante :** Google affiche Colombes Cycles — les rich snippets montrent 4.8/5, "Certifié BOSCH eBike", horaires jusqu'à 19h. Il clique. Le hero le rassure immédiatement : "Ici, on connaît votre vélo." La bande de confiance confirme : certifié BOSCH, 15 ans, 1ère révision offerte. Il scrolle vers la page Réparations. Le SVG interactif attire son attention — il clique sur la zone "Électrique" et lit que Mathys est certifié BOSCH avec diagnostic gratuit. Les tarifs sont affichés clairement.

**Climax :** Marc tape sur le CTA "Appeler" dans la topbar. Christophe décroche et lui dit de passer demain matin, diagnostic gratuit. Marc sent qu'il parle à quelqu'un qui comprend son problème sans jargon condescendant.

**Résolution :** Le lendemain, Mathys diagnostique un capteur de couple défaillant, répare en 2h. Marc repart avec son VAE et la certitude qu'il a trouvé SON atelier. Il laisse un avis 5 étoiles le soir même.

**Capabilities révélées :** Topbar avec téléphone toujours visible, page réparations avec SVG interactif, tarifs clairs, rich snippets Google, CTA "Appeler" trackable, meta descriptions optimisées pour "réparation vélo électrique Colombes".

---

### Journey 2 — Camille, 28 ans, "La Primo-Acheteuse" (parcours mobile-first)

**Scène d'ouverture :** Camille vient d'emménager à Colombes. Elle veut un vélo pour aller au travail mais ne connaît rien. Elle tape "magasin vélo Colombes" sur son Android dans le métro.

**Action montante :** Elle arrive sur la homepage mobile. Le hero plein écran et la typo Syne lui donnent une première impression de qualité — pas un site cheap. Elle scrolle. Les cartes avis clients apparaissent en stack Tinder. Elle swipe : "J'ai posé des questions idiotes et ils ont répondu sérieusement." Ça la rassure. Elle swipe encore. "David m'a expliqué exactement ce qu'il me fallait." Elle navigue vers Nos Vélos, catégorie "Vélos de ville". L'angle conseil dit : "Parlez-nous de votre trajet, de la distance, du terrain. On vous orientera vers le bon modèle."

**Climax :** Le ton non-intimidant et les témoignages de gens comme elle la convainquent. Elle clique sur "Prendre RDV" avec la certitude de ne pas se faire arnaquer.

**Résolution :** Samedi, elle pousse la porte. David lui pose 3 questions, lui recommande un vélo à 750€ au lieu du 1 200€ qu'elle envisageait. Elle repart avec le bon vélo et la première révision offerte.

**Capabilities révélées :** Swipe Tinder avis clients mobile, navigation catégories vélos intuitive, angle conseil non-technique, CTA "Prendre RDV", responsive mobile impeccable, reveal animations fluides sur Android.

---

### Journey 3 — Thierry, 58 ans, "Le Passionné Cycliste" (parcours expertise)

**Scène d'ouverture :** Thierry cherche un revendeur Orbea dans le 92 pour remplacer son groupe Shimano 105 par un Ultegra. Il tape "Orbea Colombes".

**Action montante :** Il arrive sur la page À propos. L'histoire de David — cycliste dès 8 ans, stage vélociste à 14 ans, 22 ans chez Cycles Moisdon — lui parle. C'est un vrai. Les valeurs "Maîtrise" et "Caractère" résonnent. Il va sur la page Nos Vélos, catégorie Vélos électriques, et voit qu'Orbea est bien distribué. Le design premium du site le conforte : ce n'est pas un généraliste.

**Climax :** Il lit la bio de François : "celui à qui vous parlez de groupes Shimano et de géométrie de cadre sans qu'il lève les yeux au ciel." C'est exactement ce qu'il cherche.

**Résolution :** Thierry appelle, demande François, et discute 15 minutes de la compatibilité Ultegra avec son cadre. Il passe en boutique la semaine suivante.

**Capabilities révélées :** Pages marques, bios équipe détaillées, page à propos avec histoire authentique, design qui crédibilise l'expertise, SEO sur "Orbea Colombes".

---

### Journey 4 — Sophie, 37 ans, "La Cycliste du Quotidien" (parcours budget)

**Scène d'ouverture :** Le frein arrière de Sophie grince depuis 3 jours. Elle vélotaffe à l'hôpital Louis-Mourier et ne peut pas se permettre une facture surprise. Elle cherche "révision vélo Colombes pas cher".

**Action montante :** Elle arrive sur la page Réparations. La grille tarifaire indicative la rassure : réglage freins mécaniques 15-25€. Elle lit "On diagnostique avant de facturer" et "On ne remplace pas ce qui n'est pas usé." C'est exactement ce qu'elle a besoin d'entendre.

**Climax :** Le point "On ne remplace pas ce qui n'est pas usé" la convainc que ces gens sont honnêtes. Pas de sur-vente.

**Résolution :** Elle passe le mardi suivant. Réglage freins à 18€, comme annoncé. Elle reviendra pour la révision annuelle.

**Capabilities révélées :** Grille tarifaire visible et claire, section "Pourquoi nous confier votre vélo" avec arguments anti-sur-vente, tarifs indicatifs honnêtes, meta description "réparation vélo Colombes".

---

### Journey 5 — David Thibault, propriétaire (parcours acheteur du site)

**Scène d'ouverture :** Fakos présente la refonte à David dans la boutique, sur un MacBook. David a vu 3 propositions de refonte avant — toutes des templates.

**Action montante :** Le hero plein écran s'affiche. "Ici, on connaît votre vélo." La roue de vélo tourne quand il scrolle. La bande de confiance défile. Les animations reveal apparaissent section par section. Il voit son équipe présentée avec des descriptions qui les décrivent vraiment. Les avis de ses vrais clients en swipe. Le SVG vélo interactif avec les hotspots. Chaque détail montre que le prestataire comprend son métier.

**Climax :** David prend le laptop et commence à scroller lui-même. Il appelle François pour lui montrer. "Regarde ce qu'ils ont fait." C'est le moment "wow".

**Résolution :** David veut le site. La conversation passe de "est-ce que ça me plaît ?" à "quand est-ce qu'on peut le mettre en ligne ?".

**Capabilities révélées :** Chaque animation et micro-interaction, contenu authentique (pas de placeholder), design premium cohérent, performance irréprochable même sur une connexion de démonstration.

---

### Journey 6 — David/Admin, gestion du contenu (parcours admin V2)

**Scène d'ouverture :** 6 mois après le lancement. David veut mettre à jour ses tarifs de révision (hausse fournisseur) et ajouter une photo du nouveau vélo Orbea en vitrine.

**Action montante :** Il se connecte au dashboard admin (`/admin`). L'interface est simple — pas un back-office WordPress avec 47 menus. Il voit "Contenu" dans la sidebar. Il clique sur "Réparations > Tarifs", modifie le prix de la révision complète de "85-120€" à "90-130€". Il va dans "Média", uploade la photo de l'Orbea, et l'affecte à la catégorie "Vélos de route".

**Climax :** Il clique "Publier". Le site se rebuild (ISR ou revalidation). Quelques secondes plus tard, les tarifs sont à jour. Les performances du site n'ont pas bougé — Lighthouse toujours > 95.

**Résolution :** David n'a pas eu besoin d'appeler Fakos. Il est autonome. Le site reste rapide et beau.

**Capabilities révélées :** Dashboard admin dans route group séparé, CRUD contenu (texte + images), rebuild/revalidation sans impact performances, interface simple et intuitive, authentification admin.

---

### Journey 7 — Visiteur, page cassée (parcours erreur/edge case)

**Scène d'ouverture :** Un visiteur clique sur un lien Google vers un ancien slug WordPress (`/reparations-velos/`) qui n'existe plus.

**Action montante :** La page 404 custom s'affiche dans le design system Colombes Cycles (pas la 404 Next.js par défaut). Le message est clair : "Cette page n'existe plus." Un CTA propose "Retour à l'accueil" et un lien vers les Réparations.

**Résolution :** Le visiteur clique, arrive sur la bonne page, et continue son parcours normalement.

**Capabilities révélées :** Redirections 301 des anciennes URLs WordPress, page 404 custom dans le design system, maillage interne depuis la 404.

---

### Journey Requirements Summary

| Parcours | Capabilities clés révélées |
|---|---|
| **Marc (VAE)** | Rich snippets, SVG interactif, tarifs, CTA téléphone, topbar sticky |
| **Camille (primo)** | Swipe Tinder mobile, catégories vélos, tone non-intimidant, responsive |
| **Thierry (expert)** | Pages marques, bios équipe, histoire David, design crédible |
| **Sophie (budget)** | Grille tarifaire, arguments anti-sur-vente, SEO "pas cher" |
| **David (acheteur)** | Animations, micro-interactions, contenu authentique, performance |
| **David (admin)** | Dashboard CRUD, gestion images, rebuild/revalidation, auth |
| **Visiteur (erreur)** | 301 redirects, 404 custom, maillage interne |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Système d'animations 100% custom sans librairie tierce**
L'industrie web utilise massivement Framer Motion, GSAP, ou Lenis pour les animations. Ce projet prend le parti inverse : 6 couches d'animations entièrement custom (CSS keyframes, IntersectionObserver, rAF parallax, touch swipe, SVG interactif, utilitaires CSS). Ce n'est pas du NIH syndrome — c'est un choix délibéré pour contrôler le bundle, les performances, et démontrer une maîtrise technique qui fait partie de la proposition commerciale.

**2. Swipe Tinder adapté au commerce local**
Le pattern swipe-to-dismiss (Tinder) appliqué à des cartes avis clients et équipe sur un site de commerce local est inhabituel. C'est un emprunt de pattern mobile-native vers un site vitrine qui crée un engagement tactile inattendu.

**3. SVG vélo interactif comme navigation**
Le vélo SVG avec 6 hotspots cliquables et cercles pulsants comme outil de navigation des services de réparation est un pattern UX original — il transforme un schéma technique en interface interactive qui parle directement au métier.

**4. Roue vélo comme indicateur de scroll**
Le `BikeWheel` qui tourne avec le scroll est une micro-interaction signature qui ancre visuellement le thème vélo dans la mécanique même du site.

**5. Architecture monolithe évolutive (site → admin → outil métier)**
La trajectoire SSG → dashboard admin → PWA outil atelier dans un même projet Next.js via route groups est une approche architecturale pragmatique qui permet à un commerce local de grandir technologiquement sans migration.

### Market Context & Competitive Landscape

Les sites de vélocistes indépendants en France utilisent quasi-exclusivement WordPress + thème générique (OceanWP, flavor, Flavor). Les chaînes (Décathlon, Alltricks) ont des sites corporate produits par des agences. Il n'existe pas de référence de site de vélociste indépendant avec ce niveau d'animation et de craft en France — c'est le différenciateur qui doit convaincre le propriétaire.

### Validation Approach

- **Performance** : Lighthouse > 95 prouve que les animations custom ne dégradent pas l'expérience
- **Réaction David** : Le moment "wow" à la présentation valide l'approche animation-first
- **Engagement mobile** : Le taux de rebond mobile < 50% valide que les interactions tactiles (swipe) fonctionnent
- **Comparaison directe** : Mettre le site en miroir avec le WordPress actuel et les concurrents locaux pour visualiser le gap

### Risk Mitigation

| Risque | Mitigation |
|---|---|
| Animations custom = maintenance complexe | Code commenté, hooks réutilisables (`useReveal`, `useParallax`), conventions documentées |
| Swipe Tinder sur certains appareils | Touch handling avec seuil 50px, fallback grille desktop, testé sur iOS Safari + Android Chrome |
| SVG interactif incompatible certains navigateurs | Fallback en grille statique si JS désactivé |
| Performances dégradées sur mobiles bas de gamme | rAF-throttled, IntersectionObserver avec seuil configurable, pas d'animation sur `prefers-reduced-motion` |
| Architecture monolithe trop couplée à terme | Route groups isolés, shared packages possibles si migration Turborepo nécessaire |

## Web App Specific Requirements

### Project-Type Overview

Application web hybride : site vitrine public en SSG (Static Site Generation) + dashboard admin en SSR (Server-Side Rendering), le tout dans un monolithe Next.js 16 App Router avec route groups isolés. Le site public est une MPA (Multi-Page Application) avec comportement SPA-like grâce aux transitions Next.js et aux animations scroll. Le dashboard admin sera une SPA classique avec state côté client.

### Technical Architecture Considerations

**SPA vs MPA :**
- Site public = MPA statique (SSG). Chaque page est un fichier HTML pré-généré au build. Navigation via `<Link>` Next.js avec prefetching.
- Dashboard admin = SPA dynamique (SSR + CSR). Layout persistant avec sidebar, state côté client, fetch API.

**Browser Support :**

| Navigateur | Version minimum | Priorité |
|---|---|---|
| Chrome (Android + Desktop) | 90+ | Critique |
| Safari (iOS + macOS) | 15+ | Critique |
| Firefox | 90+ | Secondaire |
| Edge | 90+ | Secondaire |
| Samsung Internet | 15+ | Secondaire |

Justification : le trafic local mobile est majoritairement iOS Safari et Android Chrome. Le support des 2 dernières années suffit. Pas de support IE11.

**SEO :** Oui, critique. SSG = HTML statique indexable. JSON-LD, meta descriptions, canonical URLs, sitemap.ts, robots.ts, OpenGraph — tout est en place (voir seo-strategy.md).

**Real-time :** Non requis pour le MVP. Pas de WebSocket, pas de SSE. Le dashboard admin V2 pourrait nécessiter du real-time pour la gestion collaborative — à évaluer ultérieurement.

**Accessibility :** WCAG 2.1 AA sur les pages publiques. Focus management, alt text, contraste couleurs (anthracite #1C1C1E sur ivoire #F5F0E8 = ratio > 7:1), `prefers-reduced-motion` pour désactiver les animations.

### Responsive Design

| Breakpoint | Cible | Comportement |
|---|---|---|
| < 640px | Mobile | Navigation hamburger, swipe Tinder, stack verticale, hero plein écran |
| 640-1024px | Tablette | Grilles 2 colonnes, navigation desktop, animations réduites |
| > 1024px | Desktop | Grilles complètes, parallax, hover states, SVG interactif |

Mobile-first : les styles de base ciblent le mobile, les `md:` et `lg:` enrichissent progressivement.

### Performance & SEO Targets

> Cibles détaillées et outils de vérification → voir NFR1–NFR9 (Performance), NFR25–NFR28 (SEO Technique)

**Stratégies clés :**
- Hero image `priority={true}`, fonts preloaded via `next/font` → LCP < 2.5s
- Dimensions explicites, `font-display: swap` → CLS < 0.1
- rAF-throttled, code-splitting par route → INP < 200ms, TTI < 3.5s
- Bundle < 150 KB gzip : zéro librairie d'animation tierce, tree-shaking strict
- SEO : 10 mots-clés prioritaires, 10 articles blog planifiés (voir seo-strategy.md)

### PWA Considerations (V2+)

| Aspect | Décision |
|---|---|
| **Scope** | Dashboard admin uniquement — pas le site public |
| **Service Worker** | Scopé au route group `(admin)` |
| **Manifest** | Icône Colombes Cycles, standalone display, thème anthracite |
| **Offline** | Cache-first pour l'interface admin, network-first pour les données |
| **Push notifications** | V3+ — rappels atelier (vélo prêt, RDV demain) |
| **Installation** | iPad/tablette à l'atelier — icône sur l'écran d'accueil |

### Implementation Considerations

- **Fonts** : `next/font` avec Syne (titres, 400-800) et Inter (corps), `display: swap`
- **Images** : `next/image` quand les photos réelles remplaceront les SVG placeholder — optimisation WebP automatique, lazy loading
- **CSS** : Tailwind CSS v4 avec tokens design custom (`--color-anthracite`, `--color-terracotta`, etc.) + classes d'animation dans `globals.css`
- **Routing** : App Router file-system, `generateStaticParams` pour les routes dynamiques (`/nos-velos/[category]`)
- **Données** : Statiques dans les composants (MVP), BDD + API routes (V2 dashboard)
- **Déploiement** : Vercel (SSG + serverless pour les API routes admin)

### Risk Mitigation Strategy

**Risques techniques :**

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Animations non performantes sur mobile bas de gamme | Moyenne | Élevé | rAF-throttled, `prefers-reduced-motion`, test sur devices réels |
| Bugs existants dans le code (10 identifiés dans docs) | Certaine | Moyen | Corriger les bugs critiques avant la présentation (template literal, reveal sans hook, etc.) |
| Configurateur Velodeville bloque l'iframe | Élevée | Faible | Fallback lien externe (déjà prévu comme MVP) |
| SSG + admin dans le même projet = conflits de build | Faible | Moyen | Route groups isolent complètement les bundles |

**Risques marché :**

| Risque | Mitigation |
|---|---|
| David ne veut pas acheter la refonte | Le site est une démo — si le "wow" ne marche pas, itérer sur le design avant de représenter |
| David veut des modifications majeures au contenu | Le copy est modifiable, le framework reste le même |
| Un concurrent local sort un site moderne avant | Peu probable vu le marché. Le contenu authentique + SEO = avantage durable |

**Risques ressources :**

| Risque | Mitigation |
|---|---|
| Fakos seul = bus factor 1 | Code documenté (docs/ existants), conventions claires, pas de logique complexe |
| Temps insuffisant pour finir le MVP | Le code existe déjà à 80%. Focus sur les corrections de bugs + polish |
| Budget client insuffisant pour V2 | Le MVP est autonome. V2 est un upsell naturel une fois le site live et la confiance établie |

## Functional Requirements

### Navigation & Structure du Site

- **FR1:** Le visiteur peut accéder à toutes les pages via une navigation principale sticky avec dropdown "Nos Vélos" (5 catégories)
- **FR2:** Le visiteur peut naviguer via un menu hamburger sur mobile avec animation d'ouverture/fermeture
- **FR3:** Le visiteur peut voir le numéro de téléphone et les horaires dans une barre utilitaire (topbar) toujours visible
- **FR4:** Le visiteur peut accéder au pied de page avec liens de navigation, horaires, adresse et informations de contact
- **FR5:** Le visiteur peut suivre sa progression de scroll via un indicateur visuel (roue vélo rotative)

### Découverte & Contenu Public

- **FR6:** Le visiteur peut parcourir la page d'accueil composée de 8 sections distinctes : hero, bande de confiance, services, processus réparation, boutique, équipe, avis clients, CTA final
- **FR7:** Le visiteur peut voir les 5 catégories de vélos (ville, électrique, VTT, enfants, accessoires) sur la page "Nos Vélos"
- **FR8:** Le visiteur peut accéder à une page dédiée par catégorie de vélos avec description, angle conseil et marques distribuées
- **FR9:** Le visiteur peut découvrir les membres de l'équipe avec leurs bios et spécialités — en grille desktop et en swipe Tinder sur mobile
- **FR10:** Le visiteur peut lire les avis clients Google — en grille desktop et en swipe Tinder sur mobile
- **FR11:** Le visiteur peut parcourir l'histoire du fondateur, les valeurs de la boutique et la certification BOSCH sur la page À propos
- **FR12:** Le visiteur peut voir les marques partenaires distribuées (Orbea, Peugeot Cycles, Gitane, Velodeville, Lombardo, Sparta)
- **FR13:** Le visiteur peut consulter une grille d'articles blog (structure prête, contenu placeholder au MVP)

### Services de Réparation

- **FR14:** Le visiteur peut explorer les 6 services de réparation via un SVG vélo interactif avec hotspots cliquables
- **FR15:** Le visiteur peut naviguer les services via un carrousel vertical (desktop) ou horizontal (mobile) alternatif au SVG
- **FR16:** Le visiteur peut consulter la grille tarifaire indicative des réparations
- **FR17:** Le visiteur peut visualiser le processus de réparation en 4 étapes avec connecteur horizontal
- **FR18:** Le visiteur peut lire les 5 avantages de l'atelier ("Pourquoi nous confier votre vélo")

### Conversion & Contact

- **FR19:** Le visiteur peut cliquer sur un CTA "Appeler" qui déclenche un appel téléphonique (lien `tel:`)
- **FR20:** Le visiteur peut cliquer sur un CTA "Prendre RDV" visible à plusieurs endroits du site
- **FR21:** Le visiteur peut accéder à la page contact avec téléphone, horaires, adresse et localisation
- **FR22:** Le visiteur peut accéder au configurateur Velodeville via un CTA externe intégré dans le design system

### Expérience Visuelle & Animations

- **FR23:** Le visiteur peut voir des animations de révélation (fade-in, slide-left, slide-right, scale-in) au scroll via IntersectionObserver
- **FR24:** Le visiteur peut percevoir des effets parallax multi-vitesse sur les éléments décoratifs et textes
- **FR25:** Le visiteur peut interagir avec les cartes équipe et avis en swipe Tinder sur mobile (drag-to-dismiss avec retour tactile)
- **FR26:** Le visiteur peut voir un hero plein écran avec animations d'entrée et fade-out au scroll
- **FR27:** Le visiteur peut voir une bande de confiance en défilement marquee infini
- **FR28:** Le visiteur peut désactiver toutes les animations si `prefers-reduced-motion` est activé dans ses préférences système

### SEO & Accessibilité Web

- **FR29:** Les moteurs de recherche peuvent indexer toutes les pages publiques via un sitemap XML dynamique
- **FR30:** Les moteurs de recherche peuvent lire les données structurées JSON-LD (LocalBusiness + BikeStore, Service, BreadcrumbList) sur chaque page
- **FR31:** Chaque page publique possède des meta title, meta description, canonical URL et OpenGraph/Twitter Cards
- **FR32:** Le visiteur peut naviguer via un fil d'Ariane (breadcrumb) sur toutes les pages intérieures
- **FR33:** Le visiteur arrivant sur une ancienne URL WordPress est redirigé (301) vers la page correspondante
- **FR34:** Le visiteur arrivant sur une URL inexistante voit une page 404 custom dans le design system avec navigation de secours
- **FR35:** Le site respecte les exigences d'accessibilité WCAG 2.1 AA (contraste, focus management, alt text)

### Pages Légales & Conformité

- **FR36:** Le visiteur peut consulter les mentions légales complètes (SIRET, forme juridique, hébergeur, RGPD)
- **FR37:** La route `/mentions-legales` est incluse dans le sitemap

### Corrections de Bugs Existants (Brownfield)

- **FR38:** Les classes CSS dynamiques dans les pages catégorie vélos fonctionnent correctement (correction du template literal cassé dans `/nos-velos/[category]`)
- **FR39:** Les animations reveal fonctionnent sur la page `/nos-velos` (ajout de `useReveal` — conversion en client component ou refactoring)
- **FR40:** Le composant Button avec flèche SVG fonctionne avec l'effet hover (ajout de la classe `group` au parent)
- **FR41:** Le ContactForm est importé et affiché sur la page `/contact`
- **FR42:** Le ContactForm soumet effectivement les données (via server action, Resend ou autre backend)
- **FR43:** Les liens blog pointent vers des routes fonctionnelles (ou sont désactivés si les routes `/blog/[slug]` ne sont pas encore créées)
- **FR44:** L'animation du menu mobile hamburger est connectée et fonctionnelle
- **FR45:** La clé API est déplacée de `.env` vers `.env.local` (gitignored)
- **FR46:** Les mentions légales contiennent les informations obligatoires (SIRET, forme juridique) — cf. FR36

## Non-Functional Requirements

### Performance

| NFR | Critère mesurable | Outil de vérification |
|---|---|---|
| **NFR1:** Le site public atteint un score Lighthouse Performance ≥ 95 sur mobile et desktop | Score ≥ 95/100 | PageSpeed Insights |
| **NFR2:** Le Largest Contentful Paint (LCP) est inférieur à 2.5 secondes | LCP < 2.5s | Core Web Vitals / CrUX |
| **NFR3:** Le Cumulative Layout Shift (CLS) est inférieur à 0.1 | CLS < 0.1 | Core Web Vitals / CrUX |
| **NFR4:** L'Interaction to Next Paint (INP) est inférieur à 200ms | INP < 200ms | Core Web Vitals / CrUX |
| **NFR5:** Le bundle JavaScript total du site public est inférieur à 150 KB gzipped | < 150 KB gzip | `next build` + bundle analyzer |
| **NFR6:** Le First Contentful Paint est inférieur à 1.8 secondes | FCP < 1.8s | Lighthouse |
| **NFR7:** 100% des pages publiques sont statiquement générées (SSG) — aucun rendu serveur au runtime | Output `next build` = static pour toutes les routes `(site)` | `next build` output |
| **NFR8:** Le code du route group `(admin)` ne contamine jamais le bundle du site public | 0 bytes admin dans le bundle SSG | Webpack bundle analysis |
| **NFR9:** Les animations sont throttlées via `requestAnimationFrame` et n'impactent pas le frame rate en dessous de 30 FPS sur un appareil de milieu de gamme | ≥ 30 FPS pendant les animations | Chrome DevTools Performance |

### Sécurité & Conformité RGPD

| NFR | Critère mesurable |
|---|---|
| **NFR10:** Aucune clé API, secret ou credential n'est commité dans le dépôt Git | 0 secrets dans l'historique Git (audit via `git-secrets` ou `trufflehog`) |
| **NFR11:** Les variables d'environnement sensibles sont stockées dans `.env.local` (gitignored) | `.env.local` dans `.gitignore`, `.env` ne contient que des valeurs non-sensibles |
| **NFR12:** Le formulaire de contact collecte uniquement les données nécessaires (nom, email, message) et informe l'utilisateur de leur traitement | Conformité RGPD article 13 — mention de finalité, durée de conservation, droits |
| **NFR13:** Les mentions légales contiennent toutes les informations obligatoires (SIRET, forme juridique, directeur de publication, hébergeur, politique de données personnelles) | Vérifiable par checklist CNIL |
| **NFR14:** Le dashboard admin (V2) requiert une authentification avant tout accès | Accès `/admin/*` sans auth = redirection login |
| **NFR15:** Les données collectées via le formulaire de contact sont transmises via HTTPS uniquement | Certificat SSL valide, `Strict-Transport-Security` header |

### Accessibilité

| NFR | Critère mesurable |
|---|---|
| **NFR16:** Le site public respecte WCAG 2.1 niveau AA | Score Lighthouse Accessibility ≥ 90, audit axe-core = 0 violation critique |
| **NFR17:** Le ratio de contraste entre le texte et l'arrière-plan respecte le minimum AA (4.5:1 pour le texte normal, 3:1 pour le texte large) | Vérifiable avec le color contrast analyzer (anthracite #1C1C1E sur ivoire #F5F0E8 = ratio > 7:1) |
| **NFR18:** Toutes les animations sont désactivées lorsque `prefers-reduced-motion: reduce` est activé | Aucune animation visible avec `prefers-reduced-motion` actif |
| **NFR19:** Tous les éléments interactifs sont accessibles au clavier (navigation, liens, CTA, SVG hotspots) | Tab navigation fonctionnelle sur toutes les pages sans souris |
| **NFR20:** Toutes les images décoratives ont un `alt=""` vide et toutes les images informatives ont un `alt` descriptif | Audit axe-core = 0 violation `image-alt` |
| **NFR21:** La structure des headings est hiérarchiquement correcte sur chaque page (un seul `h1`, pas de saut de niveau) | Audit Lighthouse heading-order = pass |

### Intégration

| NFR | Critère mesurable |
|---|---|
| **NFR22:** Le lien vers le configurateur Velodeville s'ouvre dans un nouvel onglet sans erreur et identifie le revendeur Colombes Cycles (`h_ident=10144`) | URL correcte, `target="_blank"`, `rel="noopener noreferrer"` |
| **NFR23:** L'intégration Google Maps sur la page contact se charge sans bloquer le rendu de la page | Google Maps iframe lazy-loaded, pas de CLS |
| **NFR24:** Les données structurées JSON-LD sont validées sans erreur par le Rich Results Test de Google | 0 erreur, 0 avertissement critique |

### SEO Technique

| NFR | Critère mesurable |
|---|---|
| **NFR25:** Le score Lighthouse SEO est ≥ 95 sur toutes les pages publiques | Score ≥ 95/100 |
| **NFR26:** Le fichier `robots.txt` autorise le crawl de toutes les pages publiques et bloque le route group admin | `Disallow: /admin` dans robots.txt |
| **NFR27:** Le sitemap XML est généré dynamiquement et contient toutes les routes publiques, y compris `/mentions-legales` | Toutes les routes vérifiables dans `/sitemap.xml` |
| **NFR28:** Les URLs canoniques sont correctes sur chaque page (pas de duplicate content) | 1 canonical par page, URL absolue |
