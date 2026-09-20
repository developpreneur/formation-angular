# Formation Angular — ateliers Storybook

Deux applications minimales et indépendantes. Aucun backend, routeur ou exemple généré superflu.

| Application       | Angular | Storybook                          | Node d'exécution | Port |
| ----------------- | ------- | ---------------------------------- | ---------------- | ---- |
| `apps/angular-15` | 15.2.10 | 8.6.18                             | 18.20.8          | 6006 |
| `apps/angular-22` | 22.1.6  | 10.6.0 (latest à l'initialisation) | 26.5.1           | 6007 |

## Installation

Utiliser Node 26.5.1 (`.node-version`) et pnpm 11.24.0, puis `pnpm install` à la racine. pnpm gère la version Node propre à chaque application via `devEngines.runtime`. L’installation télécharge également les runtimes correspondants.

## Lancement

```sh
pnpm storybook:angular15
pnpm storybook:angular22
```

Ouvrir respectivement http://localhost:6006 et http://localhost:6007. Les deux commandes peuvent tourner dans deux terminaux. Ce sont les deux seuls scripts du monorepo.

## Parcours apprenant

1. Ouvrir **Exercices → chapitre → Consignes**.
2. Ouvrir **À compléter** : un test rouge est attendu, le code compile mais son comportement est incomplet.
3. Modifier les fichiers indiqués dans les consignes, consulter les étapes du test, puis recharger la story.
4. Obtenir un test vert avec le même contrat que le corrigé.
5. Consulter **Corrigés → chapitre → Corrigé** et `solution.component.ts`.

Les corrigés sont visibles : outil pédagogique, pas plateforme d'examen. Les tests sont fournis et ne doivent pas être modifiés pour réussir. Chaque scénario redémarre avec une nouvelle instance du composant.

## Catalogue complet

Les 16 exercices de l’agenda donnent **17 scénarios par parcours** (deux cas pour OnPush), chacun en version à compléter et en corrigé. Le total annoncé initialement comme « 17 exercices » comptait en réalité ces deux cas séparément. Les durées incluent la correction.

| Application | Exercice                                                                                               | Durée  |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------ |
| Angular 15  | 00 — Binding                                                                                           | 10 min |
| Angular 15  | [01 — Classes Angular](apps/angular-15/src/exercises/01-classes/instructions.mdx)                      | 20 min |
| Angular 15  | [02 — Injection de dépendances](apps/angular-15/src/exercises/02-injection/instructions.mdx)           | 20 min |
| Angular 15  | [03 — Cycle de vie](apps/angular-15/src/exercises/03-lifecycle/instructions.mdx)                       | 15 min |
| Angular 15  | [04 — Directives et pipes](apps/angular-15/src/exercises/04-templates/instructions.mdx)                | 20 min |
| Angular 15  | [05A — Validation des formulaires](apps/angular-15/src/exercises/05a-form-validation/instructions.mdx) | 25 min |
| Angular 15  | [05B — Formulaires dynamiques](apps/angular-15/src/exercises/05b-form-array/instructions.mdx)          | 25 min |
| Angular 15  | [06 — Contrôle personnalisé](apps/angular-15/src/exercises/06-custom-control/instructions.mdx)         | 35 min |
| Angular 15  | [07 — Impératif et réactif](apps/angular-15/src/exercises/07-reactive-state/instructions.mdx)          | 15 min |
| Angular 15  | [08A — RxJS et concurrence](apps/angular-15/src/exercises/08a-rxjs-concurrency/instructions.mdx)       | 25 min |
| Angular 15  | [08B — RxJS et erreurs](apps/angular-15/src/exercises/08b-rxjs-errors/instructions.mdx)                | 20 min |
| Angular 15  | [08C — RxJS et destruction](apps/angular-15/src/exercises/08c-rxjs-cleanup/instructions.mdx)           | 20 min |
| Angular 15  | [09 — Change detection](apps/angular-15/src/exercises/09-change-detection/instructions.mdx)            | 25 min |
| Angular 15  | [10 — Standalone](apps/angular-15/src/exercises/10-standalone/instructions.mdx)                        | 20 min |
| Angular 15  | [11 — Store NgRx](apps/angular-15/src/exercises/11-ngrx/instructions.mdx)                              | 30 min |
| Angular 22  | [01 — Signals](apps/angular-22/src/exercises/01-signals/instructions.mdx)                              | 25 min |

Les exercices 08A et 08B utilisent des réponses API contrôlées, sans backend ni délais réseau aléatoires. Le 08C mesure les vraies souscriptions. Le 09 propose deux tests distincts. Le 10 garde volontairement un rendu valide et échoue sur le contrat d’architecture `isStandalone`. Le 11 utilise NgRx Store/Effects 15.4.0 et inclut des assertions unitaires du reducer/selector dans le scénario navigateur.

Les points de départ doivent tous échouer : ce sont des exercices à résoudre. Les corrigés doivent tous passer. Pour l’exercice NgRx, modifier aussi `exercise.store.ts` ; les autres fichiers à modifier sont indiqués dans chaque consigne. Aucun exercice ne dépend de la correction du précédent.

## Vérification facultative, sans scripts supplémentaires

Storybook lancé, installer le navigateur de test avec `pnpm --filter @formations/angular-15 exec playwright install chromium` (répéter pour angular-22 si nécessaire), puis :

```sh
pnpm --filter @formations/angular-15 exec test-storybook --url http://localhost:6006 --includeTags solution --maxWorkers 1
pnpm --filter @formations/angular-22 exec test-storybook --url http://localhost:6007 --includeTags solution --maxWorkers 1
```

Remplacer `solution` par `exercise` pour tester le travail apprenant : ces tests doivent échouer avant correction. Ne pas lancer indistinctement tous les exercices comme une suite censée être verte.

Builds statiques facultatifs : `pnpm --filter @formations/angular-15 exec ng run formation:build-storybook` et l'équivalent angular-22. Les targets `build` des applications existent uniquement comme configuration de support au builder Storybook.

## Fichiers d'un exercice

- `instructions.mdx` : objectif, étapes, critères, indices.
- `exercise.component.ts` : point de départ à modifier.
- `exercise.html` : vue fournie.
- `solution.component.ts` : corrigé indépendant.
- `behavior.ts` : contrat d'interaction partagé.
- `exercise.stories.ts` / `solution.stories.ts` : scénarios séparés.

Pas de service de captures visuelles externe : la validation utilise des assertions DOM et des interactions réelles. Elle ne remplace pas la revue du code, notamment pour vérifier l'emploi de `computed`.

## Validation du catalogue — 16 septembre 2026

- Compilation stricte Angular 15 (composants, templates et stories) : réussie.
- Builds statiques des deux Storybooks : réussis.
- Corrigés : **17 scénarios réussis** (16 Angular 15 et 1 Angular 22).
- Points de départ : **17 échecs attendus**, vérifiés sur la notion à corriger, sans erreur de démarrage.
- Les 16 fiches sont présentes et leur rendu a été contrôlé.

Les tests de contrat du reducer et du selector NgRx sont exécutés par la story du Store. Aucun script supplémentaire n’a été ajouté à la racine.
