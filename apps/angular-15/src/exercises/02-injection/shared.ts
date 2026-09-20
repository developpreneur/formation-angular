import { Component, inject, Injectable, Input } from "@angular/core";

@Injectable()
export class SelectionService {
  selected = "Aucun";

  select(label: string): void {
    this.selected = `${label} sélectionnée`;
  }
}

@Component({
  selector: "formation-selection-summary",
  standalone: true,
  template: '<p role="status">{{ label }} : {{ selection.selected }}</p>',
})
export class SelectionSummaryComponent {
  @Input() label = "";
  protected readonly selection: SelectionService = inject(SelectionService);
}
