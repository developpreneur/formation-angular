import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { of } from "rxjs";
import {
  SearchFeedbackComponent,
  SearchFieldComponent,
  SearchHeaderComponent,
  SearchState,
} from "./shared";

@Component({
  selector: "formation-rxjs-search-exercise",
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
export class ExerciseComponent {
  protected readonly queryControl = new FormControl("", { nonNullable: true });
  protected readonly state$ = of<SearchState>({ status: "idle" });

  protected clearSearch(): void {
    this.queryControl.setValue("");
  }
}
