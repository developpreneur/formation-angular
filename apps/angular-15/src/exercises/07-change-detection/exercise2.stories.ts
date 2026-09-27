import type { Meta, StoryObj } from "@storybook/angular";
import { verifyUpdatedMessage } from "./behavior";
import { UpdateMessageExerciceComponent } from "./exercise.component";

/**
 * Au click sur le bouton, après 80 ms, le message est mis à jour dans le composant.
 *
 * Corrigez le composant pour qu'il reflète correctement le message après la mise à jour.
 */
const meta: Meta<UpdateMessageExerciceComponent> = {
  title: "Exercices/07 — Détection des changements/2 - Mise à jour par timer",
  component: UpdateMessageExerciceComponent,
  tags: ["exercise", "cd-07-change-detection"],
};
export default meta;
type Story = StoryObj<UpdateMessageExerciceComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyUpdatedMessage,
};
