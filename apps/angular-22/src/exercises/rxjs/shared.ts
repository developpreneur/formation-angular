import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Observable, of, switchMap, throwError, timer } from "rxjs";

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  summary: string;
}

export type SearchState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "success"; query: string; courses: Course[] }
  | { status: "error"; query: string; message: string };

export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_API_DELAY_MS = 500;

const COURSES: Course[] = [
  {
    id: "angular-advanced",
    title: "Angular avancé",
    category: "Développement frontend",
    duration: "2 jours",
    summary:
      "Architecture, composants et formulaires pour des applications robustes.",
  },
  {
    id: "angular-performance",
    title: "Interfaces Angular performantes",
    category: "Développement frontend",
    duration: "1 jour",
    summary: "Optimiser le rendu et structurer des interfaces réactives.",
  },
  {
    id: "rxjs-advanced",
    title: "RxJS avancé",
    category: "Programmation réactive",
    duration: "1 jour",
    summary:
      "Composer des flux asynchrones et maîtriser les stratégies de concurrence.",
  },
  {
    id: "typescript-web",
    title: "TypeScript pour le web",
    category: "Développement frontend",
    duration: "1 jour",
    summary:
      "Types avancés et conception d'API fiables pour les applications web.",
  },
];

export function searchCourses(query: string): Observable<Course[]> {
  return timer(SEARCH_API_DELAY_MS).pipe(
    switchMap(() => {
      if (query === "erreur") {
        return throwError(
          () => new Error("Le service de recherche est indisponible."),
        );
      }

      return of(
        COURSES.filter((course) =>
          `${course.title} ${course.category} ${course.summary}`
            .toLowerCase()
            .includes(query),
        ),
      );
    }),
  );
}

@Component({
  selector: "formation-search-header",
  standalone: true,
  template: `<header class="border-b border-base-300 px-4 pb-6 pt-4 sm:px-6">
    <p class="text-sm font-semibold uppercase text-primary">
      Atelier RxJS · 02
    </p>
    <h1 id="rxjs-search-title" class="mt-2 text-3xl font-bold">
      Explorer les formations
    </h1>
    <p class="mt-2 text-base-content/70">
      Un catalogue de parcours pour approfondir le développement web.
    </p>
  </header>`,
})
export class SearchHeaderComponent {}

@Component({
  selector: "formation-search-field",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<div>
    <label class="mb-2 block font-semibold" for="rxjs-search-input"
      >Rechercher une formation</label
    >
    <div class="flex flex-wrap items-center gap-2">
      <input
        id="rxjs-search-input"
        class="input input-bordered w-full min-w-0 bg-base-100 text-base-content sm:w-auto sm:flex-1"
        type="search"
        autocomplete="off"
        placeholder="Angular, RxJS, TypeScript..."
        [formControl]="queryControl"
      />
      @if (queryControl.value) {
        <button
          class="btn btn-primary btn-sm"
          type="button"
          (click)="clear.emit()"
        >
          Effacer
        </button>
      }
    </div>
  </div>`,
})
export class SearchFieldComponent {
  @Input({ required: true }) queryControl!: FormControl<string>;
  @Output() clear = new EventEmitter<void>();
}

@Component({
  selector: "formation-search-result",
  standalone: true,
  template: `<article
    class="card border border-base-300 bg-base-100 text-base-content shadow-sm"
  >
    <div class="card-body gap-2 p-5">
      <div class="flex flex-wrap gap-2 text-sm text-base-content/70">
        <span>{{ course.category }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ course.duration }}</span>
      </div>
      <h2 class="card-title text-lg">{{ course.title }}</h2>
      <p>{{ course.summary }}</p>
    </div>
  </article>`,
})
export class SearchResultComponent {
  @Input({ required: true }) course!: Course;
}

@Component({
  selector: "formation-search-feedback",
  standalone: true,
  imports: [SearchResultComponent],
  template: `<div class="mt-6" [attr.data-state]="state.status">
    @switch (state.status) {
      @case ("idle") {
        <p role="status">Saisissez un thème pour explorer le catalogue.</p>
      }
      @case ("loading") {
        <p class="flex items-center gap-2" role="status">
          <span
            class="loading loading-spinner loading-sm"
            aria-hidden="true"
          ></span>
          Recherche en cours pour « {{ state.query }} »...
        </p>
      }
      @case ("success") {
        @if (state.courses.length > 0) {
          <p role="status">
            {{ state.courses.length }} résultat{{
              state.courses.length === 1 ? "" : "s"
            }}
            trouvé{{ state.courses.length === 1 ? "" : "s" }} pour «
            {{ state.query }} ».
          </p>
          <ul
            class="mt-5 grid gap-4 sm:grid-cols-2"
            aria-label="Résultats de la recherche"
          >
            @for (course of state.courses; track course.id) {
              <li><formation-search-result [course]="course" /></li>
            }
          </ul>
        } @else {
          <p role="status">Aucun résultat pour « {{ state.query }} ».</p>
        }
      }
      @case ("error") {
        <p class="alert alert-error" role="alert">{{ state.message }}</p>
      }
    }
  </div>`,
})
export class SearchFeedbackComponent {
  @Input({ required: true }) state!: SearchState;
}
