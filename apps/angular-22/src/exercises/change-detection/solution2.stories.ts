import type { Meta, StoryObj } from "@storybook/angular";
import { verifyUpdatedMessage } from "./behavior";
import { UpdateMessageSolutionComponent } from "./solution.component";

const meta: Meta<UpdateMessageSolutionComponent> = {
  title: "Corrigés/Détection des changements/Mise à jour par timer",
  component: UpdateMessageSolutionComponent,
  tags: ["solution", "!autodocs", "change-detection"],
};
export default meta;
type Story = StoryObj<UpdateMessageSolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyUpdatedMessage,
};
