import type { Meta, StoryObj } from "@storybook/angular";
import { verifyReactiveSearchBehavior } from "./behavior";
import { SolutionComponent } from "./solution.component";

const meta: Meta<SolutionComponent> = {
  title: "Corrigés/RxJS",
  component: SolutionComponent,
  tags: ["solution", "!autodocs", "rxjs"],
};
export default meta;
type Story = StoryObj<SolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyReactiveSearchBehavior,
};
