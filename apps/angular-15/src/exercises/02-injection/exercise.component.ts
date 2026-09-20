import { Component, inject, Input } from "@angular/core";
import { SelectionService, SelectionSummaryComponent } from "./shared";

@Component({
  selector: "formation-panel-exercise",
  template: `<fieldset>
    <legend>{{ label }}</legend>
    <button type="button" (click)="selectItem()">
      Sélectionner {{ label }}
    </button>
    <formation-selection-summary [label]="label" />
    <p>{{ label }} voit l'état global : {{ globalSelection.selected }}</p>
  </fieldset>`,
  standalone: true,
  imports: [SelectionSummaryComponent],
})
export class SelectionPanelComponent {
  @Input() label = "";

  protected readonly selection = inject(SelectionService);
  protected readonly globalSelection = inject(SelectionService);

  selectItem() {
    this.selection.select(this.label);
  }
}

@Component({
  selector: "formation-di-exercise",
  template: `<section class="lab">
    <p class="eyebrow">Fondamentaux · Injection</p>
    <h1>Sélections locales et suivi global</h1>
    <formation-selection-summary label="Globale" />
    <formation-panel-exercise label="Haut" />
    <formation-panel-exercise label="Bas" />
  </section>`,
  providers: [SelectionService],
  standalone: true,
  imports: [SelectionPanelComponent, SelectionSummaryComponent],
})
export class ExerciseComponent {}
