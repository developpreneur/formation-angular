import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from "@storybook/angular";
import { verifyScoreboardBehavior } from "./behavior";
import { ExerciseMatchEffects, exerciseReducers } from "./exercise-store";
import { ExerciseComponent } from "./exercise.component";
import { MatchScoresService } from "./shared";

/**
 * Le tableau commence à 0–0 et les onglets indiquent le panneau actif.
 *
 * Les boutons ajoutent le nombre de points attendu à la bonne équipe.
 *
 * L’ouverture du panneau des matchs affiche le chargement puis les scores reçus.
 *
 * Une actualisation en échec conserve les scores connus, affiche une erreur et permet de réessayer.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/Gestion d’état",
  component: ExerciseComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideStore(exerciseReducers),
        provideStoreDevtools(),
        provideEffects(ExerciseMatchEffects),
        MatchScoresService,
      ],
    }),
  ],
  tags: ["exercise", "state-management"],
};
export default meta;
type Story = StoryObj<ExerciseComponent>;

export const ACompleter: Story = {
  name: "À compléter",
  play: verifyScoreboardBehavior,
};
