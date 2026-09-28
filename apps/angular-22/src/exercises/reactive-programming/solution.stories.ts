import type { Meta, StoryObj } from "@storybook/angular";
import { verifyShopBehavior } from "./behavior";
import { SolutionComponent } from "./solution.component";

const meta: Meta<SolutionComponent> = {
  title: "Corrigés/Programmation réactive",
  component: SolutionComponent,
  tags: ["solution", "!autodocs", "reactive-programming"],
};
export default meta;
type Story = StoryObj<SolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyShopBehavior,
};
