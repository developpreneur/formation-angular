import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { SolutionComponent } from "./solution.component";

const meta: Meta<SolutionComponent> = {
  title: "Corrigés/01 — Classes Angular",
  component: SolutionComponent,
  tags: ["solution", "!autodocs"],
};
export default meta;

type Story = StoryObj<SolutionComponent>;

export const Corrige: Story = { name: "Corrigé", play: verifyBehavior };
