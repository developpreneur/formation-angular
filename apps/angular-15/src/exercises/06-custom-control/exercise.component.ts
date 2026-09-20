import { CommonModule } from "@angular/common";
import { Component, ElementRef, inject } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { DeliveryMethod, deliveryMethodControl } from "./shared";

@Component({
  selector: "formation-delivery-method-exercise",
  template: `<div
    role="group"
    aria-label="Mode de remise"
    (focusout)="leave($event)"
  >
    <button
      *ngFor="let method of methods"
      type="button"
      [disabled]="disabled"
      [attr.aria-pressed]="value === method.value"
      (click)="select(method.value)"
    >
      {{ method.label }}
    </button>
  </div>`,
  standalone: true,
  imports: [CommonModule],
})
export class DeliveryMethodExerciseComponent {
  protected readonly methods: { value: DeliveryMethod; label: string }[] = [
    { value: "pickup", label: "Retrait en magasin" },
    { value: "delivery", label: "Livraison" },
    { value: "relay", label: "Point relais" },
  ];
  protected value: DeliveryMethod = "delivery";
  protected disabled = false;
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  protected select(value: DeliveryMethod): void {
    if (this.disabled) return;
    this.value = value;
  }

  protected leave(event: FocusEvent): void {
    if (this.host.nativeElement.contains(event.relatedTarget as Node | null)) {
      return;
    }
  }
}

@Component({
  selector: "formation-delivery-form-exercise",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeliveryMethodExerciseComponent],
  template: `<section class="lab">
    <p class="eyebrow">Jour 1 · ControlValueAccessor</p>
    <h1>Choisir le mode de remise</h1>
    <formation-delivery-method-exercise [formControl]="control" />
    <p role="status">Mode : {{ control.value }}</p>
    <p>Touché : {{ control.touched }}</p>
    <p>Modifié : {{ control.dirty }}</p>
    <p>Notifications : {{ notifications }}</p>
    <button
      type="button"
      (click)="control.disabled ? control.enable() : control.disable()"
    >
      Activer ou désactiver
    </button>
    <button type="button" (click)="control.setValue('relay')">
      Choisir le point relais depuis le parent
    </button>
  </section>`,
})
export class ExerciseComponent {
  protected readonly control = deliveryMethodControl();
  protected notifications = 0;

  private readonly changes = this.control.valueChanges.subscribe(
    () => this.notifications++,
  );
}
