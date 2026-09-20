import { Component, inject, Input } from "@angular/core";
import { SelectionService, SelectionSummaryComponent } from "./shared";

@Component({
  selector: "formation-panel-solution",
  standalone: true,
  imports: [SelectionSummaryComponent],
  providers: [SelectionService],
  template: `<fieldset>
    <legend>{{ label }}</legend>
    <button type="button" (click)="selectItem()">
      Sélectionner {{ label }}
    </button>
    <formation-selection-summary [label]="label" />
    <p>{{ label }} voit l'état global : {{ globalSelection.selected }}</p>
  </fieldset>`,
})
export class SelectionPanelComponent {
  @Input() label = "";

  protected readonly selection = inject(SelectionService);
  protected readonly globalSelection = inject(SelectionService, {
    skipSelf: true,
  });

  selectItem() {
    this.selection.select(this.label);
    this.globalSelection.select(this.label);
  }
}

@Component({
  selector: "formation-di-solution",
  standalone: true,
  imports: [SelectionPanelComponent, SelectionSummaryComponent],
  providers: [SelectionService],
  template: `<section class="lab">
    <p class="eyebrow">Fondamentaux · Injection</p>
    <h1>Sélections locales et suivi global</h1>
    <formation-selection-summary label="Globale" />
    <formation-panel-solution label="Haut" />
    <formation-panel-solution label="Bas" />
  </section>`,
})
export class SolutionComponent {}
