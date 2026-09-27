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
