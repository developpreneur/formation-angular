import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  catchError,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
  timer,
} from "rxjs";
import {
  SEARCH_DEBOUNCE_MS,
  SearchFeedbackComponent,
  SearchFieldComponent,
  SearchHeaderComponent,
  SearchState,
  searchCourses,
} from "./shared";

@Component({
  selector: "formation-rxjs-search-solution",
  standalone: true,
  imports: [
    AsyncPipe,
    SearchHeaderComponent,
    SearchFieldComponent,
    SearchFeedbackComponent,
  ],
  template: `<main
    data-theme="light"
    class="mx-auto min-h-screen max-w-4xl bg-base-100 px-4 py-8 text-base-content lg:py-12"
    aria-labelledby="rxjs-search-title"
  >
    <formation-search-header />
    <section class="px-4 py-6 sm:px-6" aria-label="Catalogue des formations">
      <formation-search-field
        [queryControl]="queryControl"
        (clear)="clearSearch()"
      />
      @if (state$ | async; as state) {
        <formation-search-feedback [state]="state" />
      }
    </section>
  </main>`,
})
export class SolutionComponent {
  protected readonly queryControl = new FormControl("", { nonNullable: true });

  protected readonly state$ = this.queryControl.valueChanges.pipe(
    startWith(this.queryControl.value),
    map((value) => value.trim().toLowerCase()),
    distinctUntilChanged(),
    switchMap((query) => {
      if (query === "") {
        return of<SearchState>({ status: "idle" });
      }

      return timer(SEARCH_DEBOUNCE_MS).pipe(
        switchMap(() =>
          searchCourses(query).pipe(
            map(
              (courses): SearchState => ({
                status: "success",
                query,
                courses,
              }),
            ),
            startWith<SearchState>({ status: "loading", query }),
            catchError(() =>
              of<SearchState>({
                status: "error",
                query,
                message: "La recherche a échoué. Vous pouvez réessayer.",
              }),
            ),
          ),
        ),
      );
    }),
  );

  protected clearSearch(): void {
    this.queryControl.setValue("");
  }
}
