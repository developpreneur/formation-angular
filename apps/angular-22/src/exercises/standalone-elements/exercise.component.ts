import {
  Component,
  Directive,
  Input,
  NgModule,
  Pipe,
  PipeTransform,
} from "@angular/core";
import { LegacyCatalogModule } from "./shared";

@Directive({
  selector: "[appLimitedSeats]",
  standalone: false,
  host: {
    "[class.limited-seats]": "isLimited",
  },
})
export class LimitedSeatsDirective {
  @Input() appLimitedSeats = 0;

  protected get isLimited(): boolean {
    return this.appLimitedSeats <= 3;
  }
}

@Pipe({
  name: "sessionDuration",
  standalone: false,
})
export class SessionDurationPipe implements PipeTransform {
  transform(durationMinutes: number): string {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours === 0) {
      return `${minutes} min`;
    }

    return minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`;
  }
}

@Component({
  selector: "formation-session-card",
  standalone: false,
  template: `<article class="session-card">
    <header class="session-card__header">
      <div>
        <p class="session-card__eyebrow">Session de formation</p>
        <h2>{{ session.title }}</h2>
      </div>
      <formation-legacy-status-badge
        label="Legacy"
      ></formation-legacy-status-badge>
    </header>
    <div class="session-card__details">
      <p>
        Durée de l'atelier : {{ session.workshopMinutes | sessionDuration }}
      </p>
      <p>Durée : {{ session.durationMinutes | sessionDuration }}</p>
      <p>Durée du programme : {{ session.programMinutes | sessionDuration }}</p>
    </div>
    <footer class="session-card__availability">
      <p
        role="status"
        aria-label="Places restantes en présentiel : 2"
        [appLimitedSeats]="session.inPersonSeatsRemaining"
      >
        {{ session.inPersonSeatsRemaining }} places restantes en présentiel
      </p>
      <p
        role="status"
        aria-label="Places restantes en ligne : 8"
        [appLimitedSeats]="session.onlineSeatsRemaining"
      >
        {{ session.onlineSeatsRemaining }} places restantes en ligne
      </p>
    </footer>
  </article>`,
})
export class SessionCardComponent {
  protected readonly session = {
    title: "Formation Angular avancé",
    workshopMinutes: 45,
    durationMinutes: 60,
    programMinutes: 90,
    inPersonSeatsRemaining: 2,
    onlineSeatsRemaining: 8,
  };
}

@NgModule({
  declarations: [
    LimitedSeatsDirective,
    SessionDurationPipe,
    SessionCardComponent,
  ],
  imports: [LegacyCatalogModule],
  exports: [SessionCardComponent],
})
export class SessionFeatureModule {}

@Component({
  selector: "formation-exercise",
  standalone: true,
  imports: [SessionFeatureModule],
  template: `<section>
    <h1>Liste des formations</h1>
    <formation-session-card></formation-session-card>
  </section>`,
})
export class NgModuleMigrationExerciseComponent {}
