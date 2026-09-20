import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";

function dateOrder(control: AbstractControl): ValidationErrors | null {
  const start: string = control.get("start")?.value ?? "";
  const end: string = control.get("end")?.value ?? "";
  return start && end && end < start ? { dateOrder: true } : null;
}

@Component({
  selector: "formation-validation-solution",
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
      <p id="email-error" *ngIf="showEmailError()" role="alert">
        Adresse électronique invalide
      </p>
      <label for="start">Date de début</label>
      <input id="start" type="date" formControlName="start" />
      <label for="end">Date de fin</label>
      <input id="end" type="date" formControlName="end" />
      <p *ngIf="showDateError()" role="alert">La fin doit suivre le début</p>
      <button type="submit">Envoyer</button>
    </form>
    <p role="status">Envois acceptés : {{ accepted }}</p>
    <pre aria-label="Données envoyées">{{ payload | json }}</pre>
  </section>`,
})
export class SolutionComponent {
  @Output() submitted = new EventEmitter<{
    email: string;
    start: string;
    end: string;
  }>();

  protected readonly form = new FormGroup(
    {
      email: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      start: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      end: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: dateOrder },
  );
  protected accepted = 0;
  protected payload: { email: string; start: string; end: string } | null =
    null;

  protected showEmailError(): boolean {
    const control = this.form.controls.email;
    return control.invalid && control.touched;
  }

  protected showDateError(): boolean {
    return (
      this.form.hasError("dateOrder") &&
      (this.form.controls.start.touched || this.form.controls.end.touched)
    );
  }

  protected submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.payload = this.form.getRawValue();
    this.accepted++;
    this.submitted.emit(this.payload);
  }
}
