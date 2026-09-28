import { Component, Input, NgModule } from "@angular/core";

export const SESSION = {
  title: "Formation Angular avancé",
  workshopMinutes: 45,
  durationMinutes: 60,
  programMinutes: 90,
  inPersonSeatsRemaining: 2,
  onlineSeatsRemaining: 8,
};

@Component({
  selector: "formation-catalog-layout",
  standalone: true,
  template: `<main
    data-theme="light"
    class="mx-auto min-h-screen max-w-4xl bg-base-100 px-4 py-8 text-base-content sm:px-8 lg:py-12"
  >
    <header class="mb-8 border-b border-base-300 pb-6">
      <p class="text-sm font-semibold uppercase text-primary">
        Catalogue des formations
      </p>
      <h1 class="mt-2 text-3xl font-bold">Liste des formations</h1>
    </header>
    <ng-content />
  </main>`,
})
export class CatalogLayoutComponent {}

@Component({
  selector: "formation-legacy-status-badge",
  standalone: false,
  template: `<span
    class="badge badge-warning badge-sm"
    role="status"
    [attr.aria-label]="label"
    >{{ label }}</span
  >`,
})
export class LegacyStatusBadgeComponent {
  @Input({ required: true }) label!: string;
}

@NgModule({
  declarations: [LegacyStatusBadgeComponent],
  exports: [LegacyStatusBadgeComponent],
})
export class LegacyCatalogModule {}
