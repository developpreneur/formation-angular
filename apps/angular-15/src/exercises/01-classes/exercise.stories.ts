import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";

/**
 * Utiliser le pipe `requestStatus` pour afficher les statuts de manière lisible.
 *
 * Affichez "Statut inconnu" pour les codes de statut non reconnus.
 *
 * Désactivez le bouton d'archivage lorsque le statut est "Archivée".
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/01 — Classes Angular",
  component: ExerciseComponent,
  tags: ["exercise"],
};
export default meta;

type Story = StoryObj<ExerciseComponent>;

export const ACompleter: Story = { name: "À compléter", play: verifyBehavior };
