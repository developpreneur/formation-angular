import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "formation-validation-exercise",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="lab">
    <p class="eyebrow">Fondamentaux · Reactive Forms</p>
    <h1>Valider une demande</h1>
    <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <label for="email">Adresse électronique</label>
      <input
        id="email"
        type="email"
        formControlName="email"
        aria-describedby="email-error"
      />
      <p id="email-error" role="alert">Adresse électronique invalide</p>
      <label for="start">Date de début</label>
      <input id="start" type="date" formControlName="start" />
      <label for="end">Date de fin</label>
      <input id="end" type="date" formControlName="end" />
      <p role="alert">La fin doit suivre le début</p>
      <button type="submit">Envoyer</button>
    </form>
    <p role="status">Envois acceptés : {{ accepted }}</p>
    <pre aria-label="Données envoyées">{{ payload | json }}</pre>
  </section>`,
})
export class ExerciseComponent {
  @Output() submitted = new EventEmitter<{
    email: string;
    start: string;
    end: string;
  }>();

  protected readonly form = new FormGroup({
    email: new FormControl("", { nonNullable: true }),
    start: new FormControl("", { nonNullable: true }),
    end: new FormControl("", { nonNullable: true }),
  });
  protected accepted = 0;
  protected payload: { email: string; start: string; end: string } | null =
    null;

  protected submit(): void {
    this.payload = this.form.getRawValue();
    this.accepted++;
    this.submitted.emit(this.payload);
  }
}
