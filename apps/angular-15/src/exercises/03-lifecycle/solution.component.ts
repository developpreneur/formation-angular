import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
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

  @ViewChild(DynamicProfileDisplayComponent)
  private readonly dynamicProfileDisplay!: DynamicProfileDisplayComponent;

  @ContentChild("projectedLabel", { read: ElementRef })
  private readonly projectedLabelTemplate!: ElementRef<HTMLTemplateElement>;

  ngAfterViewInit(): void {
    this.syncDynamicProfileDisplay();
  }

  ngAfterContentInit(): void {
    if (this.projectedLabelTemplate) {
      this.label = this.projectedLabelTemplate.nativeElement.innerHTML.trim();
      this.syncDynamicProfileDisplay();
    }
  }

  ngOnChanges(): void {
    this.syncDynamicProfileDisplay();
  }

  syncDynamicProfileDisplay(): void {
    if (this.dynamicProfileDisplay) {
      this.dynamicProfileDisplay?.display(this.label, this.internalProfile);
    }
  }
}

@Component({
  selector: "formation-solution-lifecycle",
  standalone: true,
  imports: [ProfileNameComponent, ProfileGroupComponent],
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
})
export class SolutionComponent {
  profile: Profile = { name: "Ada" };

  rename(): void {
    this.profile = { ...this.profile, name: "Grace" };
  }
}
