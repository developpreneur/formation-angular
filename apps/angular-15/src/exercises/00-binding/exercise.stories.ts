import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { GreetingExerciseComponent } from "./exercise.component";

/**
 * Afficher "Bonjour <prénom> !" sous le champ, où <prénom> est remplacé par la saisie de l'utilisateur.
 *
 * Affichez 'Bonjour !' si la saisie est vide.
 */
const meta: Meta<GreetingExerciseComponent> = {
  title: "Exercices/00 — Binding",
  component: GreetingExerciseComponent,
  tags: ["exercise"],
};
export default meta;
type Story = StoryObj<GreetingExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyBehavior,
};
