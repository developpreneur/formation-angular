import { Component, ElementRef, OnDestroy, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import {
  DeliveryFormViewComponent,
  DeliveryMethod,
  DeliveryOptionsComponent,
  deliveryMethodControl,
} from "./shared";

@Component({
  selector: "formation-delivery-method-exercise",
  standalone: true,
  imports: [DeliveryOptionsComponent],
  template: `<formation-delivery-options
    [value]="value"
    [disabled]="disabled"
    (selected)="select($event)"
    (left)="leave($event)"
  />`,
})
export class DeliveryMethodExerciseComponent {
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
  imports: [
    ReactiveFormsModule,
    DeliveryMethodExerciseComponent,
    DeliveryFormViewComponent,
  ],
  template: `<formation-delivery-form-view [control]="control">
    <formation-delivery-method-exercise />
    @if (control.touched && control.hasError("required")) {
      <p class="alert alert-error mt-3" role="alert">
        Choisissez un mode de remise.
      </p>
    } @else if (control.touched && control.hasError("methodNotAllowed")) {
      <p class="alert alert-error mt-3" role="alert">
        Ce mode de remise n'est pas autorisé pour cette commande.
      </p>
    }
    <div
      class="mt-6 grid gap-2 border-t border-base-300 py-5 text-sm sm:grid-cols-2"
    >
      <p role="status">Mode : {{ control.value ?? "aucune" }}</p>
      <p>Statut : {{ control.status }}</p>
      <p>Invalide : {{ control.invalid }}</p>
      <p>Touché : {{ control.touched }}</p>
      <p>Modifié : {{ control.dirty }}</p>
      <p>Notifications : {{ notifications }}</p>
    </div>
  </formation-delivery-form-view>`,
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
