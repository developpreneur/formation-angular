import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
} from "@angular/core";
import { map, startWith, Subject, takeUntil, timer } from "rxjs";
import {
  EagerProfileComponent,
  OnPushProfileComponent,
  Profile,
} from "./shared";

@Component({
  selector: "formation-exercise",
  standalone: true,
  imports: [OnPushProfileComponent, EagerProfileComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `<section class="lab">
    <p class="eyebrow">07 · Détection des changements</p>
    <h1>La mutation est-elle visible ?</h1>
    <formation-eager-profile [profile]="profile"></formation-eager-profile>
    <formation-onpush-profile [profile]="profile"></formation-onpush-profile>
    <button type="button" (click)="changeProfile()">Changer le profil</button>
  </section>`,
})
export class EditProfileExerciceComponent {
  protected profile: Profile = { name: "Ada" };

  protected changeProfile(): void {
    this.profile.name = "Katherine";
  }
}

@Component({
  selector: "formation-exercise",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="lab">
    <p class="eyebrow">07 · Détection des changements</p>
    <h1>Mise à jour asynchrone</h1>
    <p role="status">{{ message }}</p>
    <button type="button" (click)="loadResult()">Charger le résultat</button>
  </section>`,
})
export class UpdateMessageExerciceComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  protected message = "En attente";

  protected loadResult(): void {
    setTimeout(() => {
      this.message = "Résultat reçu";
    }, 80);
  }
}

@Component({
  selector: "formation-exercise",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="lab">
    <p class="eyebrow">07 · Détection des changements</p>
    <h1>Afficher une donnée asynchrone</h1>
    <p role="status">{{ message }}</p>
  </section>`,
})
export class AsyncDataExerciseComponent implements OnDestroy {
  protected message = "";
  protected readonly message$ = timer(120).pipe(
    map(() => "Réponse reçue"),
    startWith("En attente"),
  );

  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.message$
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => (this.message = message));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
