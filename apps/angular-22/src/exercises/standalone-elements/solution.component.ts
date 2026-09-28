import {
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from "@angular/core";
import { CatalogLayoutComponent, LegacyCatalogModule, SESSION } from "./shared";

@Directive({
  selector: "[appLimitedSeats]",
  standalone: true,
  host: {
    "[class.badge-warning]": "isLimited",
    "[class.badge-success]": "!isLimited",
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
  standalone: true,
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
  standalone: true,
  template: `<article
    class="card w-full max-w-2xl border border-base-300 bg-base-100 text-base-content shadow-sm"
  >
    <div class="card-body gap-5 p-5 sm:p-6">
      <header class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold uppercase text-primary">
            Session de formation
          </p>
          <h2 class="card-title mt-2 text-xl">{{ session.title }}</h2>
        </div>
        <formation-legacy-status-badge
          label="Legacy"
        ></formation-legacy-status-badge>
      </header>
      <div class="grid gap-2 text-sm sm:grid-cols-2">
        <p>
          Durée de l'atelier : {{ session.workshopMinutes | sessionDuration }}
        </p>
        <p>Durée : {{ session.durationMinutes | sessionDuration }}</p>
        <p>
          Durée du programme : {{ session.programMinutes | sessionDuration }}
        </p>
      </div>
      <footer class="flex flex-wrap gap-2 border-t border-base-300 pt-4">
        <p
          class="badge h-auto max-w-full whitespace-normal px-3 py-2"
          role="status"
          aria-label="Places restantes en présentiel : 2"
          [appLimitedSeats]="session.inPersonSeatsRemaining"
        >
          {{ session.inPersonSeatsRemaining }} places restantes en présentiel
        </p>
        <p
          class="badge h-auto max-w-full whitespace-normal px-3 py-2"
          role="status"
          aria-label="Places restantes en ligne : 8"
          [appLimitedSeats]="session.onlineSeatsRemaining"
        >
          {{ session.onlineSeatsRemaining }} places restantes en ligne
        </p>
      </footer>
    </div>
  </article>`,
  imports: [LimitedSeatsDirective, SessionDurationPipe, LegacyCatalogModule],
})
export class SessionCardComponent {
  protected readonly session = SESSION;
}

@Component({
  selector: "formation-exercise",
  standalone: true,
  imports: [SessionCardComponent, CatalogLayoutComponent],
  template: `<formation-catalog-layout>
    <formation-session-card></formation-session-card>
  </formation-catalog-layout>`,
})
export class NgModuleMigrationSolutionComponent {}
