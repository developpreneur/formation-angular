import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  forwardRef,
  inject,
} from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  ControlValueAccessor,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import {
  DeliveryFormViewComponent,
  DeliveryMethod,
  DeliveryOptionsComponent,
  deliveryMethodControl,
  fetchAllowedDeliveryMethods,
} from "./shared";

@Component({
  selector: "formation-delivery-method-solution",
  standalone: true,
  template: `<formation-delivery-options
    [value]="value"
    [disabled]="disabled"
    (selected)="select($event)"
    (left)="leave($event)"
  />`,
  imports: [DeliveryOptionsComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeliveryMethodSolutionComponent),
      multi: true,
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => DeliveryMethodSolutionComponent),
      multi: true,
    },
  ],
})
export class DeliveryMethodSolutionComponent
  implements ControlValueAccessor, AsyncValidator
{
  protected value: DeliveryMethod | null = null;
  protected disabled = false;

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly changeDetector: ChangeDetectorRef =
    inject(ChangeDetectorRef);

  private onChange: (value: DeliveryMethod | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: DeliveryMethod | null): void {
    this.value = value;
    this.changeDetector.markForCheck();
  }

  registerOnChange(callback: (value: DeliveryMethod | null) => void): void {
    this.onChange = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const selectedMethod = control.value as DeliveryMethod | null;
    if (selectedMethod === null) return null;

    const allowedMethods = await fetchAllowedDeliveryMethods();
    return allowedMethods.includes(selectedMethod)
      ? null
      : {
          methodNotAllowed: {
            value: selectedMethod,
            allowedMethods,
          },
        };
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
  imports: [
    ReactiveFormsModule,
    DeliveryMethodSolutionComponent,
    DeliveryFormViewComponent,
  ],
  template: `<formation-delivery-form-view [control]="control">
    <formation-delivery-method-solution [formControl]="control" />
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
export class SolutionComponent implements OnDestroy {
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
