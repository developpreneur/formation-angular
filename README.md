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

1. Ouvrir **Exercices → chapitre → À compléter** et lire la description de la story.
2. Un test rouge est attendu : le code compile, mais son comportement est incomplet.
3. Modifier les fichiers concernés, consulter les étapes du test, puis recharger la story.
4. Obtenir un test vert avec le même contrat que le corrigé.
5. Consulter **Corrigés → chapitre → Corrigé** et `solution.component.ts`.

Les corrigés sont visibles : outil pédagogique, pas plateforme d'examen. Les tests sont fournis et ne doivent pas être modifiés pour réussir. Chaque scénario redémarre avec une nouvelle instance du composant.

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

Pas de service de captures visuelles externe : la validation utilise des assertions DOM et des interactions réelles. Elle ne remplace pas la revue du code, notamment pour vérifier l'emploi de `computed`. Les builds statiques s'appuient sur les targets Storybook existants.

Les consignes propres à chaque scénario sont accessibles dans Storybook.
