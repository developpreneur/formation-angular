---
applyTo: "apps/angular-15/src/exercises/**,apps/angular-22/src/exercises/**"
---

# Angular Storybook Exercises

Use standalone Angular components with inline templates and explicit imports, following the target app's installed Angular APIs. Write learner-facing copy in French. Use typed Storybook `Meta` and `StoryObj` with matching `Exercices/...` and `Corrigés/...` titles. Tag the stories `exercise` and `solution` respectively, add `!autodocs` to the solution, and include topic tags when applicable. Export `ACompleter` ("À compléter") and `Corrige` ("Corrigé") as the story names.

## Exercise UI

Build the exercise UI exclusively with daisyUI components and utilities. Add only the minimal custom CSS needed where daisyUI cannot express the layout. Keep the result attractive and as simple as possible, so the feature being learned remains the visual and interactive focus.

## Files and ownership

Create a paired `exercise.component.ts` and `solution.component.ts`, with `exercise.stories.ts`, `solution.stories.ts`, `shared.ts`, and `behavior.ts` for the same exercise.

- Keep the exercise component compilable and runnable, but leave the requested behavior for the learner to implement there.
- Make the solution component a complete, independent implementation of the same behavior. Do not make it depend on the exercise component.
- Put shared fixtures, constants, or helpers used by both components in `shared.ts`. Treat this file as fixed instructor-owned scaffolding: the learner's task must not require editing it.
- Keep the acceptance contract in `behavior.ts`; do not make passing tests depend on editing or weakening that contract.

## Story descriptions

In `exercise.stories.ts`, write a TSDoc block immediately above the Storybook metadata describing the correct, observable behavior and relevant edge cases. State what the user should see or be able to do, without prescribing implementation steps, naming the solution technique, or exposing solution code. Keep the exercise and solution stories separate and follow the target app's story tags and naming conventions.

## Acceptance behavior

Export one acceptance function from `behavior.ts` and use that same function as the `play` test in both stories. Test observable behavior through accessible roles, labels, and realistic user interactions; cover the exercise's stated outcomes and important edge cases.

At scaffold time, the exercise starter must fail this acceptance test because its requested behavior is incomplete, while the solution must pass. After the learner implements the behavior in `exercise.component.ts`, the exercise must pass the unchanged test too. Never tailor different tests to the two stories or make the exercise fail for unrelated reasons.

## Verification

Use the repository's documented Storybook test commands and target-app configuration. Verify that the solution story passes and that the exercise story fails for the intended missing behavior before implementation; after completing the exercise, verify it passes the same contract. Keep changes limited to the exercise and its supporting files.
