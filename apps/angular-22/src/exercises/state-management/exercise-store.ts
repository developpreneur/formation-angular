import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActionReducerMap, createReducer, createSelector } from "@ngrx/store";
import { tap } from "rxjs";
import { MatchesPanelState, MatchScoresService, ScoreBoard } from "./shared";
import {
  AppState,
  INITIAL_SCOREBOARD_STATE,
  loadInProgressMatches,
  navigationReducer,
  selectScoreboardFeature,
} from "./shared-store";

export const scoreboardReducer = createReducer(INITIAL_SCOREBOARD_STATE);

export const exerciseReducers: ActionReducerMap<AppState> = {
  scoreboard: scoreboardReducer,
  navigation: navigationReducer,
};

export const selectScoreBoard = createSelector(
  selectScoreboardFeature,
  (): ScoreBoard => ({ homeScore: 0, awayScore: 0 }),
);
export const selectMatchsInProgress = createSelector(
  selectScoreboardFeature,
  (): MatchesPanelState => ({ matches: [], status: "idle", error: null }),
);

@Injectable()
export class ExerciseMatchEffects {
  private readonly actions$ = inject(Actions);
  private readonly matchScoresService = inject(MatchScoresService);

  readonly loadMatches$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadInProgressMatches),
        tap(() => undefined),
      ),
    { dispatch: false },
  );
}
