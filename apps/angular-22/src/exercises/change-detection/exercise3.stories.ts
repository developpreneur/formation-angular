import type { Meta, StoryObj } from "@storybook/angular";
import { verifyAsyncPipe } from "./behavior";
import { AsyncDataExerciseComponent } from "./exercise.component";

/**
 * Le statut affiche d'abord « En attente », puis « Réponse reçue » lorsque
 * la donnée asynchrone arrive, sans intervention de l'utilisateur.
 */
const meta: Meta<AsyncDataExerciseComponent> = {
  title: "Exercices/Détection des changements/Donnée asynchrone",
  component: AsyncDataExerciseComponent,
  tags: ["exercise", "change-detection"],
};
export default meta;
type Story = StoryObj<AsyncDataExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyAsyncPipe,
};
