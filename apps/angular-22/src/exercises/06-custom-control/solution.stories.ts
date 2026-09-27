import type { Meta, StoryObj } from "@storybook/angular";
import { verifyDeliveryMethodBehavior } from "./behavior";
import { SolutionComponent } from "./solution.component";

const meta: Meta<SolutionComponent> = {
  title: "Corrigés/06 — Contrôle de formulaire personnalisé",
  component: SolutionComponent,
  tags: ["solution", "!autodocs", "forms-06"],
};
export default meta;
type Story = StoryObj<SolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyDeliveryMethodBehavior,
};
