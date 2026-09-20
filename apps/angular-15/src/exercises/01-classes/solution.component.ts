import { CommonModule } from "@angular/common";
import {
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from "@angular/core";
import { STATUSES } from "./shared";

@Pipe({
  name: "requestStatus",
  standalone: true,
})
export class RequestStatusPipe implements PipeTransform {
  transform(code: string): string {
    return STATUSES[code] ?? STATUSES["unknown"];
  }
}

@Directive({
  selector: "button[lockedOnArchived]",
  standalone: true,
  host: {
    "[disabled]": "lockedOnArchived === 'archived'",
  },
})
export class LockedOnArchivedDirective {
  @Input() lockedOnArchived?: string;
}

@Component({
  selector: "formation-classes-solution",
  standalone: true,
  imports: [CommonModule, LockedOnArchivedDirective, RequestStatusPipe],
  template: `<section class="lab">
    <p class="eyebrow">Fondamentaux · Classes Angular</p>
    <h1>Un statut lisible</h1>
    <label for="status">Statut</label>
    <select id="status" #status (change)="current = status.value">
      <option *ngFor="let code of statusCodes" [value]="code">
        {{ code | requestStatus }}
      </option>
    </select>
    <p role="status">{{ current | requestStatus }}</p>
    <button
      [lockedOnArchived]="current"
      type="button"
      (click)="archives = archives + 1"
    >
      Archiver
    </button>
    <p>Actions émises : {{ archives }}</p>
  </section>`,
})
export class SolutionComponent {
  protected current = "open";
  protected archives = 0;
  protected statusCodes = Object.keys(STATUSES);
}
