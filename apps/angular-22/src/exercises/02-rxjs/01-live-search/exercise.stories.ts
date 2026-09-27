import type { Meta, StoryObj } from "@storybook/angular";
import { verifyReactiveSearchBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";

/**
 * Le catalogue affiche les formations correspondant à la saisie après une courte pause.
 * Les espaces superflus et la casse ne changent pas la recherche ; une saisie équivalente ne relance pas le chargement.
 * Effacer le champ réinitialise immédiatement l'affichage et empêche une réponse déjà attendue de le remplir ensuite.
 * Les résultats absents et une indisponibilité simulée ont des états distincts ; une recherche ultérieure fonctionne après l'erreur.
 * Le terme « erreur » déclenche l'indisponibilité simulée, et l'API répond normalement après 500 ms.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/02 — RxJS/1 — Recherche réactive",
  component: ExerciseComponent,
  tags: ["exercise", "rxjs-02"],
};
export default meta;
type Story = StoryObj<ExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyReactiveSearchBehavior,
};
