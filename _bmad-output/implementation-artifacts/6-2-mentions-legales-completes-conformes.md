# Story 6.2: Mentions legales completes et conformes

Status: ready-for-dev

## Story
As a visiteur du site,
I want des mentions legales completes conformes a la loi francaise,
So that je sache qui est derriere le site et comment mes donnees sont traitees.

## Acceptance Criteria

1. **Given** la page `/mentions-legales`, **When** je consulte la section "Editeur du site", **Then** je vois : raison sociale (Colombes Cycles), forme juridique (a completer par le client), numero SIRET (a completer par le client), adresse siege social complete, telephone (01 42 42 66 02), directeur de la publication (David Thibault).

2. **Given** la page `/mentions-legales`, **When** je consulte la section "Hebergeur", **Then** je vois : nom (Vercel Inc.), adresse complete (440 N Barranca Ave #4133, Covina, CA 91723, USA), site web (vercel.com).

3. **Given** la page `/mentions-legales`, **When** je consulte la section "Donnees personnelles", **Then** je vois : les donnees collectees (nom, email, telephone, message via formulaire de contact), la finalite du traitement (repondre aux demandes des visiteurs), la duree de conservation (a definir, ex: 3 ans apres dernier contact), les droits RGPD (acces, rectification, suppression, opposition, portabilite), le contact pour exercer ses droits (telephone + email/formulaire).

4. **Given** la page `/mentions-legales`, **When** je consulte la section "Conditions d'utilisation", **Then** je vois des conditions generales d'utilisation du site (responsabilite, liens hypertextes, droit applicable).

5. **Given** la page `/mentions-legales`, **When** j'inspecte le design, **Then** la page utilise le design system : `PageHero` pour le header, typo Syne pour les titres, Inter pour le corps, couleurs anthracite/cream/ivory du theme.

6. **Given** la page `/mentions-legales`, **When** j'inspecte la structure HTML, **Then** le `PageHero` contient un h1, chaque section utilise des h2, pas de saut de niveau de titre.

7. **Given** les champs `[A completer]` dans le code actuel, **When** le dev les rencontre, **Then** ils sont remplaces par des placeholders clairement identifies avec un commentaire `{/* TODO: A confirmer avec le client */}` et une valeur par defaut raisonnable entre crochets.

## Tasks / Subtasks

- [ ] Task 1 — Restructurer et completer la section "Editeur du site" (AC: #1, #5, #6)
  - [ ] Remplacer `[A completer]` forme juridique par `[Forme juridique a confirmer]` avec commentaire TODO
  - [ ] Remplacer `[A completer]` SIRET par `[SIRET a confirmer]` avec commentaire TODO
  - [ ] Completer l'adresse : ajouter le numero de rue et la ville complete
    - Adresse connue : 12 Av. Henri Barbusse, 92700 Colombes (boutique principale)
  - [ ] Ajouter l'email de contact si disponible (sinon mentionner "via le formulaire de contact")
  - [ ] Verifier que le h2 "1. Editeur du site" utilise la bonne typo Syne

- [ ] Task 2 — Completer la section "Hebergeur" (AC: #2)
  - [ ] Verifier les informations Vercel actuelles (deja presentes et correctes)
  - [ ] Ajouter le telephone de Vercel si requis par la loi (non obligatoire pour hebergeur etranger, mais recommande de mentionner le support)

- [ ] Task 3 — Enrichir la section "Donnees personnelles" / RGPD (AC: #3)
  - [ ] Restructurer en sous-sections claires :
    - **Responsable du traitement** : Colombes Cycles, David Thibault
    - **Donnees collectees** : nom, adresse email, numero de telephone (optionnel), type de demande, message — via le formulaire de contact uniquement
    - **Finalite** : repondre aux demandes des visiteurs (conseil, devis, prise de RDV)
    - **Base legale** : interet legitime (repondre a une demande initiee par le visiteur)
    - **Duree de conservation** : `[3 ans apres le dernier contact — a confirmer]`
    - **Destinataires** : donnees traitees uniquement par l'equipe Colombes Cycles, aucun transfert a des tiers
    - **Droits** : acces, rectification, suppression, opposition, limitation, portabilite
    - **Exercer vos droits** : par telephone au 01 42 42 66 02 ou via le formulaire de contact
    - **Reclamation** : droit de saisir la CNIL (www.cnil.fr)
  - [ ] Mentionner l'absence de cookies de tracking / analytics tiers (si applicable)

- [ ] Task 4 — Ajouter la section "Conditions d'utilisation" (AC: #4)
  - [ ] Ajouter une nouvelle section h2 "6. Conditions generales d'utilisation" :
    - Acceptation des conditions
    - Description du service (site vitrine informatif)
    - Responsabilite : informations a titre indicatif, tarifs non contractuels
    - Liens hypertextes : le site peut contenir des liens vers des sites tiers, sans responsabilite sur leur contenu
    - Droit applicable : droit francais, tribunal competent de Nanterre

- [ ] Task 5 — Renumeroter et reorganiser les sections (AC: #5, #6)
  - [ ] Ordre final des sections :
    1. Editeur du site
    2. Hebergeur
    3. Directeur de la publication (peut etre fusionne avec section 1)
    4. Propriete intellectuelle
    5. Donnees personnelles et RGPD
    6. Cookies
    7. Conditions generales d'utilisation
    8. Droit applicable et litiges
  - [ ] Verifier la hierarchie des titres : h1 (PageHero) > h2 (sections) > h3 (sous-sections RGPD si besoin)
  - [ ] S'assurer que le design suit le systeme existant :
    - Titres h2 : `font-syne font-700 text-[1.4rem] tracking-tight text-anthracite`
    - Corps : `text-anthracite/70 text-[0.9rem] leading-relaxed`
    - Espacement sections : `space-y-16`

- [ ] Task 6 — Accessibilite de la page (AC: #6)
  - [ ] Verifier que le PageHero genere bien un h1
  - [ ] Verifier que chaque section a un h2, pas de saut de niveau
  - [ ] Verifier les contrastes texte (deja corriges dans Story 6.1, mais verifier coherence)
  - [ ] Ajouter des `id` sur les h2 pour navigation interne potentielle (ancres)

- [ ] Task 7 — Metadonnees SEO (deja en place, verifier)
  - [ ] Verifier `<title>` et `<meta description>` (deja presents dans le code actuel)
  - [ ] Verifier canonical (deja present)
  - [ ] Ajouter `noindex` si le client ne souhaite pas que les mentions legales soient indexees (optionnel, generalement on laisse indexe)

## Dev Notes

### Architecture Critique
- La page existe deja dans `app/(site)/mentions-legales/page.tsx` avec une structure de base.
- C'est une page **SSG pure** (pas de "use client"), ce qui est correct pour du contenu statique.
- Le composant `PageHero` est deja utilise et fournit le h1 + breadcrumbs.
- Le design system est deja applique (Syne titres, Inter corps, couleurs theme).
- Il s'agit principalement d'un travail de **contenu** et de **completude juridique**, pas de nouveau composant.

### Fichiers a Creer/Modifier
| Fichier | Action |
|---|---|
| `app/(site)/mentions-legales/page.tsx` | Modifier — enrichir contenu, ajouter sections manquantes |

Aucun nouveau fichier a creer. Modification d'un seul fichier existant.

### Code actuel a modifier
Le fichier actuel (`app/(site)/mentions-legales/page.tsx`) contient deja :
- Section 1 : Editeur (avec `[A completer]`)
- Section 2 : Hebergeur (Vercel, OK)
- Section 3 : Propriete intellectuelle (OK)
- Section 4 : Donnees personnelles (basique, a enrichir)
- Section 5 : Cookies (OK)

**Sections a ajouter :**
- Conditions generales d'utilisation
- Droit applicable et litiges
- Enrichissement RGPD (base legale, duree, destinataires, CNIL)

### Structure cible de la page
```tsx
<PageHero title="Mentions legales" breadcrumbs={...} />

<section className="py-24 md:py-36">
  <div className="max-w-3xl mx-auto px-6 md:px-10 space-y-16">
    {/* 1. Editeur du site */}
    {/* 2. Hebergeur */}
    {/* 3. Propriete intellectuelle */}
    {/* 4. Donnees personnelles et RGPD */}
    {/*    4.1 Responsable du traitement */}
    {/*    4.2 Donnees collectees */}
    {/*    4.3 Finalite */}
    {/*    4.4 Base legale */}
    {/*    4.5 Duree de conservation */}
    {/*    4.6 Destinataires */}
    {/*    4.7 Vos droits */}
    {/*    4.8 Exercer vos droits */}
    {/*    4.9 Reclamation CNIL */}
    {/* 5. Cookies */}
    {/* 6. Conditions generales d'utilisation */}
    {/* 7. Droit applicable et litiges */}
  </div>
</section>
```

### Anti-patterns a EVITER
- **NE PAS** inventer des informations juridiques (SIRET, forme juridique) — utiliser des placeholders clairs
- **NE PAS** copier-coller un modele de mentions legales generique — adapter au contexte reel (formulaire contact uniquement, pas de e-commerce)
- **NE PAS** ajouter des sections sur les cookies de tracking si le site n'en utilise pas
- **NE PAS** creer un composant React separe pour chaque section — garder une page simple et lisible
- **NE PAS** utiliser de listes a puces pour le contenu juridique principal — garder des paragraphes fluides
- **NE PAS** oublier les entites HTML (`&apos;` etc.) pour les apostrophes dans le JSX

### Informations business connues
| Info | Valeur | Source |
|---|---|---|
| Nom commercial | Colombes Cycles | Confirmee |
| Gerant | David Thibault | Confirmee |
| Adresse | 12 Av. Henri Barbusse, 92700 Colombes | Page contact |
| Telephone | 01 42 42 66 02 | Confirmee |
| Forme juridique | A confirmer avec le client | Inconnue |
| SIRET | A confirmer avec le client | Inconnue |
| Hebergeur | Vercel Inc. | Confirmee |
| Donnees collectees | nom, email, telephone, type demande, message | ContactForm.tsx |

### Project Structure Notes
```
app/(site)/mentions-legales/
  page.tsx    # Fichier unique a modifier — page SSG statique
```

### References
- Loi pour la Confiance dans l'Economie Numerique (LCEN) - Art. 6 : obligations de mentions legales
- RGPD (Reglement UE 2016/679) - Articles 13-14 : information des personnes
- CNIL : https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles
- Modele CNIL mentions legales : https://www.cnil.fr/fr/mentions-legales

## Dev Agent Record
### Agent Model Used
(a remplir par l'agent de dev)
### Debug Log References
(a remplir)
### Completion Notes List
(a remplir)
### File List
(a remplir apres implementation)
