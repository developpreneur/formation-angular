import type { Meta, StoryObj } from "@storybook/angular";
import { verifyUpdatedMessage } from "./behavior";
import { UpdateMessageExerciseComponent } from "./exercise.component";

/**
 * Le message affiche d'abord « En attente », puis « Résultat reçu » après
 * avoir chargé le résultat, sans qu'une autre interaction soit nécessaire.
 */
const meta: Meta<UpdateMessageExerciseComponent> = {
  title: "Exercices/Détection des changements/Mise à jour par timer",
  component: UpdateMessageExerciseComponent,
  tags: ["exercise", "change-detection"],
};
export default meta;
type Story = StoryObj<UpdateMessageExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyUpdatedMessage,
};
