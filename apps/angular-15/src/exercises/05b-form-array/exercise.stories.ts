import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";

/**
 * Ajouter une ligne de formulaire dynamique à chaque fois que l'utilisateur clique sur le bouton "Ajouter une ligne".
 *
 * Supprimer une ligne de formulaire existante lorsque l'utilisateur clique sur le bouton "Supprimer la ligne".
 *
 * En cas de suppression d'une ligne, les autres lignes conservent leurs identifiants et libellés corrects. La prochaine ligne ajoutée doit recevoir un nouvel identifiant unique.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/05B — Formulaires dynamiques",
  component: ExerciseComponent,
  tags: ["exercise"],
};
export default meta;
type Story = StoryObj<ExerciseComponent>;
export const ACompleter: Story = { name: "À compléter", play: verifyBehavior };
