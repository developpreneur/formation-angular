import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "formation-solution",
  template: `
    <section class="lab" aria-labelledby="title">
      <p class="eyebrow">Fondamentaux · Exercice 00</p>
      <h1 id="title">Un accueil personnalisé</h1>
      <label for="first-name">Prénom</label>
      <input id="first-name" [(ngModel)]="firstName" autocomplete="off" />
      <p class="result" role="status" aria-live="polite">{{ greeting }}</p>
    </section>
  `,
  standalone: true,
  imports: [FormsModule],
})
export class GreetingSolutionComponent {
  protected firstName = "";

  protected get greeting(): string {
    const name = this.firstName.trim();
    return name ? `Bonjour ${name} !` : "Bonjour !";
  }
}
