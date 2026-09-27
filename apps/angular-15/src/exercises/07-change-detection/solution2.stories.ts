import type { Meta, StoryObj } from "@storybook/angular";
import { verifyUpdatedMessage } from "./behavior";
import { UpdateMessageSolutionComponent } from "./solution.component";

const meta: Meta<UpdateMessageSolutionComponent> = {
  title: "Corrigés/07 — Détection des changements/2 - Mise à jour par timer",
  component: UpdateMessageSolutionComponent,
  tags: ["solution", "!autodocs", "cd-07-change-detection"],
};
export default meta;
type Story = StoryObj<UpdateMessageSolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyUpdatedMessage,
};
