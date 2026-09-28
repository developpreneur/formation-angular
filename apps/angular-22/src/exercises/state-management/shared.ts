import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from "@angular/core";
import { Observable, map, switchMap, throwError, timer } from "rxjs";

export type Team = "home" | "away";
export type DashboardPanel = "score" | "matches";
export type MatchesStatus = "idle" | "loading" | "loaded" | "error";

export interface MatchScore {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

export interface ScoreBoard {
  homeScore: number;
  awayScore: number;
}

export interface MatchesPanelState {
  matches: readonly MatchScore[];
  status: MatchesStatus;
  error: string | null;
}

export interface AddPointsEvent {
  team: Team;
  points: number;
}

export const HOME_TEAM = "Lyon Métropole";
export const AWAY_TEAM = "Paris Nord";
export const MATCHES_ERROR_MESSAGE =
  "Le service des matchs est momentanément indisponible.";

const INITIAL_MATCHES: readonly MatchScore[] = [
  {
    id: "monaco-lyon",
    homeTeam: "Monaco",
    awayTeam: "Lyon",
    homeScore: 81,
    awayScore: 77,
  },
  {
    id: "lille-bordeaux",
    homeTeam: "Lille",
    awayTeam: "Bordeaux",
    homeScore: 68,
    awayScore: 70,
  },
];

const UPDATED_MATCHES: readonly MatchScore[] = [
  {
    id: "monaco-lyon",
    homeTeam: "Monaco",
    awayTeam: "Lyon",
    homeScore: 83,
    awayScore: 77,
  },
  {
    id: "lille-bordeaux",
    homeTeam: "Lille",
    awayTeam: "Bordeaux",
    homeScore: 68,
    awayScore: 70,
  },
];

@Injectable()
export class MatchScoresService {
  private requestCount = 0;

  getInProgressMatches(): Observable<readonly MatchScore[]> {
    const requestIndex = this.requestCount++;

    if (requestIndex === 1) {
      return timer(180).pipe(
        switchMap(() => throwError(() => new Error(MATCHES_ERROR_MESSAGE))),
      );
    }

    const matches = requestIndex >= 2 ? UPDATED_MATCHES : INITIAL_MATCHES;
    return timer(140).pipe(map(() => matches));
  }
}

@Component({
  selector: "formation-scoreboard-view",
  standalone: true,
  template: `<main
    data-theme="light"
    class="min-h-screen bg-base-100 px-4 py-8 text-base-content sm:px-8 sm:py-12"
  >
    <div class="mx-auto max-w-4xl">
      <header class="mb-6 flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase text-primary">
            Tableau de match
          </p>
          <h1 class="mt-1 text-2xl font-bold">Finale régionale</h1>
        </div>
        <span class="badge badge-error badge-outline gap-2">
          <span class="inline-block size-2 rounded-full bg-error"></span>
          EN DIRECT
        </span>
      </header>

      <section
        aria-label="Score du match"
        class="rounded-box border border-base-300 bg-base-200 px-5 py-6 shadow-sm sm:px-10 sm:py-8"
      >
        <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-8">
          <div class="text-center">
            <p class="text-sm font-semibold sm:text-base">{{ homeTeam }}</p>
            <output
              class="mt-2 block text-4xl font-bold tabular-nums sm:text-5xl"
              [attr.aria-label]="'Score de ' + homeTeam"
              >{{ score.homeScore }}</output
            >
          </div>
          <span class="text-2xl font-semibold text-base-content/50">:</span>
          <div class="text-center">
            <p class="text-sm font-semibold sm:text-base">{{ awayTeam }}</p>
            <output
              class="mt-2 block text-4xl font-bold tabular-nums sm:text-5xl"
              [attr.aria-label]="'Score de ' + awayTeam"
              >{{ score.awayScore }}</output
            >
          </div>
        </div>
      </section>

      <nav
        class="tabs tabs-border mt-8 border-b border-base-300"
        role="tablist"
        aria-label="Panneaux du tableau"
      >
        <button
          id="tab-score"
          class="tab"
          [class.tab-active]="activePanel === 'score'"
          [class.text-primary]="activePanel === 'score'"
          role="tab"
          type="button"
          [attr.aria-selected]="activePanel === 'score'"
          aria-controls="panel-score"
          (click)="panelChange.emit('score')"
        >
          Modifier le score
        </button>
        <button
          id="tab-matches"
          class="tab"
          [class.tab-active]="activePanel === 'matches'"
          [class.text-primary]="activePanel === 'matches'"
          role="tab"
          type="button"
          [attr.aria-selected]="activePanel === 'matches'"
          aria-controls="panel-matches"
          (click)="panelChange.emit('matches')"
        >
          Matchs en cours
        </button>
      </nav>

      @if (activePanel === "score") {
        <section
          id="panel-score"
          class="rounded-box border border-base-300 bg-base-100 p-5 sm:p-8"
          role="tabpanel"
          aria-labelledby="tab-score"
        >
          <h2 class="text-lg font-bold">Modifier le score</h2>
          <div class="mt-6 grid gap-6 sm:grid-cols-2">
            <section
              class="rounded-box border border-base-300 bg-base-100 p-4"
              [attr.aria-label]="'Actions pour ' + homeTeam"
            >
              <h3 class="font-semibold">{{ homeTeam }}</h3>
              <div class="mt-4 flex flex-wrap gap-2">
                @for (points of pointOptions; track points) {
                  <button
                    class="btn btn-primary btn-sm"
                    type="button"
                    [attr.aria-label]="
                      'Ajouter ' +
                      points +
                      ' point' +
                      (points > 1 ? 's' : '') +
                      ' à ' +
                      homeTeam
                    "
                    (click)="addPoints.emit({ team: 'home', points })"
                  >
                    +{{ points }}
                  </button>
                }
              </div>
            </section>
            <section
              class="rounded-box border border-base-300 bg-base-100 p-4"
              [attr.aria-label]="'Actions pour ' + awayTeam"
            >
              <h3 class="font-semibold">{{ awayTeam }}</h3>
              <div class="mt-4 flex flex-wrap gap-2">
                @for (points of pointOptions; track points) {
                  <button
                    class="btn btn-primary btn-sm"
                    type="button"
                    [attr.aria-label]="
                      'Ajouter ' +
                      points +
                      ' point' +
                      (points > 1 ? 's' : '') +
                      ' à ' +
                      awayTeam
                    "
                    (click)="addPoints.emit({ team: 'away', points })"
                  >
                    +{{ points }}
                  </button>
                }
              </div>
            </section>
          </div>
        </section>
      } @else {
        <section
          id="panel-matches"
          class="rounded-box border border-base-300 bg-base-100 p-5 sm:p-8"
          role="tabpanel"
          aria-labelledby="tab-matches"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-lg font-bold">Matchs en cours</h2>
            <button
              class="btn btn-outline btn-primary btn-sm"
              type="button"
              (click)="refresh.emit()"
            >
              Actualiser les matchs
            </button>
          </div>

          @if (matches.status === "loading") {
            <p class="mt-5 text-sm text-base-content/70" role="status">
              Chargement des matchs…
            </p>
          }

          @if (matches.error) {
            <p class="alert alert-error mt-5" role="alert">
              {{ matches.error }}
            </p>
          }

          @if (matches.matches.length > 0) {
            <ul
              class="mt-5 divide-y divide-base-300"
              aria-label="Liste des matchs"
            >
              @for (match of matches.matches; track match.id) {
                <li
                  class="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                  [attr.aria-label]="
                    match.homeTeam + ' contre ' + match.awayTeam
                  "
                >
                  <span class="font-medium">{{ match.homeTeam }}</span>
                  <strong
                    class="min-w-24 text-center text-lg tabular-nums"
                    [attr.aria-label]="
                      'Score de ' + match.homeTeam + ' contre ' + match.awayTeam
                    "
                  >
                    {{ match.homeScore }} - {{ match.awayScore }}
                  </strong>
                  <span class="font-medium">{{ match.awayTeam }}</span>
                </li>
              }
            </ul>
          } @else if (matches.status === "loaded") {
            <p class="mt-5 text-sm text-base-content/70">
              Aucun autre match en cours.
            </p>
          }
        </section>
      }
    </div>
  </main>`,
})
export class ScoreboardViewComponent {
  @Input() activePanel: DashboardPanel = "score";
  @Input() score: ScoreBoard = { homeScore: 0, awayScore: 0 };
  @Input() matches: MatchesPanelState = {
    matches: [],
    status: "idle",
    error: null,
  };

  @Output() panelChange = new EventEmitter<DashboardPanel>();
  @Output() addPoints = new EventEmitter<AddPointsEvent>();
  @Output() refresh = new EventEmitter<void>();

  protected readonly homeTeam = HOME_TEAM;
  protected readonly awayTeam = AWAY_TEAM;
  protected readonly pointOptions = [1, 2, 3];
}
