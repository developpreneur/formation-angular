import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { map, startWith, timer } from "rxjs";
import {
  ChangeDetectionLayoutComponent,
  EagerProfileComponent,
  OnPushProfileComponent,
  Profile,
} from "./shared";

@Component({
  selector: "formation-edit-profile-solution",
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
export class EditProfileSolutionComponent {
  protected profile: Profile = { name: "Ada" };

  protected changeProfile(): void {
    this.profile = { ...this.profile, name: "Katherine" };
  }
}

@Component({
  selector: "formation-update-message-solution",
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
export class UpdateMessageSolutionComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  protected message = "En attente";

  protected loadResult(): void {
    setTimeout(() => {
      this.message = "Résultat reçu";
      this.changeDetectorRef.markForCheck();
    }, 80);
  }
}

@Component({
  selector: "formation-async-data-solution",
  standalone: true,
  imports: [AsyncPipe, ChangeDetectionLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<formation-change-detection-layout
    title="Afficher une donnée asynchrone"
  >
    <p role="status">{{ message$ | async }}</p>
  </formation-change-detection-layout>`,
})
export class AsyncDataSolutionComponent {
  protected readonly message$ = timer(120).pipe(
    map(() => "Réponse reçue"),
    startWith("En attente"),
  );
}
