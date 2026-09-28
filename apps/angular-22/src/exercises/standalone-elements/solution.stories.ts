import type { Meta, StoryObj } from "@storybook/angular";
import { verifyStandaloneMigration } from "./behavior";
import { NgModuleMigrationSolutionComponent } from "./solution.component";

const meta: Meta<NgModuleMigrationSolutionComponent> = {
  title: "Corrigés/Standalone elements",
  component: NgModuleMigrationSolutionComponent,
  tags: ["solution", "!autodocs", "standalone-elements"],
};
export default meta;
type Story = StoryObj<NgModuleMigrationSolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyStandaloneMigration,
};
