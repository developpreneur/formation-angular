import type { Preview } from "@storybook/angular";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    options: { storySort: { order: ["Exercices", "Corrigés"] } },
  },
};
export default preview;
