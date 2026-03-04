# Story 1.2: Sécuriser les variables d'environnement

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a développeur,
I want déplacer la clé API de .env vers .env.local et créer .env.example,
So that aucun secret ne soit commité dans le dépôt Git.

## Acceptance Criteria

1. **Given** le fichier .env contient une clé API CRM (`CRM_PROJECT_API_KEY`)
   **When** je déplace les variables sensibles vers .env.local
   **Then** .env.local contient `CRM_PROJECT_API_KEY=crm_proj_bfe8c05a8b8e5fedc1d9170b7060f5b7`

2. **Given** la migration est complète
   **When** je vérifie .env.local dans .gitignore
   **Then** .env.local est couvert par la règle `.env*` existante dans .gitignore (déjà en place)

3. **Given** la migration est complète
   **When** je vérifie le fichier .env original
   **Then** .env est supprimé OU vidé de ses secrets (fichier supprimé recommandé car .gitignore bloque `.env*`)

4. **Given** la migration est complète
   **When** je vérifie .env.example
   **Then** un fichier .env.example est créé avec les noms de variables et des valeurs placeholder (ex: `CRM_PROJECT_API_KEY=your_key_here`)

5. **Given** le fichier .env.example est créé
   **When** je vérifie le .gitignore
   **Then** .env.example est EXCLU du pattern `.env*` via une règle `!.env.example` pour qu'il soit commitable

6. **Given** toutes les modifications sont faites
   **When** je lance `npm run build`
   **Then** le build réussit sans erreur

7. **Given** toutes les modifications sont faites
   **When** je vérifie avec `git ls-files` et l'historique git
   **Then** NFR10 (aucun secret dans Git) et NFR11 (.env.local gitignored) sont respectés

## Tasks / Subtasks

- [x] Task 1 — Créer .env.local avec les variables sensibles (AC: #1)
  - [x] Créer le fichier `.env.local` à la racine du projet
  - [x] Copier `CRM_PROJECT_API_KEY=crm_proj_bfe8c05a8b8e5fedc1d9170b7060f5b7` depuis `.env`
- [x] Task 2 — Supprimer le fichier .env (AC: #3)
  - [x] Supprimer le fichier `.env` à la racine
  - [x] Vérifier que `.env` n'est pas tracké par git (`git ls-files .env` doit retourner vide)
- [x] Task 3 — Créer .env.example avec valeurs placeholder (AC: #4)
  - [x] Créer le fichier `.env.example` avec :
    ```
    # Colombes Cycles — Variables d'environnement
    # Copier ce fichier vers .env.local et remplir les valeurs

    # Clé API CRM (projet)
    CRM_PROJECT_API_KEY=your_key_here
    ```
- [x] Task 4 — Mettre à jour .gitignore pour autoriser .env.example (AC: #5)
  - [x] Ajouter la règle `!.env.example` APRÈS la ligne `.env*` dans .gitignore
  - [x] Vérifier que .env.example n'est pas ignoré : `git check-ignore .env.example` doit retourner vide
- [x] Task 5 — Vérifier le build et la sécurité (AC: #6, #7)
  - [x] Lancer `npm run build` et vérifier succès
  - [x] Vérifier `git ls-files .env .env.local` retourne vide (pas tracké)
  - [x] Vérifier `git check-ignore .env.local` retourne `.env.local` (bien ignoré)
  - [x] Vérifier `git check-ignore .env.example` retourne vide (PAS ignoré, donc commitable)

## Dev Notes

### Architecture Critique — Ce que tu DOIS savoir

**La clé API n'est actuellement référencée NULLE PART dans le code TypeScript.**
- Aucune occurrence de `process.env` trouvée dans les fichiers `.ts`, `.tsx`, `.js`, `.mjs`
- La variable `CRM_PROJECT_API_KEY` est probablement prévue pour une intégration future (CRM admin V2)
- Cette story concerne uniquement la SÉCURISATION du stockage, pas l'utilisation de la variable

**Le .gitignore actuel bloque DÉJÀ `.env*` (ligne 34).**
- Cela signifie que `.env` et `.env.local` sont TOUS DEUX ignorés — bien
- MAIS cela bloque aussi `.env.example` — il faut ajouter `!.env.example` pour pouvoir le commiter
- L'ordre dans .gitignore est important : la règle `!` doit venir APRÈS `.env*`

**Le fichier .env n'a JAMAIS été commité dans l'historique git.**
- `git log --all -- .env` retourne vide
- `git ls-files .env` retourne vide
- Pas besoin de réécrire l'historique git (git filter-branch ou BFG) — le secret n'est pas dans l'historique

**Conventions du projet (architecture.md) :**
- `.env.local` pour les secrets (gitignored) — AD décision explicite
- `.env.example` comme template des variables d'environnement — commité dans le dépôt
- Variables côté serveur : pas de préfixe `NEXT_PUBLIC_`
- Variables côté client (si nécessaire) : préfixe `NEXT_PUBLIC_`

### Learnings Story 1-1

- **OneDrive lock issue** : les commandes `mv` peuvent échouer à cause du lock OneDrive. Utiliser `cp -r` + `rm -rf` comme fallback si `mv` échoue.
- Le build (`npm run build`) est la validation finale à chaque story.
- Il existe 3 erreurs ESLint pré-existantes dans Services.tsx et Team.tsx — NE PAS tenter de les corriger dans cette story.

### Fichiers Impliqués

| Fichier | Action | Détail |
|---------|--------|--------|
| `.env` | SUPPRIMER | Contient actuellement `CRM_PROJECT_API_KEY=...` (secret réel) |
| `.env.local` | CRÉER | Copie exacte du contenu de `.env` |
| `.env.example` | CRÉER | Template avec valeurs placeholder |
| `.gitignore` | MODIFIER | Ajouter `!.env.example` après `.env*` |

### Anti-patterns à ÉVITER

- ❌ NE PAS commiter `.env.local` (il contient un vrai secret)
- ❌ NE PAS mettre de vraie valeur dans `.env.example`
- ❌ NE PAS supprimer la règle `.env*` du .gitignore — elle protège tous les fichiers .env
- ❌ NE PAS modifier de code TypeScript — cette story est UNIQUEMENT sur les fichiers d'environnement
- ❌ NE PAS installer de dépendances — cette story ne nécessite aucun package

### Complexité et Risque

- **Complexité :** Très faible — 4 opérations de fichier simples
- **Risque :** Faible — le secret n'a jamais été commité, pas de refactoring de code nécessaire
- **Durée estimée :** < 5 minutes d'implémentation

### Project Structure Notes

- Alignement parfait avec la structure définie dans architecture.md
- Aucun conflit avec les fichiers déplacés par Story 1.1
- La structure `(site)/` et `(admin)/` créée par Story 1.1 n'est pas affectée

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Authentication & Security — MVP]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries — .env.local et .env.example]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions — NFR10, NFR11]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

Aucun blocage rencontré. Implémentation directe conforme aux Dev Notes.

### Completion Notes List

- ✅ `.env.local` créé avec `CRM_PROJECT_API_KEY` (valeur réelle, non committée)
- ✅ `.env` supprimé (jamais tracké dans git — historique propre confirmé)
- ✅ `.env.example` créé avec valeur placeholder — commitable
- ✅ `.gitignore` mis à jour : règle `!.env.example` ajoutée après `.env*`
- ✅ Build `npm run build` réussi sans erreur
- ✅ `git ls-files .env .env.local` → vide (non tracké)
- ✅ `git check-ignore .env.local` → bien ignoré
- ✅ `git check-ignore .env.example` → exit code 1, sortie vide (non ignoré)
- ✅ NFR10 et NFR11 respectés : aucun secret dans git

### File List

- `.env` (SUPPRIMÉ)
- `.env.local` (CRÉÉ)
- `.env.example` (CRÉÉ — commité)
- `.gitignore` (MODIFIÉ — `!.env.example` + `*.stackdump`)

### Code Review Fixes Applied

- **[M1+M2]** `.env.example` et `.gitignore` commitées (commit `8392051`)
- **[M3]** `*.stackdump` ajouté au `.gitignore` (crash dumps Windows)
- **[L2]** Convention `NEXT_PUBLIC_` documentée dans `.env.example`
