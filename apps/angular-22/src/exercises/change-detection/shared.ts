import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

export interface Profile {
  name: string;
}

@Component({
  selector: "formation-change-detection-layout",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<main
    data-theme="light"
    class="min-h-screen bg-base-100 px-4 py-8 text-base-content sm:px-8 lg:py-12"
  >
    <div class="mx-auto max-w-3xl">
      <header class="mb-8 border-b border-base-300 pb-6">
        <p class="text-sm font-semibold uppercase text-primary">
          Détection des changements
        </p>
        <h1 class="mt-2 text-3xl font-bold">{{ title }}</h1>
      </header>
      <ng-content />
    </div>
  </main>`,
})
export class ChangeDetectionLayoutComponent {
  @Input({ required: true }) title!: string;
}

@Component({
  selector: "formation-onpush-profile",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="border-b border-base-300 pb-5">
    <p data-testid="onpush-name" class="mb-3">OnPush : {{ profile.name }}</p>
    <button class="btn btn-outline btn-sm" type="button" (click)="refresh()">
      Vérifier le sous-arbre OnPush
    </button>
  </section>`,
})
export class OnPushProfileComponent {
  @Input() profile!: Profile;

  protected refresh(): void {}
}

@Component({
  selector: "formation-eager-profile",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<section class="border-b border-base-300 pb-5">
    <p data-testid="eager-name">Eager : {{ profile.name }}</p>
  </section>`,
})
export class EagerProfileComponent {
  @Input() profile!: Profile;
}
