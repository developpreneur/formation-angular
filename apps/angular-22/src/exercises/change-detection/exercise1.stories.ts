import type { Meta, StoryObj } from "@storybook/angular";
import { verifyEditProfile } from "./behavior";
import { EditProfileExerciseComponent } from "./exercise.component";

/**
 * Les vues Eager et OnPush affichent le profil initial. Après avoir changé le
 * profil, elles affichent toutes les deux le nouveau nom sans autre interaction.
 */
const meta: Meta<EditProfileExerciseComponent> = {
  title: "Exercices/Détection des changements/Modifier le profil",
  component: EditProfileExerciseComponent,
  tags: ["exercise", "change-detection"],
};
export default meta;
type Story = StoryObj<EditProfileExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyEditProfile,
};
