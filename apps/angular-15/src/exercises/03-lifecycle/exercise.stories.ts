import type { Meta, StoryObj } from "@storybook/angular";
import { verifyBehavior } from "./behavior";
import { ExerciseComponent } from "./exercise.component";
/**
 * Afficher le profil interne et le profil projeté
 *
 * Le profile interne doit afficher le label projeté via `projectedLabel`
 *
 * > Aide: Utilisez `this.projectedLabelTemplate.nativeElement.innerHTML.trim()` dans `ProfileGroupComponent` pour accéder à la valeur du label.
 *
 * Au clique de "Renommer en Grace", le nom du profil interne et du profil projeté doit être mis à jour.
 */
const meta: Meta<ExerciseComponent> = {
  title: "Exercices/03 — Cycle de vie",
  component: ExerciseComponent,
  tags: ["exercise"],
};
export default meta;
type Story = StoryObj<ExerciseComponent>;
export const ACompleter: Story = { name: "À compléter", play: verifyBehavior };
