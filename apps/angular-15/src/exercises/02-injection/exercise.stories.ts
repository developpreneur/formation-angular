import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";

/**
 * Chaque carte doit afficher à la fois la sélection locale et l'état global.
 *
 * L'état global doit refléter le dernier état sélectionné par n'importe quel panneau.
 *
 * L'état global doit être partagé entre tous les panneaux.
 *
 * Les panneaux doivent pouvoir sélectionner leur propre état local sans affecter directement l'état local des autres panneaux.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/02 — Injection de dépendances",
  component: ExerciseComponent,
  tags: ["exercise"],
};
export default meta;

type Story = StoryObj<ExerciseComponent>;

export const ACompleter: Story = { name: "À compléter", play: verifyBehavior };
