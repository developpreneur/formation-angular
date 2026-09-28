import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { SearchState } from "./shared";

@Component({
  selector: "formation-rxjs-search-exercise",
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  template: `<main class="rxjs-search" aria-labelledby="rxjs-search-title">
    <header class="rxjs-search__header">
      <p class="rxjs-search__eyebrow">Atelier RxJS · 02</p>
      <h1 id="rxjs-search-title">Explorer les formations</h1>
      <p class="rxjs-search__intro">
        Un catalogue de parcours pour approfondir le développement web.
      </p>
    </header>

    <section class="rxjs-search__surface" aria-label="Catalogue des formations">
      <div>
        <label class="rxjs-search__label" for="rxjs-search-input">
          Rechercher une formation
        </label>
        <div class="rxjs-search__field">
          <input
            id="rxjs-search-input"
            type="search"
            autocomplete="off"
            placeholder="Angular, RxJS, TypeScript..."
            [formControl]="queryControl"
          />
          @if (queryControl.value) {
            <button
              class="rxjs-search__clear"
              type="button"
              (click)="clearSearch()"
            >
              Effacer
            </button>
          }
        </div>
      </div>

      @if (state$ | async; as state) {
        <div class="rxjs-search__feedback" [attr.data-state]="state.status">
          @switch (state.status) {
            @case ("idle") {
              <p role="status">
                Saisissez un thème pour explorer le catalogue.
              </p>
            }
            @case ("loading") {
              <p class="rxjs-search__loading" role="status">
                <span class="rxjs-search__spinner" aria-hidden="true"></span>
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
                  class="rxjs-search__results"
                  aria-label="Résultats de la recherche"
                >
                  @for (course of state.courses; track course.id) {
                    <li>
                      <article class="rxjs-search__result">
                        <div class="rxjs-search__result-meta">
                          <span>{{ course.category }}</span>
                          <span>{{ course.duration }}</span>
                        </div>
                        <h2>{{ course.title }}</h2>
                        <p>{{ course.summary }}</p>
                      </article>
                    </li>
                  }
                </ul>
              } @else {
                <p role="status">Aucun résultat pour « {{ state.query }} ».</p>
              }
            }
            @case ("error") {
              <p role="alert">{{ state.message }}</p>
            }
          }
        </div>
      }
    </section>
  </main>`,
})
export class ExerciseComponent {
  protected readonly queryControl = new FormControl("", { nonNullable: true });
  protected readonly state$ = of<SearchState>({ status: "idle" });

  protected clearSearch(): void {
    this.queryControl.setValue("");
  }
}
