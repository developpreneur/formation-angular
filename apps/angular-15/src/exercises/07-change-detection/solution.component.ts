import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { map, startWith, timer } from "rxjs";
import {
  EagerProfileComponent,
  OnPushProfileComponent,
  Profile,
} from "./shared";

@Component({
  selector: "formation-solution",
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
export class EditProfileSolutionComponent {
  protected profile: Profile = { name: "Ada" };

  protected changeProfile(): void {
    this.profile = { ...this.profile, name: "Katherine" };
  }
}

@Component({
  selector: "formation-solution",
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
  selector: "formation-solution",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="lab">
    <p class="eyebrow">07 · Détection des changements</p>
    <h1>Afficher une donnée asynchrone</h1>
    <p role="status">{{ message$ | async }}</p>
  </section>`,
})
export class AsyncDataSolutionComponent {
  protected message = "En attente";
  protected readonly message$ = timer(120).pipe(
    map(() => "Réponse reçue"),
    startWith("En attente"),
  );
}
