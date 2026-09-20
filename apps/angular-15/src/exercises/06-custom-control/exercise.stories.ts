import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";

/**
 * Integrer le selecteur de methode de livraison dans un formulaire Angular.
 *
 * > Aide: Implementez le ControlValueAccessor dans le composant.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/06 - Controle de formulaire personnalise",
  component: ExerciseComponent,
  tags: ["exercise"],
};
export default meta;
type Story = StoryObj<ExerciseComponent>;
export const ACompleter: Story = { name: "A completer", play: verifyBehavior };
