import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "formation-exercise",
  template: `
    <section class="lab" aria-labelledby="title">
      <p class="eyebrow">Fondamentaux · Binding</p>
      <h1 id="title">Un accueil personnalisé</h1>
      <label for="first-name">Prénom</label>
      <input id="first-name" autocomplete="off" />
      <p class="result" role="status" aria-live="polite">{{ greeting }}</p>
    </section>
  `,
  standalone: true,
  imports: [FormsModule],
})
export class GreetingExerciseComponent {
  protected greeting = "Bonjour !";
}
