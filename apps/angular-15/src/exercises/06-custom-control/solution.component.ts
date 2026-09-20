import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  OnDestroy,
  forwardRef,
  inject,
} from "@angular/core";

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";
import { DeliveryMethod, deliveryMethodControl } from "./shared";

@Component({
  selector: "formation-delivery-method-solution",
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeliveryMethodSolutionComponent),
      multi: true,
    },
  ],
})
export class DeliveryMethodSolutionComponent implements ControlValueAccessor {
  protected readonly methods: { value: DeliveryMethod; label: string }[] = [
    { value: "pickup", label: "Retrait en magasin" },
    { value: "delivery", label: "Livraison" },
    { value: "relay", label: "Point relais" },
  ];
  protected value: DeliveryMethod = "delivery";
  protected disabled = false;

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  private onChange: (value: DeliveryMethod) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: DeliveryMethod): void {
    this.value = value;
  }

  registerOnChange(callback: (value: DeliveryMethod) => void): void {
    this.onChange = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  protected select(value: DeliveryMethod): void {
    if (this.disabled) return;
    this.value = value;
    this.onChange(value);
  }

  protected leave(event: FocusEvent): void {
    if (this.host.nativeElement.contains(event.relatedTarget as Node | null)) {
      return;
    }
    this.onTouched();
  }
}

@Component({
  selector: "formation-delivery-form-solution",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeliveryMethodSolutionComponent],
  template: `<section class="lab">
    <p class="eyebrow">Jour 1 · ControlValueAccessor</p>
    <h1>Choisir le mode de remise</h1>
    <formation-delivery-method-solution [formControl]="control" />
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
export class SolutionComponent implements OnDestroy {
  protected readonly control = deliveryMethodControl();
  protected notifications = 0;

  private readonly changes = this.control.valueChanges.subscribe(
    () => this.notifications++,
  );

  ngOnDestroy(): void {
    this.changes.unsubscribe();
  }
}
