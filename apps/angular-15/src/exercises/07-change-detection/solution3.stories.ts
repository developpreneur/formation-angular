import type { Meta, StoryObj } from "@storybook/angular";
import { verifyAsyncPipe } from "./behavior";
import { AsyncDataSolutionComponent } from "./solution.component";

const meta: Meta<AsyncDataSolutionComponent> = {
  title: "Corrigés/07 — Détection des changements/3 - Donnée asynchrone",
  component: AsyncDataSolutionComponent,
  tags: ["solution", "!autodocs", "cd-07-change-detection"],
};
export default meta;
type Story = StoryObj<AsyncDataSolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyAsyncPipe,
};
