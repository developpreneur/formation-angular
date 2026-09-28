import type { Meta, StoryObj } from "@storybook/angular";
import { verifyEditProfile } from "./behavior";
import { EditProfileSolutionComponent } from "./solution.component";

const meta: Meta<EditProfileSolutionComponent> = {
  title: "Corrigés/Détection des changements/Modifier le profil",
  component: EditProfileSolutionComponent,
  tags: ["solution", "!autodocs", "change-detection"],
};
export default meta;
type Story = StoryObj<EditProfileSolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyEditProfile,
};
