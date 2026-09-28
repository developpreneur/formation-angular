import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectMatchsInProgress, selectScoreBoard } from "./exercise-store";
import { DashboardPanel, ScoreboardViewComponent } from "./shared";
import {
  addPoints,
  loadInProgressMatches,
  selectActivePanel,
  selectPanel,
} from "./shared-store";

@Component({
  selector: "formation-state-management-exercise",
  standalone: true,
  imports: [AsyncPipe, ScoreboardViewComponent],
  template: `<formation-scoreboard-view
    [activePanel]="(activePanel$ | async) ?? 'score'"
    [score]="(score$ | async) ?? emptyScore"
    [matches]="(matches$ | async) ?? emptyMatches"
    (panelChange)="changePanel($event)"
    (addPoints)="updateScore($event)"
    (refresh)="refreshMatches()"
  />`,
})
export class ExerciseComponent {
  private readonly store = inject(Store);

  protected readonly activePanel$ = this.store.select(selectActivePanel);
  protected readonly score$ = this.store.select(selectScoreBoard);
  protected readonly matches$ = this.store.select(selectMatchsInProgress);
  protected readonly emptyScore = { homeScore: 0, awayScore: 0 };
  protected readonly emptyMatches = {
    matches: [],
    status: "idle" as const,
    error: null,
  };

  protected changePanel(panel: DashboardPanel): void {
    this.store.dispatch(selectPanel({ panel }));
    if (panel === "matches") {
      this.store.dispatch(loadInProgressMatches());
    }
  }

  protected updateScore(event: {
    team: "home" | "away";
    points: number;
  }): void {
    this.store.dispatch(addPoints(event));
  }

  protected refreshMatches(): void {
    this.store.dispatch(loadInProgressMatches());
  }
}
