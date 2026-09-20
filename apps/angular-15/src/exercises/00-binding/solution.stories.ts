import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { GreetingSolutionComponent } from "./solution.component";

const meta: Meta<GreetingSolutionComponent> = {
  title: "Corrigés/00 — Binding",
  component: GreetingSolutionComponent,
  tags: ["solution", "!autodocs"],
};
export default meta;
type Story = StoryObj<GreetingSolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyBehavior,
};
