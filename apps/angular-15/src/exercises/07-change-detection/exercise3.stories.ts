import type { Meta, StoryObj } from "@storybook/angular";
import { verifyAsyncPipe } from "./behavior";
import { AsyncDataExerciseComponent } from "./exercise.component";

/**
 * Le message change de valeur après la souscription à l'Observable.
 *
 * Corrigez le composant pour refléter la modification de la valeur asynchrone.
 */
const meta: Meta<AsyncDataExerciseComponent> = {
  title: "Exercices/07 — Détection des changements/3 - Donnée asynchrone",
  component: AsyncDataExerciseComponent,
  tags: ["exercise", "cd-07-change-detection"],
};
export default meta;
type Story = StoryObj<AsyncDataExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyAsyncPipe,
};
