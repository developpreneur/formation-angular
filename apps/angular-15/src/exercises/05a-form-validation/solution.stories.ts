import type { Meta, StoryObj } from "@storybook/angular";
import { fn } from "@storybook/test";
import { verifyBehavior } from "./behavior";
import { SolutionComponent } from "./solution.component";
const meta: Meta<SolutionComponent> = {
  title: "Corrigés/05A — Validation des formulaires",
  component: SolutionComponent,
  tags: ["solution", "!autodocs"],
  argTypes: { submitted: { action: "submitted", control: false } },
  args: { submitted: fn() },
  render: (args) => ({
    props: args,
    template:
      '<formation-validation-solution (submitted)="submitted($event)"></formation-validation-solution>',
  }),
};
export default meta;
type Story = StoryObj<SolutionComponent>;
export const Corrige: Story = { name: "Corrigé", play: verifyBehavior };
