import type { Meta, StoryObj } from "@storybook/angular";
import { verifyEditProfile } from "./behavior";
import { EditProfileSolutionComponent } from "./solution.component";

const meta: Meta<EditProfileSolutionComponent> = {
  title: "Corrigés/07 — Détection des changements/1 - Edit profile",
  component: EditProfileSolutionComponent,
  tags: ["solution", "!autodocs", "cd-07-change-detection"],
};
export default meta;
type Story = StoryObj<EditProfileSolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyEditProfile,
};
