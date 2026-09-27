import type { Meta, StoryObj } from "@storybook/angular";
import { verifyStandaloneMigration } from "./behavior";
import { NgModuleMigrationExerciseComponent } from "./exercise.component";

/**
 * La liste affiche une fiche de formation avec ses durées, un badge « Legacy » et les places restantes en présentiel et en ligne.
 *
 * La faible disponibilité en présentiel est mise en évidence.
 */
const meta: Meta<NgModuleMigrationExerciseComponent> = {
  title: "Exercices/08 — Standalone/1 — NgModule migration",
  component: NgModuleMigrationExerciseComponent,
  tags: ["exercise", "standalone-08"],
};
export default meta;
type Story = StoryObj<NgModuleMigrationExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyStandaloneMigration,
};
