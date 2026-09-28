import type { Meta, StoryObj } from "@storybook/angular";
import { verifyDeliveryMethodBehavior } from "./behavior";
import { SolutionComponent } from "./solution.component";

const meta: Meta<SolutionComponent> = {
  title: "Corrigés/Formulaire personnalisé",
  component: SolutionComponent,
  tags: ["solution", "!autodocs", "custom-control"],
};
export default meta;
type Story = StoryObj<SolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyDeliveryMethodBehavior,
};
