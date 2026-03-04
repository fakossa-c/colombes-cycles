# Story 4.3: Formulaire contact fonctionnel avec Server Action

Status: ready-for-dev

## Story

As a visiteur,
I want soumettre un message via formulaire et recevoir confirmation,
So that communiquer avec Colombes Cycles sans telephone.

## Acceptance Criteria

1. **Given** je remplis le formulaire contact avec des donnees valides (nom, email, message)
   **When** je clique sur "Envoyer"
   **Then** une Server Action traite la soumission cote serveur

2. **Given** la Server Action recoit les donnees
   **When** les donnees sont valides
   **Then** un email est envoye via Resend API (ou equivalent HTTPS) a l'adresse du gerant

3. **Given** l'email est envoye avec succes
   **When** la Server Action retourne le resultat
   **Then** le formulaire affiche un message de confirmation "Message bien recu." avec texte explicatif

4. **Given** l'envoi echoue (erreur Resend, timeout, etc.)
   **When** la Server Action retourne une erreur
   **Then** le formulaire affiche un message d'erreur clair invitant a reessayer ou appeler

5. **Given** je soumets le formulaire avec des champs vides
   **When** la validation client s'execute
   **Then** les champs nom, email et message affichent un message d'erreur inline (rouge)

6. **Given** je soumets le formulaire avec un email invalide
   **When** la validation client s'execute
   **Then** le champ email affiche "Adresse email invalide."

7. **Given** la validation client passe
   **When** la Server Action recoit les donnees
   **Then** une validation serveur (Zod) verifie les donnees une seconde fois avant envoi

8. **Given** le formulaire est affiche
   **When** je lis la page
   **Then** une mention RGPD est visible sous le bouton d'envoi ("Vos donnees sont utilisees uniquement pour repondre a votre demande.")

9. **Given** un utilisateur malveillant tente un envoi en boucle
   **When** il envoie plus de N requetes par minute
   **Then** un rate limiting basique bloque les envois excessifs

10. **Given** les donnees collectees
    **When** je verifie la conformite
    **Then** seuls nom, email et message sont envoyes par email (pas de donnees supplementaires stockees)

## Tasks / Subtasks

- [ ] Task 1 -- Installer et configurer Resend (AC: #2)
  - [ ] `npm install resend`
  - [ ] Ajouter `RESEND_API_KEY` dans `.env.local` (et `.env.example`)
  - [ ] Ajouter `CONTACT_EMAIL_TO` dans `.env.local` pour l'email du destinataire
  - [ ] Verifier que les variables sont bien dans `.env.local` (pas commite)

- [ ] Task 2 -- Creer la Server Action (AC: #1, #2, #7, #9)
  - [ ] Creer `app/(site)/contact/actions.ts` avec directive "use server"
  - [ ] Definir le schema Zod pour validation serveur (nom, email, message)
  - [ ] Implementer la fonction `sendContactForm(formData: FormData)`
  - [ ] Integrer l'envoi via Resend API
  - [ ] Implementer un rate limiting basique (Map en memoire avec IP + timestamp)
  - [ ] Retourner `{ success: boolean, error?: string }`

- [ ] Task 3 -- Installer Zod pour validation serveur (AC: #7)
  - [ ] `npm install zod`
  - [ ] Definir le schema de validation dans actions.ts ou un fichier dedie

- [ ] Task 4 -- Adapter le ContactForm pour utiliser la Server Action (AC: #1, #3, #4)
  - [ ] Modifier `components/contact/ContactForm.tsx`
  - [ ] Remplacer le `handleSubmit` local par un appel a la Server Action
  - [ ] Utiliser `useActionState` (React 19) ou `useTransition` pour gerer le pending state
  - [ ] Afficher un etat de chargement pendant l'envoi (bouton desactive, spinner)
  - [ ] Gerer le retour succes (message confirmation existant)
  - [ ] Gerer le retour erreur (nouveau message d'erreur)

- [ ] Task 5 -- Conserver la validation client (AC: #5, #6)
  - [ ] Garder la validation existante (nom, email, message obligatoires)
  - [ ] Garder le pattern regex email existant
  - [ ] La validation client bloque l'appel Server Action si invalide

- [ ] Task 6 -- Ajouter la mention RGPD (AC: #8)
  - [ ] Ajouter un texte sous le bouton Envoyer dans ContactForm
  - [ ] Style : text-[0.75rem] text-anthracite/40 italic

- [ ] Task 7 -- Gerer l'etat d'erreur serveur dans le UI (AC: #4)
  - [ ] Ajouter un etat `serverError` dans ContactForm
  - [ ] Afficher un message d'erreur global (pas inline par champ) en cas d'echec serveur
  - [ ] Proposer de reessayer ou d'appeler le 01 42 42 66 02

- [ ] Task 8 -- Test de la chaine complete (AC: #1 a #10)
  - [ ] Tester soumission valide -> email recu
  - [ ] Tester champs vides -> erreurs inline
  - [ ] Tester email invalide -> erreur inline
  - [ ] Tester echec Resend (cle invalide) -> message erreur
  - [ ] Verifier mention RGPD visible
  - [ ] Verifier que seuls nom, email, message sont dans l'email

## Dev Notes

### Architecture Critique

Cette story transforme le formulaire contact (actuellement front-end only) en un formulaire fonctionnel avec envoi d'email via Server Action Next.js + Resend API.

**Flux de donnees :**
1. Visiteur remplit le formulaire (Client Component)
2. Validation client (champs vides, email invalide)
3. Appel Server Action `sendContactForm`
4. Validation serveur (Zod)
5. Rate limiting (IP-based)
6. Envoi email via Resend API
7. Retour resultat au client
8. Affichage confirmation ou erreur

### Composants Existants a Reutiliser

| Composant | Chemin | Type | Role |
|-----------|--------|------|------|
| ContactForm | `@/components/contact/ContactForm` | Client | Formulaire existant a adapter |

### Fichiers a Creer/Modifier

| Action | Fichier |
|--------|---------|
| CREER | `app/(site)/contact/actions.ts` -- Server Action avec "use server" |
| CREER | `.env.example` -- template des variables d'environnement |
| MODIFIER | `components/contact/ContactForm.tsx` -- integrer Server Action, pending state, erreur serveur, mention RGPD |
| MODIFIER | `package.json` -- ajout dependencies resend, zod |

### Server Action Pattern

```typescript
// app/(site)/contact/actions.ts
"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  nom: z.string().min(1, "Nom requis").max(100),
  email: z.string().email("Email invalide"),
  message: z.string().min(1, "Message requis").max(5000),
});

// Rate limiting basique en memoire
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 envois par minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimit.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  rateLimit.set(ip, recent);
  return true;
}

export async function sendContactForm(formData: FormData) {
  // 1. Extraire les donnees
  const raw = {
    nom: formData.get("nom") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  // 2. Validation Zod
  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: "Donnees invalides." };
  }

  // 3. Rate limiting (headers IP)
  // Note: en production, utiliser headers() de next/headers pour l'IP
  // const headersList = await headers();
  // const ip = headersList.get("x-forwarded-for") || "unknown";
  // if (!checkRateLimit(ip)) {
  //   return { success: false, error: "Trop de tentatives. Reessayez dans une minute." };
  // }

  // 4. Envoi via Resend
  try {
    await resend.emails.send({
      from: "Colombes Cycles <noreply@colombes-cycles.fr>",
      to: process.env.CONTACT_EMAIL_TO!,
      replyTo: result.data.email,
      subject: `Nouveau message de ${result.data.nom}`,
      text: `Nom: ${result.data.nom}\nEmail: ${result.data.email}\n\nMessage:\n${result.data.message}`,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Erreur d'envoi. Reessayez ou appelez-nous." };
  }
}
```

### ContactForm -- Modifications Necessaires

Le ContactForm actuel :
- Collecte : nom, telephone, email, type, message
- Validation client : nom, email, type, message (telephone optionnel)
- Soumission : `setSubmitted(true)` sans envoi reel

Modifications a apporter :
1. **Simplifier les champs** : selon AC, collecter uniquement nom, email, message (NFR12). Retirer telephone et type, OU les garder cote UI mais ne pas les envoyer par email.
   - **Recommandation** : garder telephone et type dans le formulaire (UX), mais cote Server Action ne valider/envoyer que nom, email, message. Le telephone et type peuvent etre inclus dans le corps du mail comme info supplementaire sans stockage.
2. **useActionState** (React 19) pour gerer pending/result
3. **Mention RGPD** sous le bouton

```typescript
// Pattern d'integration dans ContactForm
"use client";

import { useActionState } from "react";
import { sendContactForm } from "@/app/(site)/contact/actions";

// Dans le composant :
const [state, formAction, isPending] = useActionState(sendContactForm, null);
```

**ATTENTION** : `useActionState` dans React 19 attend une signature specifique :
```typescript
async function sendContactForm(prevState: any, formData: FormData) { ... }
```
Le premier argument est le state precedent. Adapter la Server Action en consequence.

### Variables d'Environnement

```env
# .env.example
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL_TO=contact@colombes-cycles.fr
```

**IMPORTANT** : ne JAMAIS commiter `.env.local`. Verifier que `.gitignore` contient `.env*.local`.

### Resend API -- Notes

- Tier gratuit : 100 emails/jour, 1 domaine
- Necessite verification du domaine d'envoi (colombes-cycles.fr)
- En dev, on peut utiliser le domaine sandbox Resend (onboarding@resend.dev)
- SDK : `import { Resend } from 'resend'`
- Pas besoin de template HTML pour un email simple texte

### Anti-patterns a EVITER

- NE PAS stocker les donnees en base (pas de BDD pour l'instant)
- NE PAS envoyer d'email depuis le client (toujours Server Action)
- NE PAS exposer la cle API Resend cote client
- NE PAS ajouter de CAPTCHA (pas demande, complexifie UX)
- NE PAS utiliser nodemailer (SMTP) -- Resend est HTTPS-based (NFR15)
- NE PAS oublier le rate limiting meme basique

### Project Structure Notes

```
app/(site)/contact/
  page.tsx         -- Server Component (story 4.2)
  actions.ts       -- Server Action "use server" (CETTE STORY)
  MapWrapper.tsx   -- Client Component (story 4.2)

components/contact/
  ContactForm.tsx  -- Client Component (a modifier)
```

### Dependencies

- Story 4.2 : la page contact doit exister avec le formulaire integre
- Story 1.2 : les variables d'environnement doivent etre securisees
- npm : `resend`, `zod` (nouvelles dependencies)

### References

- Resend API docs : https://resend.com/docs
- Next.js Server Actions : https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
- React 19 useActionState : https://react.dev/reference/react/useActionState

## Dev Agent Record

### Agent Model Used
(a remplir)

### Debug Log References
(a remplir)

### Completion Notes List
(a remplir)

### File List
(a remplir)
