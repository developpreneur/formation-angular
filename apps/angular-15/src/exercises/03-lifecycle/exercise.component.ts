import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
} from "@angular/core";
import {
  DynamicProfileDisplayComponent,
  Profile,
  ProfileNameComponent,
} from "./shared";

@Component({
  selector: "formation-profile-group",
  standalone: true,
  imports: [DynamicProfileDisplayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="projected">
      <ng-content select="[profileName]" />
    </div>
    <formation-dynamic-profile-display />`,
})
export class ProfileGroupComponent {
  private label = "Profile interne";
  @Input() internalProfile!: Profile;

  @ContentChild("projectedLabel", { read: ElementRef })
  private readonly projectedLabelTemplate!: ElementRef<HTMLTemplateElement>;
}

@Component({
  selector: "formation-exercise-lifecycle",
  template: `<section class="lab">
    <p class="eyebrow">Fondamentaux · Cycle de vie</p>
    <h1>Deux enfants à synchroniser</h1>
    <formation-profile-group [internalProfile]="profile">
      <p
        formation-profile-name
        profileName
        [profile]="profile"
        label="Profil projeté"
      ></p>
      <div #projectedLabel>Profile interne (label projeté)</div>
    </formation-profile-group>
    <button type="button" (click)="rename()">Renommer en Grace</button>
  </section>`,
  standalone: true,
  imports: [ProfileNameComponent, ProfileGroupComponent],
})
export class ExerciseComponent {
  profile: Profile = { name: "Ada" };

  rename(): void {
    this.profile.name = "Grace";
  }
}
