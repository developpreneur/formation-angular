import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { line } from "./shared";

@Component({
  selector: "formation-array-exercise",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<section class="lab">
    <p class="eyebrow">Fondamentaux · FormArray</p>
    <h1>Des lignes sans données fantômes</h1>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div formArrayName="lines">
        <fieldset
          *ngFor="let row of rows.controls; let i = index"
          [formGroupName]="i"
        >
          <legend>Ligne {{ i + 1 }}</legend>
          <label [for]="'line-id-' + i">Identifiant {{ i + 1 }}</label>
          <input [id]="'line-id-' + i" formControlName="id" />
          <label [for]="'line-title-' + i">Libellé {{ i + 1 }}</label>
          <input [id]="'line-title-' + i" formControlName="title" />
          <button type="button" (click)="remove(i)">
            Supprimer la ligne {{ i + 1 }}
          </button>
        </fieldset>
      </div>
      <button type="button" (click)="add()">Ajouter une ligne</button
      ><button type="submit">Envoyer les lignes</button>
    </form>
    <pre aria-label="Données envoyées">{{ payload | json }}</pre>
  </section>`,
})
export class ExerciseComponent {
  protected readonly form = new FormGroup({
    lines: new FormArray<ReturnType<typeof line>>([]),
  });

  protected get rows() {
    return this.form.controls.lines;
  }

  private nextId = 100;

  protected payload: unknown = null;

  protected add(): void {}

  protected remove(index: number): void {}

  protected submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.payload = this.form.value;
  }
}
