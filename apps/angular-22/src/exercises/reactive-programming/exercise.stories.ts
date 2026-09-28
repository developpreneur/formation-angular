import type { Meta, StoryObj } from "@storybook/angular";
import { verifyShopBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";

/**
 * Le catalogue affiche les produits et leurs prix ; le panier est vide au départ.
 *
 * Ajouter plusieurs fois un produit augmente sa quantité, le nombre d'articles et le total.
 *
 * Les boutons du panier augmentent ou diminuent les quantités ; diminuer à zéro retire la ligne.
 *
 * Retirer un produit ne modifie pas les autres lignes. Vider le panier remet le total à zéro
 *
 * et désactive le bouton tant qu'il est vide ; un nouvel ajout fonctionne ensuite.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/Programmation réactive",
  component: ExerciseComponent,
  tags: ["exercise", "reactive-programming"],
};
export default meta;
type Story = StoryObj<ExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyShopBehavior,
};
