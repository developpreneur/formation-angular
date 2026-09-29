import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from "@storybook/angular";
import { verifyAnimalAdoptionBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";
import { AnimalShelterService } from "./shared";

/**
 * Le catalogue affiche les animaux après un court état de chargement.
 * Le filtre par espèce met à jour les cartes visibles.
 * Chaque animal peut être ajouté à la sélection, qui peut être effacée globalement.
 * Une demande d'adoption affiche une confirmation globale, refermable, sans modifier la carte.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/Refuge animalier",
  component: ExerciseComponent,
  decorators: [applicationConfig({ providers: [AnimalShelterService] })],
  tags: ["exercise", "animal-adoption", "signals", "control-flow"],
};
export default meta;
type Story = StoryObj<ExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyAnimalAdoptionBehavior,
};
