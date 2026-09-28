import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
} from "@angular/core";
import { map, startWith, Subject, takeUntil, timer } from "rxjs";
import {
  ChangeDetectionLayoutComponent,
  EagerProfileComponent,
  OnPushProfileComponent,
  Profile,
} from "./shared";

@Component({
  selector: "formation-edit-profile-exercise",
  standalone: true,
  imports: [
    ChangeDetectionLayoutComponent,
    OnPushProfileComponent,
    EagerProfileComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `<formation-change-detection-layout
    title="La mutation est-elle visible ?"
  >
    <div class="grid gap-5 sm:grid-cols-2">
      <formation-eager-profile [profile]="profile" />
      <formation-onpush-profile [profile]="profile" />
    </div>
    <button
      class="btn btn-primary mt-6"
      type="button"
      (click)="changeProfile()"
    >
      Changer le profil
    </button>
  </formation-change-detection-layout>`,
})
export class EditProfileExerciseComponent {
  protected profile: Profile = { name: "Ada" };

  protected changeProfile(): void {
    this.profile.name = "Katherine";
  }
}

@Component({
  selector: "formation-update-message-exercise",
  standalone: true,
  imports: [ChangeDetectionLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<formation-change-detection-layout title="Mise à jour asynchrone">
    <p class="mb-6" role="status">{{ message }}</p>
    <button class="btn btn-primary" type="button" (click)="loadResult()">
      Charger le résultat
    </button>
  </formation-change-detection-layout>`,
})
export class UpdateMessageExerciseComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  protected message = "En attente";

  protected loadResult(): void {
    setTimeout(() => {
      this.message = "Résultat reçu";
    }, 80);
  }
}

@Component({
  selector: "formation-async-data-exercise",
  standalone: true,
  imports: [ChangeDetectionLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<formation-change-detection-layout
    title="Afficher une donnée asynchrone"
  >
    <p role="status">{{ message }}</p>
  </formation-change-detection-layout>`,
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
