import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    options: { storySort: { order: ['Exercices', 'Corrigés'] } },
  },
};
export default preview;
