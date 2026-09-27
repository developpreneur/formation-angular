import { Component, Input, NgModule } from "@angular/core";

@Component({
  selector: "formation-legacy-status-badge",
  standalone: false,
  template: `<span
    class="status-badge"
    role="status"
    [attr.aria-label]="label"
    >{{ label }}</span
  >`,
  styles: [
    `
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.35rem 0.65rem;
        border: 1px solid #e7bd5c;
        border-radius: 999px;
        background: #fff4d6;
        color: #704600;
        font-size: 0.75rem;
        font-weight: 700;
        line-height: 1;

        &::before {
          content: "";
          width: 0.45rem;
          height: 0.45rem;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #c47b00;
        }
      }
    `,
  ],
})
export class LegacyStatusBadgeComponent {
  @Input({ required: true }) label!: string;
}

@NgModule({
  declarations: [LegacyStatusBadgeComponent],
  exports: [LegacyStatusBadgeComponent],
})
export class LegacyCatalogModule {}
