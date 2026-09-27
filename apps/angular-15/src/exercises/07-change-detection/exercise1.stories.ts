import type { Meta, StoryObj } from "@storybook/angular";
import { verifyEditProfile } from "./behavior";
import { EditProfileExerciceComponent } from "./exercise.component";

/**
 * Comparez la stratégie Default (eager) à OnPush.
 *
 * Muter le profil met à jour la vue Default, mais l'enfant OnPush conserve son ancien affichage.
 *
 * Une interaction dans cet enfant révèle ensuite la mutation.
 *
 * Corrigez le composant `EditProfileExerciceComponent` pour que les deux vues reçoivent le nouveau profil sans dépendre de cette interaction.
 */
const meta: Meta<EditProfileExerciceComponent> = {
  title: "Exercices/07 — Détection des changements/1 — Edit profile",
  component: EditProfileExerciceComponent,
  tags: ["exercise", "cd-07-change-detection"],
};
export default meta;
type Story = StoryObj<EditProfileExerciceComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyEditProfile,
};
