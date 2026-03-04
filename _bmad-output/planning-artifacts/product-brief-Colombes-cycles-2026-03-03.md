---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/component-inventory.md
  - docs/development-guide.md
  - docs/source-tree-analysis.md
  - audit.md
  - brand-strategy.md
  - copy.md
  - seo-strategy.md
date: 2026-03-03
author: Fakos
---

# Product Brief: Colombes-cycles

## Executive Summary

Colombes Cycles est un commerce de cycles indépendant à Colombes (92700), fondé par David Thibault — cycliste passionné depuis l'âge de 8 ans, formé au métier dès 14 ans, 22 ans chez "Cycles Moisdon" avant d'ouvrir sa propre boutique en 2016. L'équipe compte 4 personnes (David, François, Mathys, Christophe), la boutique affiche une note Google de 4.8/5 sur 271 avis, et possède la certification BOSCH eBike.

Le site actuel est un WordPress vieillissant sur thème OceanWP : non responsive, visuellement générique (palette turquoise/blanc, slider lent, typo sans personnalité), avec une navigation à 3 liens dont un en 404. Il ne transmet ni l'expertise technique, ni la passion, ni la dimension humaine qui font la réputation de la boutique. Ce fossé entre la qualité de l'expérience en magasin et la pauvreté de la présence en ligne est le problème central.

Ce projet est une refonte complète vers un site vitrine Next.js moderne, rapide et visuellement impactant — conçu pour séduire le propriétaire dès la présentation et capter les cyclistes de Colombes et alentours dès leur première visite. L'approche se différencie par un design à forte personnalité et un système d'animations et d'interactions qui rendent le site mémorable.

---

## Core Vision

### Problem Statement

Le site WordPress actuel de Colombes Cycles est un frein commercial et d'image :
- **Design daté** : palette turquoise générique, slider hero lent et impersonnel, typographie sans identité (Cabin + Gilda Display)
- **Non responsive** : expérience mobile dégradée, alors que la majorité du trafic local est mobile
- **Navigation déficiente** : 3 liens seulement, dont "Atelier Réparations" en 404, pas de breadcrumb
- **Contenu sous-exploité** : pas de catalogue vélos, pas de formulaire de contact fonctionnel, section réparations avec "etc...", aucune meta description
- **Performance médiocre** : WordPress + OceanWP = 114 images non optimisées, code lourd, développement lent à réagir

Un visiteur web qui compare avec la concurrence n'a aucune raison de choisir cette boutique plutôt qu'une autre — alors que 271 clients satisfaits disent exactement le contraire.

### Problem Impact

- **Clients perdus** : les cyclistes cherchant un vélociste à Colombes en ligne tombent sur un site qui ne donne pas confiance et passent à la concurrence
- **Image dégradée** : le fossé entre la réputation réelle (4.8/5) et l'image web est dommageable pour une boutique qui vit de la confiance
- **Opportunités manquées** : pas de catalogue, pas de formulaire, pas de contenu SEO local — le site ne génère ni visites en boutique ni prises de rendez-vous
- **Immobilisme technique** : chaque modification sur WordPress/OceanWP est lente et coûteuse, le propriétaire ne peut pas faire évoluer son site facilement

### Why Existing Solutions Fall Short

Le site actuel souffre de choix techniques obsolètes : thème WordPress générique sans personnalisation réelle, 114 images non optimisées, aucune meta description, aucun schema.org, pas de responsive design assumé. La stack est un plafond de verre — même avec un bon développeur WordPress, le résultat resterait un site "correct" mais jamais distinctif.

L'univers visuel (turquoise + Cabin + sliders génériques) est aux antipodes de l'identité artisanale et premium que la marque incarne dans le monde réel. Le site ne parle pas cycliste, ne sent pas l'atelier, ne transmet pas la passion. Il ressemble à n'importe quel commerce local qui a acheté un thème à 59€.

### Proposed Solution

Une refonte intégrale vers un site Next.js 16 statique (SSG), mobile-first, avec une direction artistique forte et un système d'animations modernes qui différencie immédiatement Colombes Cycles de tout autre site de vélociste :

- **Direction artistique premium** : palette anthracite #1C1C1E / ivoire #F5F0E8 / terracotta #C4622D / crème #FAFAF7 — univers artisanal, chaleureux, professionnel
- **Typographie à caractère** : Syne (titres, extraBold 800) + Inter (corps) — identité forte sans être agressive
- **Hero immersif** avec parallax multi-vitesse et fade-out au scroll
- **Roue de vélo interactive** comme indicateur de progression scroll (signature visuelle unique)
- **Carrousel de services** avec SVG vélo interactif à hotspots cliquables (6 zones pulsantes)
- **Système Tinder-swipe** sur les cartes équipe et avis en mobile (touch handling, seuil 50px, rotation)
- **Reveal animations** par IntersectionObserver avec stagger progressif (13 composants concernés)
- **Marquee infini** pour la preuve sociale (6 items défilants)
- **Parallax rAF-throttled** sur les sections intérieures

Le tout sans aucune dépendance à une librairie d'animation tierce — 100% custom, 100% performant.

### Key Differentiators

1. **Design à forte personnalité** : pas un template, un site sur-mesure avec une identité visuelle cohérente qui respire l'artisanat premium et la passion du vélo
2. **Animations et micro-interactions** : 6 couches d'animation custom (CSS keyframes, reveal scroll, parallax, swipe mobile, SVG interactif, utilitaires) — c'est ce qui fait le "wow" à la présentation
3. **Performance native** : Next.js SSG = temps de chargement quasi-instantané, score Lighthouse optimal, pas de runtime serveur
4. **Contenu stratégique prêt** : audit UX complet, stratégie de marque avec 4 personas, copywriting intégral de toutes les pages, et stratégie SEO locale — le site arrive avec son contenu, pas avec du lorem ipsum
5. **SEO local béton** : schema.org LocalBusiness + BikeStore, données structurées Service et BreadcrumbList, meta descriptions optimisées par page, stratégie de 10 mots-clés prioritaires, 10 articles blog planifiés

---

## Target Users

### Primary Users

#### Persona 1 — Marc, 44 ans, "Le Converti au VAE"
- **Profil** : Cadre sup à La Défense, 2 enfants, habite Colombes. A remplacé la voiture par un VAE premium (budget 3 000€+) depuis 18 mois.
- **Comportement web** : Cherche "réparation vélo électrique Colombes" ou "technicien BOSCH Colombes" quand son VAE a un problème. Consulte les avis Google avant de pousser la porte. Veut un site qui inspire confiance et qui lui donne les infos rapidement (tarifs, horaires, compétences).
- **Ce qu'il attend du site** : Trouver en 10 secondes que Colombes Cycles est certifié BOSCH, voir les tarifs de réparation, pouvoir appeler ou prendre RDV immédiatement. Un site professionnel le rassure, un site daté le fait fuir.
- **Moment "aha"** : Il voit le SVG vélo interactif sur la page réparations, clique sur "électrique", et lit que Mathys est certifié BOSCH avec diagnostic gratuit.

#### Persona 2 — Sophie, 37 ans, "La Cycliste du Quotidien"
- **Profil** : Infirmière à l'hôpital Louis-Mourier, vélotaffeuse 4 jours/5. Budget limité mais attentive à l'entretien régulier de son vélo.
- **Comportement web** : Recherche "révision vélo Colombes" ou "atelier vélo pas cher 92". Compare les prix. Sensible à l'honnêteté affichée (pas de sur-vente).
- **Ce qu'il attend du site** : Des tarifs clairs et indicatifs, la certitude qu'on ne lui vendra pas ce dont elle n'a pas besoin. Un ton direct et chaleureux.
- **Moment "aha"** : Elle lit "On diagnostique avant de facturer" et "On ne remplace pas ce qui n'est pas usé" dans la section avantages atelier.

#### Persona 3 — Thierry, 58 ans, "Le Passionné Cycliste"
- **Profil** : Retraité anticipé, vélo de route et gravel le week-end. Connaisseur technique, lit Vélo Magazine.
- **Comportement web** : Tape "Orbea Colombes" ou "magasin vélo expert 92". Veut un site qui parle son langage — composants, marques, géométrie. Juge immédiatement la crédibilité.
- **Ce qu'il attend du site** : Les marques distribuées, l'expertise affichée sans prétention, une identité de passionnés qui se voit visuellement.
- **Moment "aha"** : Les animations et le design premium lui confirment que ce n'est pas un magasin générique. La page marques avec Orbea, Peugeot Cycles, Gitane le convainc.

#### Persona 4 — Camille, 28 ans, "La Primo-Acheteuse"
- **Profil** : Jeune pro qui vient d'emménager à Colombes, veut acheter son premier vélo adulte sérieux (600–1 200€). Intimidée par le monde du vélo.
- **Comportement web** : Recherche "magasin vélo Colombes" ou "acheter vélo de ville Colombes". Visuellement sensible — un beau site la rassure, un site moche la fait douter.
- **Ce qu'il attend du site** : Une navigation intuitive vers les catégories (ville, électrique, enfants), des descriptions accessibles, un ton qui ne l'intimide pas.
- **Moment "aha"** : Le swipe Tinder sur les avis clients en mobile — elle lit les témoignages de gens comme elle et se dit "ils ont l'air cool, j'y vais".

### Secondary Users

#### David Thibault — Le propriétaire (acheteur du site)
- **Rôle** : C'est lui qui doit être convaincu d'acheter cette refonte. Il faut que le site le rende fier — qu'il ait envie de le montrer à ses clients, à ses fournisseurs, à l'association Les Vitrines de Colombes.
- **Ce qui le séduit** : Les animations (roue vélo, parallax, swipe), la mise en valeur de son équipe, le respect de son histoire et de ses valeurs. Un site qui "lui ressemble" et qu'il ne pourrait pas avoir eu avec un template.
- **Ce qui le rassure** : Le contenu est déjà prêt (pas de lorem ipsum), le SEO est pensé, les performances sont optimales, le site se charge vite.

### User Journey

1. **Découverte** : Le cycliste cherche "magasin vélo Colombes" ou "réparation vélo 92" sur Google → Le site apparaît avec des meta descriptions engageantes et des données structurées (étoiles, horaires, adresse)
2. **Première impression** : Hero plein écran avec parallax, tagline "Ici, on connaît votre vélo.", bandeau de confiance en marquee (4.8/5, certifié BOSCH, 15 ans, 1ère révision offerte) → Le visiteur comprend immédiatement à qui il a affaire
3. **Exploration** : Navigation fluide vers les pages qui l'intéressent (vélos, réparations, à propos), reveal animations au scroll, contenu qui parle franc → Chaque section renforce la confiance
4. **Conviction** : Avis clients (swipe mobile), histoire de David, valeurs affichées sans langue de bois → Le visiteur passe de "intéressé" à "convaincu"
5. **Conversion** : CTA récurrents "Prendre RDV" / "Appelez-nous" / numéro de téléphone toujours visible dans la Topbar → Le visiteur appelle ou passe en boutique

---

## Success Metrics

### Métriques de succès utilisateur

| Métrique | Indicateur | Cible |
|---|---|---|
| **Première impression** | Temps passé sur la page d'accueil | > 45 secondes |
| **Exploration** | Pages vues par session | > 2.5 pages |
| **Engagement mobile** | Taux de rebond mobile | < 50% |
| **Parcours complet** | Visiteurs atteignant la section CTA final | > 30% |
| **Conversion** | Clics sur "Appeler" / "Prendre RDV" | Mesurable via GA4 events |

### Business Objectives

**Objectif principal** : Décrocher le contrat — que David Thibault et son équipe voient le site et aient immédiatement envie de l'adopter.

**Objectifs secondaires (post-lancement) :**

| Objectif | Horizon | Cible |
|---|---|---|
| Visibilité Google locale | 6 mois | Top 10 sur "magasin vélo Colombes", "réparation vélo Colombes" |
| Trafic organique | 6 mois | +50% d'impressions vs. site actuel |
| Appels téléphoniques via le site | 3 mois | Hausse mesurable via call tracking ou GA4 |
| Indexation complète | 1 mois | 100% des pages indexées dans Search Console |
| Performance technique | Au lancement | Lighthouse Performance > 95, LCP < 2.5s |

### Key Performance Indicators

| KPI | Mesure | Outil |
|---|---|---|
| Score Lighthouse (Performance) | > 95/100 | PageSpeed Insights |
| Score Lighthouse (SEO) | > 95/100 | PageSpeed Insights |
| LCP (Largest Contentful Paint) | < 2.5s | Core Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Core Web Vitals |
| INP (Interaction to Next Paint) | < 200ms | Core Web Vitals |
| Position Google "vélo Colombes" | Top 10 | Google Search Console |
| Position Google "réparation vélo Colombes" | Top 10 | Google Search Console |
| Taux de rebond global | < 55% | Google Analytics 4 |
| Durée moyenne de session | > 1min 30s | Google Analytics 4 |
| Pages indexées | 100% (11+ URLs) | Google Search Console |

---

## MVP Scope

### Core Features

**8 pages complètes avec contenu rédigé :**

1. **Accueil** (`/`) — Hero parallax + bande de confiance + services + processus réparation + boutique + équipe (swipe Tinder mobile) + avis clients (swipe Tinder mobile) + CTA final
2. **Nos Vélos** (`/nos-velos`) — Grille des 5 catégories avec navigation visuelle
3. **Pages catégories** (`/nos-velos/[category]`) — 5 pages SSG (ville, électrique, VTT, enfants, accessoires) avec descriptions, marques, angle conseil
4. **Réparations** (`/reparations`) — SVG vélo interactif avec hotspots, carrousel services, grille tarifaire, avantages atelier, JSON-LD Service
5. **À propos** (`/a-propos`) — Histoire de David, grille valeurs, certification BOSCH, marques partenaires
6. **Contact** (`/contact`) — Téléphone, horaires, adresse, Google Maps iframe, formulaire de contact
7. **Blog** (`/blog`) — Grille d'articles (structure prête, contenu placeholder)
8. **Mentions légales** (`/mentions-legales`)

**Système d'animations (6 couches) :**
- Entrées CSS hero (keyframes heroSlideUp, heroFadeIn, heroLine)
- Reveal par IntersectionObserver (hook useReveal, classes .reveal*, stagger)
- Parallax scroll (hook useParallax, data-speed, RAF-throttled)
- Swipe Tinder mobile (Team + Reviews, touch handling)
- SVG interactif (BikeInteractiveSvg, 6 hotspots, cercles pulsants)
- Utilitaires CSS (marquee, magnetic-btn, cursor-wrench, line-grow)

**Infrastructure technique :**
- Next.js 16 App Router, React 19, TypeScript strict
- Tailwind CSS v4 avec tokens design custom
- SSG complet (toutes pages statiquement générables)
- SEO technique complet : metadata, canonical, OpenGraph, JSON-LD (LocalBusiness + BikeStore, Service, BreadcrumbList), sitemap.ts, robots.ts
- Google Fonts via next/font (Syne + Inter, display: swap)
- Roue de vélo comme indicateur de scroll (BikeWheel)

### Out of Scope for MVP

| Feature | Raison du report | Horizon |
|---|---|---|
| **E-commerce / paiement en ligne** | Colombes Cycles vend en boutique, pas en ligne | Non prévu |
| **CMS / back-office** | Contenu statique suffit pour le lancement, évite la complexité | V2 si besoin |
| **Articles de blog rédigés** | Structure prête, contenu à produire après le lancement | Post-lancement |
| **Routes blog individuelles** (`/blog/[slug]`) | Placeholder — à connecter quand le contenu existe | V1.1 |
| **Formulaire de contact fonctionnel** | Le composant existe, il faut connecter un backend (server action ou service tiers) | V1.1 |
| **Images réelles** | Tous les visuels sont des SVG placeholder — photos du magasin à fournir par le client | Pré-lancement |
| **Système de prise de RDV en ligne** | Nécessite un service tiers (Calendly, etc.) | V2 |
| **Analytics et tracking** | GA4 à configurer après validation du site | Pré-lancement |
| **Tests automatisés** | Pas de framework de test installé | V2 |
| **CI/CD** | Pas de pipeline de déploiement configuré | Pré-lancement |

### MVP Success Criteria

Le MVP est considéré comme réussi si :

1. **Réaction du propriétaire** : David Thibault voit le site et veut l'acheter — c'est le critère n°1
2. **Impression visuelle** : Le site provoque un "wow" immédiat grâce aux animations et au design
3. **Contenu complet** : Toutes les pages sont remplies avec le vrai contenu (copy.md), pas du placeholder
4. **Performance irréprochable** : Lighthouse > 95 sur mobile et desktop
5. **Mobile impeccable** : Les animations Tinder-swipe, le responsive, la navigation fonctionnent parfaitement sur smartphone
6. **SEO prêt au lancement** : Toutes les meta, le schema.org, le sitemap, les canonicals sont en place

### Future Vision

**V1.1 — Post-signature du contrat :**
- Intégration des photos réelles du magasin, de l'équipe, des vélos en rayon (remplacement des SVG placeholder)
- Connexion du formulaire de contact à un service d'envoi (Resend, SendGrid, ou server action Next.js)
- Routes blog individuelles avec les 10 articles SEO planifiés dans la stratégie
- Configuration GA4 + Google Search Console
- Déploiement Vercel avec domaine colombes-cycles.fr

**V2 — Évolutions :**
- CMS headless (Sanity, Strapi ou Notion API) pour que David puisse mettre à jour les tarifs et les articles blog sans toucher au code
- Système de prise de RDV intégré (Calendly embed ou solution sur-mesure)
- Catalogue vélos dynamique avec fiches produits, filtres, et photos
- Section promotions saisonnières
- Tests automatisés (Vitest + Testing Library)
- CI/CD via Vercel + GitHub Actions

**V3 — Ambition long terme :**
- Espace client fidélité (historique de réparations, rappels entretien)
- Intégration Google Business Profile API (avis en temps réel)
- Module de devis en ligne pour les réparations
- Contenu vidéo (tutoriels, présentation atelier)
