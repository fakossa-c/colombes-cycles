# Story 1.7: Configurer next.config.ts (headers securite)

Status: done

## Story

As a developpeur,
I want configurer next.config.ts avec les headers de securite,
So that le site soit protege contre les attaques courantes (clickjacking, MIME sniffing, referrer leaks).

## Acceptance Criteria

1. **Given** le header X-Content-Type-Options
   **When** je verifie les reponses HTTP
   **Then** la valeur est `nosniff`

2. **Given** le header X-Frame-Options
   **When** je verifie les reponses HTTP
   **Then** la valeur est `DENY`

3. **Given** le header Referrer-Policy
   **When** je verifie les reponses HTTP
   **Then** la valeur est `strict-origin-when-cross-origin`

4. **Given** la configuration est appliquee
   **When** je lance `npm run build`
   **Then** le build reussit sans erreur

## Tasks / Subtasks

- [x] Task 1 — Configurer les headers de securite dans next.config.ts (AC: #1, #2, #3)
  - [x] Ouvrir `next.config.ts` (actuellement vide sauf le squelette)
  - [x] Ajouter la propriete `headers()` au NextConfig
  - [x] Appliquer les headers a toutes les routes via le pattern `/:path*`
  - [x] Headers a ajouter :
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: DENY`
    - `Referrer-Policy: strict-origin-when-cross-origin`
  - [x] Ajouter aussi les headers de securite complementaires recommandes :
    - `X-DNS-Prefetch-Control: on` (performance)
    - `Strict-Transport-Security: max-age=63072000; includeSubDomains` (HTTPS force, flag preload retire)
    - `Permissions-Policy: camera=(), microphone=(), geolocation=()` (restricter les APIs sensibles)

- [x] Task 2 — Verifier le build (AC: #4)
  - [x] `npm run build` reussit sans erreur — 16 pages generees (Static + SSG)
  - [x] Verifier que la config TypeScript est valide (pas d'erreur de type)

- [x] Task 3 — Tester les headers en dev (AC: #1, #2, #3)
  - [x] `npm run dev` demarre sans erreur
  - [x] `curl -I http://localhost:3000/` — tous les headers presents et corrects
  - [x] `curl -I http://localhost:3000/nos-velos` — tous les headers presents et corrects

## Dev Notes

### Architecture Critique

**La propriete `headers()`** est une fonction async qui retourne un tableau de regles. Chaque regle contient un `source` (pattern de route) et un tableau de `headers` (paires key/value).

**IMPORTANT** : La propriete `headers` dans `next.config.ts` est `headers()` (une methode), pas `headers:` (une propriete). C'est une fonction async.

**Note sur X-Frame-Options: DENY** : Ce header empeche le site d'etre affiche dans un `<iframe>`. C'est correct pour un site vitrine. Si un jour le site doit etre integre dans un iframe (ex: widget), il faudra changer en `SAMEORIGIN`.

**Note sur Strict-Transport-Security** : Ce header force HTTPS. Il est critique en production mais inoffensif en dev (localhost n'est pas HTTPS). Le `max-age=63072000` represente 2 ans. Le flag `preload` a ete deliberement exclu — il soumet le domaine a la HSTS Preload List des navigateurs de maniere irreversible (ne pas l'ajouter sans validation complete HTTPS + soumission sur hstspreload.org).

**Note sur poweredByHeader: false** : Desactive explicitement le header `X-Powered-By`. Next.js 13+ le desactive par defaut mais la configuration explicite est une bonne pratique de security hardening.

**Note sur X-XSS-Protection: 0** : Desactive explicitement cet ancien header. OWASP recommande de l'envoyer a `0` pour empecher les comportements bugues dans les navigateurs legacy ou proxies d'entreprise.

### Fichiers a Modifier

| Fichier | Action | Detail |
|---------|--------|--------|
| `next.config.ts` | MODIFIER | Ajouter headers() avec les headers de securite + poweredByHeader: false |

### Contenu final de next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection", value: "0" },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Anti-patterns a EVITER

- NE PAS ajouter `Content-Security-Policy` pour le moment — c'est complexe et peut casser les styles inline, les scripts inline (JSON-LD), et les Google Maps. Le CSP sera une story separee.
- NE PAS utiliser `X-Frame-Options: SAMEORIGIN` — le site n'a pas besoin d'etre embarque dans des iframes
- NE PAS ajouter de middleware Next.js pour les headers — `next.config.ts` est la methode recommandee
- NE PAS modifier d'autres options dans next.config.ts — cette story porte uniquement sur les headers
- NE PAS oublier le pattern `/:path*` — sans lui, les headers ne s'appliqueraient qu'a la page d'accueil
- NE PAS ajouter le flag `preload` au HSTS sans validation complete HTTPS du domaine

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.7]
- [Source: _bmad-output/planning-artifacts/architecture.md#Security Headers]
- [Source: next.config.ts — fichier existant vide]
- [Source: Next.js docs — Headers: https://nextjs.org/docs/app/api-reference/next-config-js/headers]

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References
- TypeScript validation : `tsc --noEmit` exit code 0
- Build complet : `npm run build` reussi — 16 pages generees sans erreur
- Runtime `/` : `curl -I http://localhost:3000/` — 7 headers confirmes
- Runtime `/nos-velos` : `curl -I http://localhost:3000/nos-velos` — 7 headers confirmes

### Completion Notes List
- Task 1 : `next.config.ts` configure avec 7 headers de securite sur pattern `/:path*` + `poweredByHeader: false`
- Task 2 : `npm run build` reussi, 16 pages (Static + SSG), zero erreur TypeScript ou lint
- Task 3 : Headers verifies via curl sur 2 routes (`/` et `/nos-velos`) — tous presents et corrects
- Code review [H1] resolu : `npm run build` execute et reussi (AC #4 satisfait)
- Code review [H2] resolu : verification runtime via curl sur 2 routes (Task 3 vraiment completee)
- Code review [M1] resolu : flag `preload` retire du HSTS (decision irreversible non validee)
- Code review [L1] resolu : `poweredByHeader: false` ajoute
- Code review [L2] resolu : `X-XSS-Protection: 0` ajoute

### Change Log
- 2026-03-04 : Implementation initiale — ajout de la methode `headers()` avec 6 headers
- 2026-03-04 : Code review — retrait flag HSTS `preload`, ajout `poweredByHeader: false`, ajout `X-XSS-Protection: 0`, verification build + runtime

### File List
- `next.config.ts` (modifie)
