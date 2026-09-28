import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from "@storybook/angular";
import { verifyScoreboardBehavior } from "./behavior";
import { MatchScoresService } from "./shared";
import { SolutionMatchEffects, solutionReducers } from "./solution-store";
import { SolutionComponent } from "./solution.component";

const meta: Meta<SolutionComponent> = {
  title: "Corrigés/Gestion d’état",
  component: SolutionComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideStore(solutionReducers),
        provideStoreDevtools(),
        provideEffects(SolutionMatchEffects),
        MatchScoresService,
      ],
    }),
  ],
  tags: ["solution", "!autodocs", "state-management"],
};
export default meta;
type Story = StoryObj<SolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyScoreboardBehavior,
};
