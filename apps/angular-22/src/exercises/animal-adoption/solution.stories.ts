import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from "@storybook/angular";
import { verifyAnimalAdoptionBehavior } from "./behavior";
import { AnimalShelterService } from "./shared";
import { SolutionComponent } from "./solution.component";

const meta: Meta<SolutionComponent> = {
  title: "Corrigés/Refuge animalier",
  component: SolutionComponent,
  decorators: [applicationConfig({ providers: [AnimalShelterService] })],
  tags: ["solution", "!autodocs", "animal-adoption", "signals", "control-flow"],
};
export default meta;
type Story = StoryObj<SolutionComponent>;

export const Corrige: Story = {
  name: "Corrigé",
  play: verifyAnimalAdoptionBehavior,
};
