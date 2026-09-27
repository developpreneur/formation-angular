import type { Meta, StoryObj } from '@storybook/angular';
import { verifyStandaloneMigration } from './behavior';
import { NgModuleMigrationSolutionComponent } from './solution.component';

const meta: Meta<NgModuleMigrationSolutionComponent> = {
  title: 'Corrigés/08 — Standalone/1 — NgModule migration',
  component: NgModuleMigrationSolutionComponent,
  tags: ['solution', '!autodocs', 'standalone-08'],
};
export default meta;
type Story = StoryObj<NgModuleMigrationSolutionComponent>;

export const Corrige: Story = {
  name: 'Corrigé',
  play: verifyStandaloneMigration,
};