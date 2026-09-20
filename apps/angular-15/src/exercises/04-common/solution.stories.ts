import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { ProductListSolutionComponent } from "./solution.component";

const meta: Meta<ProductListSolutionComponent> = {
  title: "Corrigés/04 - Directives et pipes communes",
  component: ProductListSolutionComponent,
  tags: ["solution", "!autodocs"],
};
export default meta;
type Story = StoryObj<ProductListSolutionComponent>;
export const Corrige: Story = { name: "Corrige", play: verifyBehavior };
