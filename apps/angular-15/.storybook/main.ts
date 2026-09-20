import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: [dirname(require.resolve('@storybook/addon-actions/package.json')), dirname(require.resolve('@storybook/addon-docs/package.json')), dirname(require.resolve('@storybook/addon-interactions/package.json'))],
  framework: { name: dirname(require.resolve('@storybook/angular/package.json')), options: {} },
  core: { disableTelemetry: true },
};
export default config;
