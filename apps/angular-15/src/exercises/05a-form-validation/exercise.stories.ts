import type { Meta, StoryObj } from "@storybook/angular";
import { fn } from "@storybook/test";
import { verifyBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";

/**
 * Empêcher l'affichage des messages d'erreur avant qu'une interaction avec le formulaire n'ait eu lieu.
 *
 * Empêcher la validation d'une date de fin antérieure à la date de début.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/05A — Validation des formulaires",
  component: ExerciseComponent,
  tags: ["exercise"],
  args: { submitted: fn() },
  render: (args) => ({
    props: args,
    template:
      '<formation-validation-exercise (submitted)="submitted($event)"></formation-validation-exercise>',
  }),
};
export default meta;
type Story = StoryObj<ExerciseComponent>;
export const ACompleter: Story = { name: "À compléter", play: verifyBehavior };
