import type { Meta, StoryObj } from "@storybook/angular";
import { verifyDeliveryMethodBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";

/**
 * Le mode de remise courant est affiché et doit suivre les changements initiés par le contrôle ou son parent.
 *
 * Le contrôle devient touché lorsque le focus quitte l'ensemble de ses options, et la désactivation bloque les interactions.
 *
 * Le formulaire signale un mode manquant (si aucun n'est sélectionné après avoir touché le contrôle) et un mode non autorisé par la commande.
 *
 * > Aide: Pour les validateur asynchrones, utilisez `NG_ASYNC_VALIDATORS` au lieu de `NG_VALIDATORS`.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/06 — Contrôle de formulaire personnalisé",
  component: ExerciseComponent,
  tags: ["exercise", "forms-06"],
};
export default meta;
type Story = StoryObj<ExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyDeliveryMethodBehavior,
};
