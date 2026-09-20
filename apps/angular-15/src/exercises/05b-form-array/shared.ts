import { FormControl, FormGroup, Validators } from "@angular/forms";

export function line(id: number) {
  return new FormGroup({
    id: new FormControl({ value: id, disabled: true }, { nonNullable: true }),
    title: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
