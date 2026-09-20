import { FormControl } from "@angular/forms";

export type DeliveryMethod = "pickup" | "delivery" | "relay";

export function deliveryMethodControl(): FormControl<DeliveryMethod> {
  return new FormControl<DeliveryMethod>("delivery", { nonNullable: true });
}
