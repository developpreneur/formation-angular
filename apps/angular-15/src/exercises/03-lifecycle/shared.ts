import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from "@angular/core";

export interface Profile {
  name: string;
}

@Component({
  selector: "p[formation-profile-name]",
  template: `{{ label }} : {{ profile.name }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProfileNameComponent {
  @Input() label = "";
  @Input() profile!: Profile;
}

@Component({
  selector: "formation-dynamic-profile-display",
  standalone: true,
  template: `
    <p
      formation-profile-name
      data-testid="dynamicProfileName"
      [profile]="{ name: name || '—' }"
      [label]="label || '—'"
    ></p>
  `,
  imports: [ProfileNameComponent],
})
export class DynamicProfileDisplayComponent {
  protected label = "";
  protected name = "";

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  display(label: string, profile: Profile): void {
    this.label = label;
    this.name = profile.name;
    this.changeDetectorRef.detectChanges();
  }
}
