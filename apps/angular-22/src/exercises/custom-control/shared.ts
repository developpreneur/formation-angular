import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

export type DeliveryMethod = "pickup" | "delivery" | "relay";

export function fetchAllowedDeliveryMethods(): Promise<DeliveryMethod[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["pickup", "delivery"]), 50);
  });
}

export function deliveryMethodControl(): FormControl<DeliveryMethod | null> {
  return new FormControl<DeliveryMethod | null>("delivery", {
    validators: [Validators.required],
  });
}

@Component({
  selector: "formation-delivery-options",
  standalone: true,
  template: `<div
    class="join join-vertical flex w-full flex-col sm:join-horizontal sm:flex-row"
    role="group"
    aria-label="Mode de remise"
    (focusout)="left.emit($event)"
  >
    @for (method of methods; track method.value) {
      <button
        class="btn join-item w-full min-w-0 border-base-300 bg-base-200! text-base-content! aria-pressed:bg-primary! aria-pressed:text-primary-content! disabled:cursor-not-allowed! disabled:opacity-40 sm:w-auto sm:flex-1"
        type="button"
        [disabled]="disabled"
        [attr.aria-pressed]="value === method.value"
        (click)="selected.emit(method.value)"
      >
        {{ method.label }}
      </button>
    }
  </div>`,
})
export class DeliveryOptionsComponent {
  protected readonly methods: { value: DeliveryMethod; label: string }[] = [
    { value: "pickup", label: "Retrait en magasin" },
    { value: "delivery", label: "Livraison" },
    { value: "relay", label: "Point relais" },
  ];
  @Input() value: DeliveryMethod | null = null;
  @Input() disabled = false;
  @Output() selected = new EventEmitter<DeliveryMethod>();
  @Output() left = new EventEmitter<FocusEvent>();
}

@Component({
  selector: "formation-delivery-form-view",
  standalone: true,
  template: `<section
    data-theme="light"
    class="mx-auto max-w-3xl bg-base-100 px-4 py-8 text-base-content sm:px-8"
    aria-labelledby="delivery-title"
  >
    <header class="mb-6 border-b border-base-300 pb-5">
      <p class="text-sm font-semibold uppercase text-primary">
        Avancé · Contrôle personnalisé
      </p>
      <h1 id="delivery-title" class="mt-2 text-3xl font-bold">
        Choisir le mode de remise
      </h1>
    </header>
    <ng-content />
    <div class="flex flex-wrap gap-2 border-t border-base-300 pt-5">
      <button
        class="btn btn-neutral btn-sm"
        type="button"
        (click)="control.disable()"
      >
        Désactiver
      </button>
      <button
        class="btn btn-neutral btn-sm"
        type="button"
        (click)="control.enable()"
      >
        Activer
      </button>
      <button
        class="btn btn-primary btn-sm h-auto max-w-full whitespace-normal py-2 text-center"
        type="button"
        (click)="control.setValue('delivery')"
      >
        Choisir la livraison depuis le parent
      </button>
      <button
        class="btn btn-neutral btn-sm"
        type="button"
        (click)="control.reset()"
      >
        Réinitialiser
      </button>
    </div>
  </section>`,
})
export class DeliveryFormViewComponent {
  @Input({ required: true }) control!: FormControl<DeliveryMethod | null>;
}
