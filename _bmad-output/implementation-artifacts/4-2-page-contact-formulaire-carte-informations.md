# Story 4.2: Page Contact -- formulaire, carte et informations

Status: ready-for-dev

## Story

As a visiteur,
I want acceder a toutes les infos contact et envoyer un message,
So that contacter Colombes Cycles par le moyen de mon choix.

## Acceptance Criteria

1. **Given** je navigue vers /contact
   **When** la page se charge
   **Then** le PageHero affiche le titre "Appelez-nous ou passez nous voir.", le sous-titre, le tag "Contact" et le breadcrumb Accueil > Contact

2. **Given** la page /contact est chargee
   **When** je vois la section telephone
   **Then** un bouton cliquable `tel:0142426602` affiche "01 42 42 66 02" avec icone telephone, style terracotta rounded-full

3. **Given** la page /contact est chargee
   **When** je vois la section horaires
   **Then** les horaires sont affiches : Mardi-Samedi 9h-19h, Dimanche et lundi Ferme

4. **Given** la page /contact est chargee
   **When** je vois la section adresse
   **Then** l'adresse "12 Av. Henri Barbusse, 92700 Colombes" est affichee

5. **Given** la page /contact est chargee
   **When** je vois la carte Google Maps
   **Then** une iframe Google Maps est affichee en lazy-loading (loading="lazy"), sans CLS (aspect-ratio fixe aspect-[4/3])

6. **Given** la page /contact est chargee sur mobile ou desktop
   **When** je scrolle la page et ma souris/doigt passe sur la carte
   **Then** la carte NE CAPTURE PAS le scroll (pointer-events: none par defaut)

7. **Given** la carte a pointer-events:none
   **When** je clique sur la carte
   **Then** pointer-events passe a "auto" et je peux interagir avec la carte

8. **Given** la page /contact est chargee
   **When** je scrolle vers le bas
   **Then** le composant ContactForm est affiche et fonctionnel (formulaire complet)

9. **Given** un moteur de recherche indexe la page
   **When** il lit les metadonnees
   **Then** le title est "Contact & Horaires -- Colombes Cycles Colombes 92", la description mentionne horaires et adresse, canonical est https://www.colombes-cycles.fr/contact

10. **Given** la page est chargee sur mobile
    **When** je consulte la page
    **Then** les 2 colonnes (tel+horaires | adresse+carte) s'empilent verticalement

## Tasks / Subtasks

- [ ] Task 1 -- Ajouter le mecanisme anti-scroll sur Google Maps (AC: #6, #7)
  - [ ] Creer un composant Client `MapWrapper.tsx` dans `app/(site)/contact/` ou `components/ui/`
  - [ ] Implementer pointer-events:none par defaut sur l'iframe
  - [ ] Au clic sur le wrapper, passer pointer-events a "auto"
  - [ ] Au clic en dehors (ou apres timeout), revenir a pointer-events:none
  - [ ] Ajouter un overlay visuel "Cliquez pour interagir avec la carte"

- [ ] Task 2 -- Integrer le composant ContactForm (AC: #8)
  - [ ] Importer `ContactForm` depuis `@/components/contact/ContactForm`
  - [ ] Placer le formulaire dans une nouvelle section sous les infos contact
  - [ ] Ajouter un SectionTitle au-dessus du formulaire

- [ ] Task 3 -- Extraire les donnees contact vers lib/data/site-config.ts (AC: #2, #3, #4)
  - [ ] Creer ou completer `lib/data/site-config.ts` avec telephone, adresse, horaires
  - [ ] Importer ces donnees dans page.tsx au lieu du hardcode

- [ ] Task 4 -- Ajouter les animations reveal (AC: #1 a #8)
  - [ ] Ajouter useReveal aux sections qui n'ont pas encore d'animation
  - [ ] Utiliser le pattern RevealSection ou Client Component wrapper

- [ ] Task 5 -- Verifier les metadonnees SEO (AC: #9)
  - [ ] Confirmer le Metadata export avec title, description, canonical, openGraph

- [ ] Task 6 -- Test responsive (AC: #10)
  - [ ] Verifier l'empilement des colonnes sur mobile
  - [ ] Verifier que le bouton tel: est bien cliquable sur mobile
  - [ ] Verifier que la carte s'adapte en largeur

## Dev Notes

### Architecture Critique

La page `/contact` existe deja dans `app/(site)/contact/page.tsx` avec les infos de base (tel, horaires, adresse, carte). Il manque :
1. **Le mecanisme anti-scroll** sur la carte Google Maps (pointer-events)
2. **L'integration du ContactForm** (le composant existe mais n'est pas importe dans la page)
3. **Les animations reveal**

La page est un **Server Component**. Le ContactForm et le MapWrapper seront des Client Components.

### Composants Existants a Reutiliser

| Composant | Chemin | Type | Role |
|-----------|--------|------|------|
| PageHero | `@/components/ui/PageHero` | Server | Hero avec titre, tag, breadcrumb |
| SectionTitle | `@/components/ui/SectionTitle` | Server | Titre section |
| ContactForm | `@/components/contact/ContactForm` | Client | Formulaire complet avec validation |
| useReveal | `@/components/ui/useReveal` | Hook | Animations reveal |

### Fichiers a Creer/Modifier

| Action | Fichier |
|--------|---------|
| CREER | `app/(site)/contact/MapWrapper.tsx` -- Client Component pour anti-scroll carte |
| CREER | `lib/data/site-config.ts` -- donnees contact centralisees (si pas encore fait en 1.5) |
| MODIFIER | `app/(site)/contact/page.tsx` -- integrer ContactForm, MapWrapper, reveal, import donnees |

### Pattern MapWrapper (anti-scroll)

```typescript
// app/(site)/contact/MapWrapper.tsx
"use client";

import { useState, useRef, useEffect } from "react";

export default function MapWrapper({ src, title }: { src: string; title: string }) {
  const [active, setActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [active]);

  return (
    <div
      ref={wrapperRef}
      className="relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer"
      onClick={() => setActive(true)}
    >
      {!active && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-anthracite/5">
          <span className="text-[0.8rem] font-medium text-anthracite/50 bg-white/80 px-4 py-2 rounded-full">
            Cliquez pour interagir avec la carte
          </span>
        </div>
      )}
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, pointerEvents: active ? "auto" : "none" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}
```

### Donnees Contact (site-config.ts)

```typescript
// lib/data/site-config.ts
export const siteConfig = {
  phone: "01 42 42 66 02",
  phoneTel: "0142426602",
  address: {
    street: "12 Av. Henri Barbusse",
    city: "Colombes",
    zip: "92700",
  },
  hours: [
    { days: "Mardi - Samedi", time: "9h - 19h" },
    { days: "Dimanche et lundi", time: "Ferme" },
  ],
  maps: {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.0!2d2.2442!3d48.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e665c1e6d7e8a7%3A0x0!2s12+Avenue+Henri+Barbusse%2C+92700+Colombes!5e0!3m2!1sfr!2sfr!4v1700000000000",
  },
  googleRating: 4.8,
  googleReviewCount: 271,
};
```

### Google Maps -- Regles Strictes

- **JAMAIS** de JS Maps API -- uniquement iframe embed
- **loading="lazy"** obligatoire (NFR23)
- **aspect-[4/3]** fixe pour eviter CLS
- **pointer-events:none** par defaut pour ne pas capturer le scroll
- Activation au clic uniquement

### Anti-patterns a EVITER

- NE PAS utiliser l'API JavaScript Google Maps (cout, complexite, cookies)
- NE PAS laisser la carte capturer le scroll par defaut
- NE PAS oublier loading="lazy" sur l'iframe
- NE PAS mettre "use client" sur page.tsx
- NE PAS ajouter de newsletter popup

### Project Structure Notes

```
app/(site)/contact/
  page.tsx         -- Server Component, metadata export
  MapWrapper.tsx   -- Client Component (a creer)
  actions.ts       -- Server Action (story 4.3, pas cette story)
```

### Dependencies (Epic 1)

- Story 1.1 (route groups) : fichiers sous app/(site)/
- Story 1.3 (bug CSS Button) : le bouton tel doit avoir le bon style
- Story 1.5 (centralisation donnees) : lib/data/site-config.ts

### ContactForm -- Etat Actuel

Le composant `ContactForm` dans `components/contact/ContactForm.tsx` est **deja complet** avec :
- Champs : nom, telephone, email, type de demande (select), message
- Validation client (nom, email, type, message obligatoires)
- Etat de succes avec message de confirmation
- Animations reveal
- Style coherent avec la DA

**ATTENTION** : le formulaire fait actuellement un `setSubmitted(true)` sans envoyer de donnees. La logique d'envoi est traitee dans la story 4.3 (Server Action). Pour cette story, il suffit d'integrer le composant tel quel.

### References

- Telephone : 01 42 42 66 02
- Adresse : 12 Av. Henri Barbusse, 92700 Colombes
- Horaires : Mardi-Samedi 9h-19h, Dimanche-Lundi ferme

## Dev Agent Record

### Agent Model Used
(a remplir)

### Debug Log References
(a remplir)

### Completion Notes List
(a remplir)

### File List
(a remplir)
