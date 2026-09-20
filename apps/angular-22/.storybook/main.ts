import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/angular';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: [dirname(require.resolve('@storybook/addon-docs/package.json'))],
  framework: { name: dirname(require.resolve('@storybook/angular/package.json')), options: {} },
  core: { disableTelemetry: true },
};
export default config;
