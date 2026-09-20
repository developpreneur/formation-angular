import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { ProductListExerciseComponent } from "./exercise.component";

const meta: Meta<ProductListExerciseComponent> = {
  title: "Exercices/04 - Directives et pipes communes",
  component: ProductListExerciseComponent,
  tags: ["exercise"],
  parameters: {
    docs: {
      description: {
        component:
          "Affichez la date de mise en vente et le prix dans un format lisible. Le filtre doit retirer les produits vendus de la liste. Marquez une annonce a comparer, puis rafraichissez les annonces : ce choix doit etre conserve.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<ProductListExerciseComponent>;
export const ACompleter: Story = { name: "A completer", play: verifyBehavior };
