import type { Meta, StoryObj } from "@storybook/angular";
import { verifyAsyncPipe } from "./behavior";
import { AsyncDataSolutionComponent } from "./solution.component";

const meta: Meta<AsyncDataSolutionComponent> = {
  title: "Corrigés/Détection des changements/Donnée asynchrone",
  component: AsyncDataSolutionComponent,
  tags: ["solution", "!autodocs", "change-detection"],
};
export default meta;
type Story = StoryObj<AsyncDataSolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyAsyncPipe,
};
