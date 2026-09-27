import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

export interface Profile {
  name: string;
}

@Component({
  selector: "formation-onpush-profile",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section>
    <p data-testid="onpush-name">OnPush : {{ profile.name }}</p>
    <button type="button" (click)="refresh()">
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
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<section>
    <p data-testid="eager-name">Default (Eager) : {{ profile.name }}</p>
  </section>`,
})
export class EagerProfileComponent {
  @Input() profile!: Profile;
}
