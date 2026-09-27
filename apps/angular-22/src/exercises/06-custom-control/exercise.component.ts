import { Component, ElementRef, OnDestroy, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { DeliveryMethod, deliveryMethodControl } from "./shared";

@Component({
  selector: "formation-delivery-method-exercise",
  standalone: true,
  template: `<div
    class="segmented-control"
    role="group"
    aria-label="Mode de remise"
    (focusout)="leave($event)"
  >
    @for (method of methods; track method.value) {
      <button
        type="button"
        [disabled]="disabled"
        [attr.aria-pressed]="value === method.value"
        (click)="select(method.value)"
      >
        {{ method.label }}
      </button>
    }
  </div>`,
})
export class DeliveryMethodExerciseComponent {
  protected readonly methods: { value: DeliveryMethod; label: string }[] = [
    { value: "pickup", label: "Retrait en magasin" },
    { value: "delivery", label: "Livraison" },
    { value: "relay", label: "Point relais" },
  ];
  protected value: DeliveryMethod | null = "delivery";
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
  imports: [ReactiveFormsModule, DeliveryMethodExerciseComponent],
  template: `<section class="lab">
    <p class="eyebrow">Avancé · Contrôle personnalisé</p>
    <h1>Choisir le mode de remise</h1>
    <div class="form-field">
      <formation-delivery-method-exercise />
      @if (control.touched && control.hasError("required")) {
        <p class="field-error" role="alert">Choisissez un mode de remise.</p>
      } @else if (control.touched && control.hasError("methodNotAllowed")) {
        <p class="field-error" role="alert">
          Ce mode de remise n'est pas autorisé pour cette commande.
        </p>
      }
    </div>
    <p role="status">Mode : {{ control.value ?? "aucune" }}</p>
    <p>Invalide : {{ control.invalid }}</p>
    <p>Statut : {{ control.status }}</p>
    <p>Touché : {{ control.touched }}</p>
    <p>Modifié : {{ control.dirty }}</p>
    <p>Notifications : {{ notifications }}</p>
    <button type="button" (click)="control.disable()">Désactiver</button>
    <button type="button" (click)="control.enable()">Activer</button>
    <button type="button" (click)="control.setValue('delivery')">
      Choisir la livraison depuis le parent
    </button>
    <button type="button" (click)="control.reset()">Réinitialiser</button>
  </section>`,
})
export class ExerciseComponent implements OnDestroy {
  protected readonly control = deliveryMethodControl();
  protected notifications = 0;

  private readonly $destroy = new Subject<void>();

  constructor() {
    this.control.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.notifications++);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
